import BookButton from '@/app/ui/book-button'
import { fetchTourAndHotels } from '@/app/data/tours-data'
import { notFound } from 'next/navigation'
import { auth } from '@/auth'

export default async function Page({ params }: { params: { tour: string } }) {
  const tour = await fetchTourAndHotels(params.tour)
  if (!tour) notFound()

  const session = await auth()
  const signedIn = session?.user ? true : false

  return (
    <>
      <h1>{tour.tour_title}</h1>

      {tour?.hotels_info?.length !== 0 ? (
        <div>
          <h2>есть отели</h2>
          <ul>
            {tour?.hotels_info?.map((hotel) => (
              <li key={hotel.hotel_id}>{hotel.hotel_title}</li>
            ))}
          </ul>
        </div>
      ) : (
        <div>
          <h2>отелей нет</h2>
        </div>
      )}
      {signedIn ? (
        <BookButton title="купить" />
      ) : (
        <p>для покупки тура авторизируйтесь</p>
      )}
    </>
  )
}
