export const metadata = {
  title: 'GeniusGarage',
  description: 'Store your genius code snippets',
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
