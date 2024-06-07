'use client'
import { AdminLink } from '@/app/lib/definitions'
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button
} from '@nextui-org/react'
import Link from 'next/link'

export default function NavDropdown({ links }: { links: AdminLink[] }) {
  links.unshift({ href: '/', name: 'Домой' })
  return (
    <Dropdown>
      <DropdownTrigger>
        <Button
          variant="ghost"
          color="primary"
          className="text-text-primary size-full"
        >
          Меню
        </Button>
      </DropdownTrigger>
      <DropdownMenu>
        {links.map((link, index) => (
          <DropdownItem key={index}>
            <Link
              href={link.href}
              className="text-text-primary hover:text-primary-500 w-full block"
            >
              {link.name}
            </Link>
          </DropdownItem>
        ))}
      </DropdownMenu>
    </Dropdown>
  )
}
