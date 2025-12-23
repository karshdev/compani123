import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Tech.Care - Patient Dashboard | Medical Healthcare Management',
  description: 'Comprehensive medical dashboard for managing patient information, vital signs, diagnostics, and lab results. Secure healthcare data management system.',
  keywords: [
    'medical',
    'healthcare',
    'patient',
    'dashboard',
    'diagnostics',
    'vital signs',
    'blood pressure',
    'medical records',
    'healthcare management',
    'patient care',
  ],
  authors: [{ name: 'Tech.Care', url: 'https://techcare.example.com' }],
  creator: 'Tech.Care',
  publisher: 'Tech.Care',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://techcare.example.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Tech.Care - Patient Dashboard',
    description: 'Medical dashboard for managing patient information and diagnostics',
    type: 'website',
    locale: 'en_US',
    siteName: 'Tech.Care',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Tech.Care - Patient Dashboard',
    description: 'Medical dashboard for managing patient information and diagnostics',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 5,
  },
  verification: {
    // Add verification codes when available
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="canonical" href="https://techcare.example.com" />
        {/* Structured Data for SEO */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'MedicalWebPage',
              name: 'Tech.Care Patient Dashboard',
              description: 'Medical dashboard for managing patient information and diagnostics',
              url: 'https://techcare.example.com',
              provider: {
                '@type': 'Organization',
                name: 'Tech.Care',
              },
            }),
          }}
        />
      </head>
      <body>
      
          {children}
      </body>
    </html>
  )
}

