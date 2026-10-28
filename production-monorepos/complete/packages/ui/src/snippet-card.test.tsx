import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { SnippetCard } from './snippet-card'

describe('SnippetCard', () => {
  const mockProps = {
    title: 'Test Snippet',
    language: 'javascript',
    code: 'const x = 1',
    tags: ['test', 'example'],
    createdAt: 'Jan 1, 2024'
  }

  it('renders snippet title', () => {
    render(<SnippetCard {...mockProps} />)
    expect(screen.getByText('Test Snippet')).toBeInTheDocument()
  })

  it('renders creation date', () => {
    render(<SnippetCard {...mockProps} />)
    expect(screen.getByText('Jan 1, 2024')).toBeInTheDocument()
  })

  it('renders all tags', () => {
    render(<SnippetCard {...mockProps} />)
    expect(screen.getByText('test')).toBeInTheDocument()
    expect(screen.getByText('example')).toBeInTheDocument()
  })

  it('renders code block with correct language', () => {
    render(<SnippetCard {...mockProps} />)
    expect(screen.getByText('javascript')).toBeInTheDocument()
    expect(screen.getByText('const x = 1')).toBeInTheDocument()
  })

  it('handles empty tags array', () => {
    render(<SnippetCard {...mockProps} tags={[]} />)
    expect(screen.queryByText('test')).not.toBeInTheDocument()
  })
})
