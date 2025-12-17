export default function IssueLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <>
      <div style={{ background: 'peru' }}>{children}</div>
    </>
  )
}
