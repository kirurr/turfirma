'use client'

import { usePathname, useSearchParams, useRouter } from 'next/navigation'
import { Input, Button } from '@nextui-org/react'
import { FormButton } from '@/app/ui/auth/auth-forms'

export default function Search() {
  const searchParams = useSearchParams()
  const pathName = usePathname()
  const { replace } = useRouter()

  function handleSearch(formData: FormData) {
    const params = new URLSearchParams(searchParams)
    const query = formData.get('query')
		params.set('page', '1')
    if (query) {
      params.set('query', query.toString())
    } else {
      params.delete('query')
    }
    replace(`${pathName}?${params.toString()}`)
  }

  return (
    <div>
      <form action={handleSearch} className='flex gap-2 items-center'>
				<Input label="Поиск" name='query' type='text' defaultValue={searchParams.get('query')?.toString()} />
				<FormButton title='Искать'/>
      </form>
    </div>
  )
}
