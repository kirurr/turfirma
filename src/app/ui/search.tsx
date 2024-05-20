'use client'

import { usePathname, useSearchParams, useRouter } from 'next/navigation'

export default function Search() {
  const searchParams = useSearchParams()
  const pathName = usePathname()
  const { replace } = useRouter()

  function handleSearch(formData: FormData) {
    const params = new URLSearchParams(searchParams)
    const query = formData.get('query')
    if (query) {
      params.set('query', query.toString())
    } else {
      params.delete('query')
    }
    replace(`${pathName}?${params.toString()}`)
  }

  return (
    <div>
      <form action={handleSearch}>
        <label htmlFor="search">поиск</label>
        <input
          placeholder="название тура"
          defaultValue={searchParams.get('query')?.toString()}
          id="search"
          type="text"
          name="query"
        />
        <button>искать</button>
      </form>
    </div>
  )
}
