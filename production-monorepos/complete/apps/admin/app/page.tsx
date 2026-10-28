import { Card } from '@geniusgarage/ui/card'

// Mock analytics data
const stats = {
  totalUsers: 1234,
  totalSnippets: 5678,
  activeToday: 89,
}

export default function Admin() {
  return (
    <main style={{ padding: '2rem', fontFamily: 'system-ui', maxWidth: '1200px', margin: '0 auto' }}>
      <h1>Admin Dashboard</h1>
      <p style={{ color: '#666', marginBottom: '2rem' }}>Internal analytics and management</p>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem' }}>
        <Card title="Total Users">
          <div style={{ fontSize: '2rem', fontWeight: 'bold' }}>{stats.totalUsers}</div>
        </Card>
        <Card title="Total Snippets">
          <div style={{ fontSize: '2rem', fontWeight: 'bold' }}>{stats.totalSnippets}</div>
        </Card>
        <Card title="Active Today">
          <div style={{ fontSize: '2rem', fontWeight: 'bold' }}>{stats.activeToday}</div>
        </Card>
      </div>
    </main>
  )
}
