import './globals.css'
import Navbar from './components/Navbar'

export const metadata = {
  title: 'Assignment Challenge',
  description: 'Basic Navbar with Next.js',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body>
        <Navbar />
        <main>{children}</main>
      </body>
    </html>
  );
}

