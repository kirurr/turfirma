'use client'

import { AdminLink } from '@/app/lib/definitions';
import { checkForActiveLink } from '@/app/lib/utils';
import clsx from 'clsx';
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function Navigation({
  links
}: {
  links: AdminLink[]
}) {
  const pathname = usePathname()
  return (
    <nav>
      <ul className="flex flex-col gap-2">
        {links.map((link, index) => {
          const isActive = checkForActiveLink(pathname, link.href)
          return (
            <li key={index} className={clsx("w-full flex items-center rounded-lg bg-primary-50 border-2 border-primary-200", isActive ? "border-primary-500" : "")}>
              <Link href={link.href} className='size-full px-2 py-4 rounded-lg text-lg font-semibold focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary-500 underline-offset-2'>
                {link.name}
              </Link>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
