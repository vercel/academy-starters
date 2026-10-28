import Link from 'next/link'
import { Card } from '@geniusgarage/ui/card'

export default function Features() {
  return (
    <main style={{ padding: '4rem 2rem', fontFamily: 'system-ui', maxWidth: '1200px', margin: '0 auto' }}>
      <nav style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4rem' }}>
        <Link href="/" style={{ fontSize: '1.5rem', fontWeight: 'bold', textDecoration: 'none', color: '#000' }}>
          🧠 GeniusGarage
        </Link>
        <div style={{ display: 'flex', gap: '2rem' }}>
          <Link href="/features" style={{ textDecoration: 'none', color: '#000', fontWeight: 'bold' }}>Features</Link>
          <Link href="/pricing" style={{ textDecoration: 'none', color: '#666' }}>Pricing</Link>
        </div>
      </nav>

      <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem', textAlign: 'center' }}>Features</h1>
      <p style={{ fontSize: '1.2rem', color: '#666', marginBottom: '3rem', textAlign: 'center' }}>
        Everything you need to manage your code snippets
      </p>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
        <Card title="⚡ Fast Search">
          Find your snippets instantly with powerful full-text search and filtering by tags
        </Card>
        <Card title="📁 Organized">
          Keep your code organized with tags, folders, and collections
        </Card>
        <Card title="🔗 Shareable">
          Share snippets with your team or make them public for the community
        </Card>
        <Card title="🎨 Syntax Highlighting">
          Beautiful syntax highlighting for 100+ programming languages
        </Card>
        <Card title="📋 One-Click Copy">
          Copy snippets to your clipboard with a single click
        </Card>
        <Card title="🔐 Private & Secure">
          Your private snippets stay private with enterprise-grade security
        </Card>
      </div>
    </main>
  )
}
