export interface CodeBlockProps {
  code: string
  language?: string
}

export function CodeBlock({ code, language = 'javascript' }: CodeBlockProps) {
  return (
    <div style={{
      backgroundColor: '#1e1e1e',
      color: '#d4d4d4',
      padding: '1rem',
      borderRadius: '0.5rem',
      overflow: 'auto',
      fontFamily: 'monospace',
      fontSize: '0.9rem',
    }}>
      <div style={{ opacity: 0.6, marginBottom: '0.5rem', fontSize: '0.8rem' }}>
        {language}
      </div>
      <pre style={{ margin: 0 }}>
        <code>{code}</code>
      </pre>
    </div>
  )
}
