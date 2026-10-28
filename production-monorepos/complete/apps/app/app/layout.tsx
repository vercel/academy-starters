export const metadata = {
  title: 'GeniusGarage App',
  description: 'Manage your code snippets',
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
