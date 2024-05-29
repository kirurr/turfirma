'use client'

import Link from 'next/link'
import React from 'react'
import { SignInModal, SignUpModal } from '@/app/ui/auth/auth-forms'
import AuthButtons from './auth/auth-buttons'
import { useDisclosure } from '@nextui-org/react'

export default function TopNav({ isAuth, isAdmin }: { isAuth: boolean, isAdmin: boolean }) {
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
      <nav className='flex w-2/3 mx-auto'>
        <ul className="flex p-4 gap-8 justify-evenly w-full">
          <TopNavItem href="/" title="домой" />
          <TopNavItem href="/about" title="о нас" />
          <TopNavItem href="/reviews" title="отзывы" />
        </ul>
        <AuthButtons
					className='flex p-4'
          isAuth={isAuth}
          isAdmin={isAdmin}
          onSignInOpen={onSignInOpen}
          onSignUpOpen={onSignUpOpen}
        />
      </nav>
      <SignInModal
        isOpen={isSignInOpen}
        onOpen={onSignInOpen}
        onOpenChange={onSignInOpenChange}
        onClose={onSignInClose}
      />
      <SignUpModal
        isOpen={isSignUpOpen}
        onOpen={onSignUpOpen}
        onOpenChange={onSignUpOpenChange}
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
