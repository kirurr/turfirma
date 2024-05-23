'use client'

import Link from 'next/link'
import { generatePagination } from '@/app/lib/utils'
import { usePathname, useSearchParams } from 'next/navigation'

export default function Pagination({ totalPages }: { totalPages: number }) {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const currentPage = Number(searchParams.get('page')) || 1

  function createPageURL(pageNumber: number | string) {
    const params = new URLSearchParams(searchParams)
    params.set('page', pageNumber.toString())
    if (pageNumber === 1) return `${pathname}`
    return `${pathname}?${params.toString()}`
  }

  const allPages = generatePagination(currentPage, totalPages)

  return (
    <>
      <div>
        <PaginationArrow
          direction="left"
          href={createPageURL(currentPage - 1)}
          isDisabled={currentPage <= 1}
        />

        <div>
          {allPages.map((page, index) => {
            let position: 'first' | 'last' | 'single' | 'middle' | undefined

            if (index === 0) position = 'first'
            if (index === allPages.length - 1) position = 'last'
            if (allPages.length === 1) position = 'single'
            if (page === '...') position = 'middle'

            return (
              <PaginationNumber
                key={page}
                href={createPageURL(page)}
                page={page}
                position={position}
                isActive={currentPage === page}
              />
            )
          })}
        </div>

        <PaginationArrow
          direction="right"
          href={createPageURL(currentPage + 1)}
          isDisabled={currentPage >= totalPages}
        />
      </div>
    </>
  )
}

function PaginationNumber({
  page,
  href,
  isActive,
  position
}: {
  page: number | string
  href: string
  position?: 'first' | 'last' | 'middle' | 'single'
  isActive: boolean
}) {
  return isActive || position === 'middle' ? (
    <div>{page}</div>
  ) : (
    <Link href={href}>{page}</Link>
  )
}

function PaginationArrow({
  href,
  direction,
  isDisabled
}: {
  href: string
  direction: 'left' | 'right'
  isDisabled?: boolean
}) {
  const icon = direction === 'left' ? <>назад</> : <>вперед</>

  return isDisabled ? <></> : <Link href={href}>{icon}</Link>
}
