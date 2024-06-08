import '@/app/ui/globals.css'
import { Inter as FontSans } from 'next/font/google'
import { SpeedInsights } from '@vercel/speed-insights/next'

export const metadata = {
  title: 'Турфирма Travel',
  description:
    'Далеко-далеко за словесными горами в стране, гласных и согласных живут рыбные тексты. Образ раз грамматики злых запятой бросил ipsum возвращайся имени сих.'
}

import { cn } from '@/app/lib/utils'

const fontSans = FontSans({
  subsets: ['latin'],
  variable: '--font-sans'
})

import { Providers } from './providers'

export default function RootLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="light">
      <body
        className={cn(
          'bg-primary-color font-sans antialiased',
          fontSans.variable
        )}
      >
        <Providers>{children}</Providers>
        <SpeedInsights />
      </body>
    </html>
  )
}
