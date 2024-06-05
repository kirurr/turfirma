'use client'

import Link from 'next/link'
import React from 'react'
import { SignInModal, SignUpModal } from '@/app/ui/auth/auth-forms'
import AuthButtons from '@/app/ui/auth/auth-buttons'
import {
  useDisclosure,
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Dropdown,
  DropdownItem,
  DropdownTrigger,
  Button,
  DropdownMenu
} from '@nextui-org/react'
import { ChevronDown } from '@/app/ui/icons'
import { Category } from '@/app/lib/definitions'

export default function TopNav({
  isAuth,
  isAdmin,
  categories
}: {
  isAuth: boolean
  isAdmin: boolean
  categories: Category[]
}) {
  const {
    isOpen: isSignInOpen,
    onOpen: onSignInOpen,
    onOpenChange: onSignInOpenChange,
    onClose: onSignInClose
  } = useDisclosure()
  const {
    isOpen: isSignUpOpen,
    onOpen: onSignUpOpen,
    onOpenChange: onSignUpOpenChange,
    onClose: onSignUpClose
  } = useDisclosure()
  return (
    <>
      <Navbar maxWidth="xl" shouldHideOnScroll height='5rem' isBordered isBlurred={false} >
        <NavbarBrand>
          <Link href="/" className="!font-bold !text-2xl top-nav-link">
            Турфирма Travel
          </Link>
        </NavbarBrand>
        <NavbarContent justify="center" className="flex gap-8">
          <NavbarItem>
            <Link href="/tours" className="top-nav-link">
              Все туры
            </Link>
          </NavbarItem>
          <Dropdown>
            <NavbarItem>
              <DropdownTrigger>
                <Button
                  disableRipple
                  className="p-0 bg-transparent data-[hover=true]:bg-transparent text-lg font-semibold"
                  endContent={<ChevronDown fill="currentColor" size={16} />}
                  radius="sm"
                  variant="light"
                >
                  Направления
                </Button>
              </DropdownTrigger>
            </NavbarItem>
            <DropdownMenu>
              {categories.map((category, index) => (
                <DropdownItem key={index}>
                  <Link
                    className=" rounded-lg text-lg font-semibold w-full block focus-visible:outline focus-visible:outline-blue-500"
                    href={`/${category.alias}`}
                  >
                    {category.title}
                  </Link>
                </DropdownItem>
              ))}
            </DropdownMenu>
          </Dropdown>
          <NavbarItem>
            <Link href="/about" className="top-nav-link">
              О нас
            </Link>
          </NavbarItem>
          <NavbarItem>
            <Link href="/reviews" className="top-nav-link">
              Отзывы
            </Link>
          </NavbarItem>
        </NavbarContent>
        <NavbarContent justify="end">
          <NavbarItem>
            <AuthButtons
              className="flex p-4"
              isAuth={isAuth}
              isAdmin={isAdmin}
              onSignInOpen={onSignInOpen}
              onSignUpOpen={onSignUpOpen}
            />
          </NavbarItem>
        </NavbarContent>
      </Navbar>
      <SignInModal
        isOpen={isSignInOpen}
        onOpen={onSignInOpen}
        onOpenChange={onSignInOpenChange}
        onClose={onSignInClose}
      />
      <SignUpModal
        isOpen={isSignUpOpen}
        onOpen={onSignUpOpen}
        onClose={onSignUpClose}
      />
    </>
  )
}

function TopNavItem({ href, title }: { href: string; title: string }) {
  return (
    <li>
      <Link href={href}>{title}</Link>
    </li>
  )
}
