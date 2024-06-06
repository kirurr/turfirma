'use client'

import { AdminLink } from '@/app/lib/definitions'
import { checkForActiveLink } from '@/app/lib/utils'
import { Button } from '@nextui-org/react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function Label({ links }: { links: AdminLink[] }) {
  const pathname = usePathname()

  const canAddArray = ['tours', 'hotels', 'categories']
  const canAdd = canAddArray.includes(pathname.split('/')[2])
  const page = links.find((link) =>
    checkForActiveLink(pathname, link.href)
  ) as { name: string; href: string }
  return (
    <section className="col-start-2 text-2xl flex items-center p-2">
      <h1 className="text-2xl font-bold">{page.name}</h1>
      {canAdd && (
        <Button
          as={Link}
          href={`${page.href}/new`}
          color="primary"
          className="ml-auto"
        >
          Создать
        </Button>
      )}
    </section>
  )
}
