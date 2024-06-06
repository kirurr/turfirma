'use client'

import { AdminLink } from '@/app/lib/definitions'
import { checkForActiveLink } from '@/app/lib/utils'
import { Button } from '@nextui-org/react'
import clsx from 'clsx'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function Navigation({ links }: { links: AdminLink[] }) {
  const pathname = usePathname()
  return (
    <nav>
      <ul className="flex flex-col gap-2">
        {links.map((link, index) => {
          const isActive = checkForActiveLink(pathname, link.href)
          return (
            <li key={index}>
              <Button
                as={Link}
                href={link.href}
                variant="ghost"
                className={clsx(
                  'text-text-primary size-full',
                  isActive && 'bg-primary-500 text-text-secondary'
                )}
                color="primary"
              >
                {link.name}
              </Button>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
