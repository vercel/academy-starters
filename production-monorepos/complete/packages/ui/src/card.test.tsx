import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Card } from './card'

describe('Card', () => {
  it('renders children', () => {
    render(<Card>Card content</Card>)
    expect(screen.getByText('Card content')).toBeInTheDocument()
  })

  it('renders title when provided', () => {
    render(<Card title="Test Title">Content</Card>)
    expect(screen.getByText('Test Title')).toBeInTheDocument()
  })

  it('renders without title', () => {
    render(<Card>Content only</Card>)
    expect(screen.queryByRole('heading')).not.toBeInTheDocument()
  })

  it('applies correct styles', () => {
    const { container } = render(<Card>Content</Card>)
    const card = container.firstChild as HTMLElement
    expect(card).toHaveStyle({ 
      borderRadius: '0.75rem',
      padding: '1.5rem'
    })
  })
})
