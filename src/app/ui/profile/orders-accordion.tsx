'use client'

import { Order, TourWithHotel, User } from '@/app/lib/definitions'
import { Accordion, AccordionItem, Button, Chip } from '@nextui-org/react'
import Link from 'next/link'
import DocumentForm from '@/app/ui/profile/document-form'

export default function OrdersAccordion({
  orders,
  tours,
  user
}: {
  orders: Order[]
  tours: TourWithHotel[]
  user: User
}) {
  return (
    <Accordion variant='shadow'>
      {orders.map((order, index) => {
        const orderTour = tours.find((tour) => tour.id === order.tour_id)
        let orderHotel
        if (orderTour?.hotels_info.length! > 0) {
          orderHotel = orderTour?.hotels_info.find(
            (hotel) => hotel.id === order.hotel_id
          )
        }
        return (
          <AccordionItem
            key={index}
            title={`Тур: ${orderTour?.title}`}
            startContent={<OrderStatus status={order.status} />}
            className='py-8'
          >
            {orderHotel && (
              <p className="p text-balance sm:text-start text-center my-4 sm:mt-0"><strong className='font-semibold'>Выбранный отель: </strong>{orderHotel.title}</p>
            )}
            <div className='flex sm:flex-row flex-col w-full sm:w-auto gap-2 items-center'>
              {order.status === 'pending' && (
                <Button as={Link} href={`/profile/${order.id}`} color="primary">
                  Внести оплату
                </Button>
              )}
              {order.status === 'paid' && (
                <DocumentForm
                  orderData={order}
                  tourData={orderTour!}
                  userData={user}
                />
              )}
              <Button
                as={Link}
                href={`/tours/${orderTour?.alias}`}
                color="primary"
                variant="bordered"
              >
                Открыть страницу тура
              </Button>
            </div>
          </AccordionItem>
        )
      })}
    </Accordion>
  )
}

function OrderStatus({ status }: { status: 'pending' | 'paid' | 'canceled' }) {
  return (
    <>
      {status === 'pending' && <Chip variant="bordered">Не оплачено</Chip>}
      {status === 'paid' && <Chip color="success">Оплачено</Chip>}
      {status === 'canceled' && <Chip color="danger">Отменено</Chip>}
    </>
  )
}
