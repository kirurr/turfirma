'use client'
import { AdminLink } from '@/app/lib/definitions'
import { checkForActiveLink } from '@/app/lib/utils'
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button
} from '@nextui-org/react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { Key } from 'react'

export default function NavDropdown({ links }: { links: AdminLink[] }) {
  const array = [{ href: '/', name: 'Домой' }].concat(links)

  const pathname = usePathname()

  const page = array.find((link) => checkForActiveLink(pathname, link.href)) as AdminLink
  const [selectedKey, setSelectedKey] = React.useState(new Set([page.name]))

  return (
    <Dropdown>
      <DropdownTrigger>
        <Button
          variant="ghost"
          color="primary"
          className="text-text-primary w-1/3"
        >
          {page.name}
        </Button>
      </DropdownTrigger>
      <DropdownMenu
        disallowEmptySelection
        selectionMode="single"
        selectedKeys={selectedKey}
        onSelectionChange={(keys) => setSelectedKey(new Set(keys.toString()))}
      >
        {array.map((link) => (
          <DropdownItem key={link.name} as={Link} href={link.href}>
            {link.name}
          </DropdownItem>
        ))}
      </DropdownMenu>
    </Dropdown>
  )
}
