export interface CardProps {
  title?: string
  children: React.ReactNode
}

export function Card({ title, children }: CardProps) {
  return (
    <div style={{
      border: '1px solid #eaeaea',
      borderRadius: '0.75rem',
      padding: '1.5rem',
      backgroundColor: 'white',
    }}>
      {title && <h3 style={{ marginTop: 0, marginBottom: '1rem' }}>{title}</h3>}
      <div>{children}</div>
    </div>
  )
}
