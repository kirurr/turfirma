'use client'

import React from 'react'
import { Pagination } from '@nextui-org/react'
import { usePathname, useSearchParams } from 'next/navigation'
import { useCallback, useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

export default function ToursPagination({
  totalPages,
  className
}: {
  totalPages: number
  className?: string
}) {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const currentPage = Number(searchParams.get('page')) || 1

  const [pageState, setPageState] = useState(currentPage)

  const createPageURL = useCallback(
    (pageNumber: number | string) => {
      const params = new URLSearchParams(searchParams)
      params.set('page', pageNumber.toString())
      return `${pathname}?${params.toString()}`
    },
    [pathname, searchParams]
  )

  const router = useRouter()
  useEffect(() => {
    router.push(createPageURL(pageState))
  }, [pageState, router, createPageURL])

  return (
    <div className={className}>
      <Pagination
        loop={true}
        showControls={true}
        total={totalPages}
        page={currentPage}
        onChange={setPageState}
      />
    </div>
  )
}
