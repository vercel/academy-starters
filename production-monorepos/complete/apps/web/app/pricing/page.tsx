import Link from 'next/link'
import { Button } from '@geniusgarage/ui/button'
import { Card } from '@geniusgarage/ui/card'

export default function Pricing() {
  return (
    <main style={{ padding: '4rem 2rem', fontFamily: 'system-ui', maxWidth: '1200px', margin: '0 auto' }}>
      <nav style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4rem' }}>
        <Link href="/" style={{ fontSize: '1.5rem', fontWeight: 'bold', textDecoration: 'none', color: '#000' }}>
          🧠 GeniusGarage
        </Link>
        <div style={{ display: 'flex', gap: '2rem' }}>
          <Link href="/features" style={{ textDecoration: 'none', color: '#666' }}>Features</Link>
          <Link href="/pricing" style={{ textDecoration: 'none', color: '#000', fontWeight: 'bold' }}>Pricing</Link>
        </div>
      </nav>

      <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem', textAlign: 'center' }}>Pricing</h1>
      <p style={{ fontSize: '1.2rem', color: '#666', marginBottom: '3rem', textAlign: 'center' }}>
        Choose the plan that works for you
      </p>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem', maxWidth: '900px', margin: '0 auto' }}>
        <Card title="Free">
          <div style={{ fontSize: '2.5rem', fontWeight: 'bold', marginBottom: '1rem' }}>$0</div>
          <ul style={{ listStyle: 'none', padding: 0, marginBottom: '2rem' }}>
            <li style={{ padding: '0.5rem 0' }}>✓ 50 snippets</li>
            <li style={{ padding: '0.5rem 0' }}>✓ Basic search</li>
            <li style={{ padding: '0.5rem 0' }}>✓ Public sharing</li>
          </ul>
          <Link href="http://localhost:3001">
            <Button variant="secondary">Get Started</Button>
          </Link>
        </Card>

        <Card title="Pro">
          <div style={{ fontSize: '2.5rem', fontWeight: 'bold', marginBottom: '1rem' }}>$9<span style={{ fontSize: '1rem' }}>/month</span></div>
          <ul style={{ listStyle: 'none', padding: 0, marginBottom: '2rem' }}>
            <li style={{ padding: '0.5rem 0' }}>✓ Unlimited snippets</li>
            <li style={{ padding: '0.5rem 0' }}>✓ Advanced search</li>
            <li style={{ padding: '0.5rem 0' }}>✓ Private snippets</li>
            <li style={{ padding: '0.5rem 0' }}>✓ Team collaboration</li>
          </ul>
          <Link href="http://localhost:3001">
            <Button>Start Free Trial</Button>
          </Link>
        </Card>

        <Card title="Enterprise">
          <div style={{ fontSize: '2.5rem', fontWeight: 'bold', marginBottom: '1rem' }}>Custom</div>
          <ul style={{ listStyle: 'none', padding: 0, marginBottom: '2rem' }}>
            <li style={{ padding: '0.5rem 0' }}>✓ Everything in Pro</li>
            <li style={{ padding: '0.5rem 0' }}>✓ SSO & SAML</li>
            <li style={{ padding: '0.5rem 0' }}>✓ Advanced security</li>
            <li style={{ padding: '0.5rem 0' }}>✓ Dedicated support</li>
          </ul>
          <Button variant="secondary">Contact Sales</Button>
        </Card>
      </div>
    </main>
  )
}
