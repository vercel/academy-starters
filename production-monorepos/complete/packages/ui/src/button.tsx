'use client'

export interface ButtonProps {
  children: React.ReactNode
  variant?: 'primary' | 'secondary'
  onClick?: () => void
}

export function Button({ children, variant = 'primary', onClick }: ButtonProps) {
  const styles = {
    padding: '0.75rem 1.5rem',
    fontSize: '1rem',
    border: 'none',
    borderRadius: '0.5rem',
    cursor: 'pointer',
    fontWeight: '600',
    backgroundColor: variant === 'primary' ? '#0070f3' : '#eaeaea',
    color: variant === 'primary' ? 'white' : '#333',
  }

  return (
    <button style={styles} onClick={onClick}>
      {children}
    </button>
  )
}
