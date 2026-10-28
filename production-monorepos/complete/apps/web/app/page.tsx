import Link from 'next/link'
import { Button } from '@geniusgarage/ui/button'
import { Card } from '@geniusgarage/ui/card'

export default function Home() {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'
  const appName = process.env.NEXT_PUBLIC_APP_NAME || 'GeniusGarage Web'
  return (
    <main style={{ padding: '4rem 2rem', fontFamily: 'system-ui', maxWidth: '1200px', margin: '0 auto' }}>
      <nav style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4rem' }}>
        <Link href="/" style={{ fontSize: '1.5rem', fontWeight: 'bold', textDecoration: 'none', color: '#000' }}>
          🧠 GeniusGarage
        </Link>
        <div style={{ display: 'flex', gap: '2rem' }}>
          <Link href="/features" style={{ textDecoration: 'none', color: '#666' }}>Features</Link>
          <Link href="/pricing" style={{ textDecoration: 'none', color: '#666' }}>Pricing</Link>
        </div>
      </nav>

      <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
        <h1 style={{ fontSize: '3rem', marginBottom: '1rem' }}>Store Your Genius Code Snippets</h1>
        <p style={{ fontSize: '1.5rem', color: '#666', marginBottom: '2rem' }}>
          The best place for developers to organize and share code
        </p>
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
          <Link href="http://localhost:3001">
            <Button>Get Started</Button>
          </Link>
          <Link href="/features">
            <Button variant="secondary">Learn More</Button>
          </Link>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
        <Card title="Fast Search">
          Find your snippets instantly with powerful search
        </Card>
        <Card title="Organized">
          Keep your code organized with tags and folders
        </Card>
        <Card title="Shareable">
          Share snippets with your team or the world
        </Card>
      </div>

      <footer style={{ marginTop: '4rem', padding: '2rem', textAlign: 'center', borderTop: '1px solid #eaeaea' }}>
        <p style={{ color: '#666', fontSize: '0.875rem' }}>
          {appName} • API: {apiUrl}
        </p>
      </footer>
    </main>
  )
}
