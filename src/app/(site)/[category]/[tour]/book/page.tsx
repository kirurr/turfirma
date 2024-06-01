import { fetchTourAndHotels, fetchTourIdByAlias } from '@/app/data/tours-data'
import { notFound } from 'next/navigation'
import { auth } from '@/auth'
import BookForm from '@/app/ui/book-form'

export default async function Page({
  params
}: {
  params: { category: string; tour: string }
}) {
  const id = await fetchTourIdByAlias(params.tour)
  if (!id) notFound()
  const tourData = await fetchTourAndHotels(id.id)
  const session = await auth()

  const ids = {
    user_id: session?.user.user_id,
    tour_id: tourData.id
  }
  return (
    <>
      <h1 className='h1 text-center'>бронирование тура: {tourData.title}</h1>
      <BookForm ids={ids} tourData={tourData} />
    </>
  )
}
