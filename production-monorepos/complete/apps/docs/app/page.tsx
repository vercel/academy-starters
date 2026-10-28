import Link from 'next/link'

export default function DocsHome() {
  return (
    <main style={{ padding: '4rem 2rem', fontFamily: 'system-ui', maxWidth: '900px', margin: '0 auto' }}>
      <div style={{ marginBottom: '3rem' }}>
        <Link href="/" style={{ fontSize: '1.5rem', fontWeight: 'bold', textDecoration: 'none', color: '#000' }}>
          🧠 GeniusGarage Docs
        </Link>
      </div>

      <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>GeniusGarage API Documentation</h1>
      <p style={{ fontSize: '1.2rem', color: '#666', marginBottom: '3rem' }}>
        Welcome to the GeniusGarage API docs. Learn how to integrate GeniusGarage into your workflow.
      </p>

      <section style={{ marginBottom: '3rem' }}>
        <h2 style={{ fontSize: '1.8rem', marginBottom: '1rem' }}>Quick Start</h2>
        <p style={{ marginBottom: '1rem' }}>Get started with GeniusGarage in minutes:</p>
        <pre style={{ background: '#f5f5f5', padding: '1rem', borderRadius: '8px', overflow: 'auto' }}>
          <code>npm install geniusgarage-sdk</code>
        </pre>
      </section>

      <section style={{ marginBottom: '3rem' }}>
        <h2 style={{ fontSize: '1.8rem', marginBottom: '1rem' }}>Authentication</h2>
        <p style={{ marginBottom: '1rem' }}>All API requests require authentication:</p>
        <pre style={{ background: '#f5f5f5', padding: '1rem', borderRadius: '8px', overflow: 'auto' }}>
          <code>{`import { GeniusGarage } from 'geniusgarage-sdk'

const client = new GeniusGarage({
  apiKey: process.env.GENIUSGARAGE_API_KEY
})`}</code>
        </pre>
      </section>

      <section style={{ marginBottom: '3rem' }}>
        <h2 style={{ fontSize: '1.8rem', marginBottom: '1rem' }}>Create a Snippet</h2>
        <p style={{ marginBottom: '1rem' }}>Save a code snippet programmatically:</p>
        <pre style={{ background: '#f5f5f5', padding: '1rem', borderRadius: '8px', overflow: 'auto' }}>
          <code>{`const snippet = await client.snippets.create({
  title: 'My Snippet',
  code: 'console.log("Hello")',
  language: 'javascript',
  tags: ['javascript', 'hello-world']
})`}</code>
        </pre>
      </section>

      <section style={{ marginBottom: '3rem' }}>
        <h2 style={{ fontSize: '1.8rem', marginBottom: '1rem' }}>Search Snippets</h2>
        <p style={{ marginBottom: '1rem' }}>Find snippets by keyword:</p>
        <pre style={{ background: '#f5f5f5', padding: '1rem', borderRadius: '8px', overflow: 'auto' }}>
          <code>{`const results = await client.snippets.search({
  query: 'react hooks',
  tags: ['react']
})`}</code>
        </pre>
      </section>
    </main>
  )
}


