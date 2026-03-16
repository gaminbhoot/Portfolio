export default function NotFound() {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '60vh',
      color: '#fff',
      gap: 12,
    }}>
      <h1 style={{ fontSize: 64, fontWeight: 500, margin: 0, opacity: 0.9 }}>404</h1>
      <p style={{ opacity: 0.5, margin: 0 }}>Page not found</p>
    </div>
  );
}