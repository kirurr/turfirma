'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function Navigation({
  links
}: {
  links: { name: string; href: string }[]
}) {
  const pathname = usePathname().split('/')[2]

  return (
    <nav>
      <ul className="flex justify-evenly">
        {links.map((link, index) => {
          let classList = 'link'
          if (pathname === link.href.split('/')[2]) classList += ' active'
          return (
            <li key={index}>
              <Link className={classList} href={link.href}>
                {link.name}
              </Link>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
