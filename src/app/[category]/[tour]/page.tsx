import { fetchTourByAlias } from "@/app/data/tours-data"
import { notFound } from "next/navigation"

export default async function Page({ params }: { params: { tour: string } }) {
	const tour = await fetchTourByAlias(params.tour)
	if(!tour) notFound() 
	
  return <h1>{tour.title}</h1>
}
