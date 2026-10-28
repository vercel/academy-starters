const appName = process.env.NEXT_PUBLIC_APP_NAME || 'GeniusGarage'

export const metadata = {
  title: `${appName} - Store Your Code Snippets`,
  description: 'The best place for developers to store and share code snippets',
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
