export const metadata = {
  title: 'GeniusGarage Admin',
  description: 'Internal admin dashboard',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
