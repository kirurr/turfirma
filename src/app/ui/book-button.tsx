'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function BookButton({ title }: { title: string }) {
  const href = usePathname()

  return <Link href={`${href}/book`}>{title}</Link>
}
