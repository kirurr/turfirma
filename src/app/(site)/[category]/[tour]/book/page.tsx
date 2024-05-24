import { fetchTourAndHotels } from '@/app/data/tours-data'
import { notFound } from 'next/navigation'
import { auth } from '@/auth'
import BookForm from '@/app/ui/book-form'

export default async function Page({
  params
}: {
  params: { category: string; tour: string }
}) {
  const tourData = await fetchTourAndHotels(params.tour)
  if (!tourData) notFound()
  const session = await auth()

  const ids = {
    user_id: session?.user.user_id,
    tour_alias: tourData.tour_alias
  }
  return (
    <>
      <h1>бронирование тура: {tourData.tour_title}</h1>
      <BookForm ids={ids} tourData={tourData} />
    </>
  )
}
