import { Spinner } from "@nextui-org/react"
import { Suspense } from "react"

export default function Page() {
  return (
    <Suspense fallback={<Spinner size="lg" className="size-full" />}>
      <Main />
    </Suspense>
  )
}

async function Main() {
  return (
		<h1>hihi</h1>
	)
}