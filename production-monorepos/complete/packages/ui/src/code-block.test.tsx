import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { CodeBlock } from './code-block'

describe('CodeBlock', () => {
  it('renders code', () => {
    render(<CodeBlock code="console.log('hello')" />)
    expect(screen.getByText("console.log('hello')")).toBeInTheDocument()
  })

  it('displays language label', () => {
    render(<CodeBlock code="print('hello')" language="python" />)
    expect(screen.getByText('python')).toBeInTheDocument()
  })

  it('defaults to javascript', () => {
    render(<CodeBlock code="const x = 1" />)
    expect(screen.getByText('javascript')).toBeInTheDocument()
  })

  it('applies dark theme styles', () => {
    const { container } = render(<CodeBlock code="test" />)
    const codeBlock = container.querySelector('div')
    expect(codeBlock).toHaveStyle({
      backgroundColor: '#1e1e1e',
      color: '#d4d4d4'
    })
  })
})
