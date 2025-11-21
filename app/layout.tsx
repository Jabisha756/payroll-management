import './globals.css'

export const metadata = {
  title: 'Payroll Management System',
  description: 'Admin and Employee Payroll Dashboard',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="flex items-center justify-center min-h-screen">{children}</body>
    </html>
  )
}
