import Link from 'next/link'

export default function TopNav() {
  return (
    <div>
      <nav>
        <ul>
          <TopNavItem href="/profile" title="личный кабинет" />
          <TopNavItem href="/about" title="о нас" />
        </ul>
      </nav>
    </div>
  )
}

function TopNavItem({ href, title }: { href: string; title: string }) {
  return (
    <li>
      <Link href={href}>{title}</Link>
    </li>
  )
}
