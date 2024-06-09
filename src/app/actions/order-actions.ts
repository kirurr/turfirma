'use server'

import { sql } from '@vercel/postgres'
import { revalidatePath } from 'next/cache'
import { PDFDocument, rgb } from 'pdf-lib'
import fontkit from '@pdf-lib/fontkit'
import { Order, TourWithHotel, User } from '../lib/definitions'

export async function deleteOrder(orderId: string) {
    try {
        await sql`DELETE FROM orders WHERE id = ${orderId};`
        revalidatePath('/', 'layout')
    } catch (error) {
        console.log(error)
        throw new Error('failed to delete order')
    }
}

export async function changeOrderStatus(
    orderId: string,
    _prevState?: any,
    _formData?: FormData,
    status: string = 'paid'
) {
    try {
        await sql`UPDATE orders SET status = ${status} WHERE id = ${orderId};`
        revalidatePath('/', 'layout')
        return { status: true, message: 'Оплачено!' }
    } catch (error) {
        console.log(error)
        return { status: false, message: 'Ошибка! Попробуйте позже.' }
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
        const pdfDoc = await PDFDocument.create()
        const fontUrl =
            'https://db.onlinewebfonts.com/t/3edeef062ebe872bf42d67f609604cf0.ttf'
        const fontBytes = await fetch(fontUrl).then((res) => res.arrayBuffer())

        pdfDoc.registerFontkit(fontkit)
        await pdfDoc.embedFont(fontBytes)

        const customFont = await pdfDoc.embedFont(fontBytes)

        const page = pdfDoc.addPage()
        const { width, height } = page.getSize()

        const title = 'Договор о реализации туристского продукта'
        const titleFontSize = 24
        const textWidth = customFont.widthOfTextAtSize(title, titleFontSize)
        const x = (width - textWidth) / 2

        page.drawText(title, {
            x: x,
            y: height - 50,
            size: titleFontSize,
            font: customFont,
            color: rgb(0, 0, 0)
        })

        const fontSize = 12
        const date = new Date(orderData.date)
        const text = `
            Договор: № ${orderData.id} от ${date.toLocaleDateString('ru-RU', {
            day: 'numeric',
            month: 'long',
            year: 'numeric'
        })}

            ООО "Турфирма Travel", именуемое в дальнейшем "Исполнитель", в лице
            генерального директора Забуборника Афанасия Белоозерского,
            действующего на основании Устава, с одной стороны,
            и гражданин(ка) ${userData.name}, именуемый(ая) в дальнейшем "Заказчик",
            с другой стороны, заключили настоящий договор о нижеследующем:

            1. Предмет договора
            1.1. Исполнитель обязуется оказать Заказчику туристские услуги, а Заказчик
            обязуется оплатить указанные услуги.
            
            2. Обязанности сторон
            2.1. Исполнитель обязуется:
            2.1.1. Организовать и обеспечить качественное оказание туристских услуг.
            2.1.2. Предоставить Заказчику всю необходимую информацию о туристском продукте.
            
            2.2. Заказчик обязуется:
            2.2.1. Оплатить туристские услуги в полном объеме.
            2.2.2. Соблюдать правила поведения и требования безопасности.

            3. Ответственность сторон
            3.1. В случае неисполнения или ненадлежащего исполнения обязательств по
            настоящему договору стороны несут ответственность в соответствии с
            действующим законодательством.

            4. Прочие условия
            4.1. Все споры и разногласия, возникающие из настоящего договора, решаются
            путем переговоров.
            4.2. Настоящий договор составлен в двух экземплярах, по одному для каждой
            из сторон.

            Реквизиты сторон:

            Исполнитель: ООО "Турфирма Travel"
            Телефон: +7 (495) 123-45-67
            Электронная почта: info@travel.ru

            Заказчик: ${userData.name}
            Данные паспорта: ${userData.passport}
            Электронная почта: ${userData.email}

            Подписи сторон:

            Исполнитель: _____________________ / _______________
            Заказчик: ________________________ / _______________
          `

        // Добавление текста на страницу
        const lines = text.split('\n')
        let y = height - 70
        lines.forEach((line) => {
            page.drawText(line, {
                x: 30,
                y,
                size: fontSize,
                font: customFont,
                color: rgb(0, 0, 0)
            })
            y -= fontSize + 4
        })

        // Serialize the PDFDocument to bytes (a Uint8Array)
        const resultURI = await pdfDoc.saveAsBase64({ dataUri: true })
        return { status: true, message: resultURI }
    } catch (error) {
        console.log(error)
        return { status: false, message: 'ошибка' }
    }
}
