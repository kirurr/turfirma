import Link from 'next/link'

export default function TopNav() {
  return (
    <div>
      <nav>
        <ul>
					<TopNavItem href="/" title="домой" />
          <TopNavItem href="/profile" title="личный кабинет" />
          <TopNavItem href="/about" title="о нас" />
          <TopNavItem href="/reviews" title="отзывы" />
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
