'use server'

import { sql } from '@vercel/postgres'
import { revalidatePath } from 'next/cache'
import { PDFDocument, rgb } from 'pdf-lib'
import fontkit from '@pdf-lib/fontkit'
import { Order, TourWithHotel, User } from '../lib/definitions'

export async function changeOrderStatus(
    orderId: string,
    _prevState: any,
    _formData: FormData,
    status: string = 'paid'
) {
    try {
        await sql`UPDATE orders SET status = ${status} WHERE id = ${orderId};`
        revalidatePath('/profile')
        return { status: true, message: 'оплачено!' }
    } catch (error) {
        console.log(error)
        return { status: false, message: 'ошибка!' }
    }
}

export async function generateTourDocument(
    {
        orderData,
        tourData,
        userData
    }: { orderData: Order; tourData: TourWithHotel; userData: User },
    _prevState: any,
    _formData: FormData
) {
    try {
        const url =
            'https://db.onlinewebfonts.com/t/643e59524d730ce6c6f2384eebf945f8.ttf'
        const fontBytes = await fetch(url).then((res) => res.arrayBuffer())
        const pdfDoc = await PDFDocument.create()

        let customFont
        if (fontBytes) {
            pdfDoc.registerFontkit(fontkit)
            await pdfDoc.embedFont(fontBytes)
            customFont = await pdfDoc.embedFont(fontBytes)
        }

        // Add a blank page to the document
        const page = pdfDoc.addPage()

        // Get the width and height of the page
        const { width, height } = page.getSize()

        // Draw a string of text toward the top of the page
        const fontSize = 30
        page.drawText(`документ по туру ${tourData.tour_title}`, {
            x: 50,
            y: height - 4 * fontSize,
            size: fontSize,
            font: customFont,
            color: rgb(0, 0.53, 0.71)
        })
        const hotelData = tourData.hotels_info?.find(
            (hotel) => hotel.hotel_id === orderData.hotel_id
        )
        if (hotelData) {
            page.drawText(`отель ${hotelData?.hotel_title}`, {
                x: 50,
                y: height - 6 * fontSize,
                size: fontSize,
                font: customFont,
                color: rgb(0, 0, 0)
            })
        }

        page.drawText(`турист ${userData.name}`, {
            x: 50,
            y: height - 8 * fontSize,
            size: fontSize,
            font: customFont,
            color: rgb(0, 0, 0)
        })

        // Serialize the PDFDocument to bytes (a Uint8Array)
        const resultURI = await pdfDoc.saveAsBase64({ dataUri: true })
        return { status: true, message: resultURI }
    } catch (error) {
        console.log(error)
        return { status: false, message: 'ошибка' }
    }
}
