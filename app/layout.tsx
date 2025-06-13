import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Thanh Dat (Joi)',
  description: 'Liquid Glass View',
  generator: 'Thanh Dat (Joi)',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
