import type { ReactNode } from 'react'
import Header from '@/shared/components/Header/Header.tsx'
import Footer from '@/shared/components/Footer/Footer.tsx'

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <Header />
      <main id="main-content">{children}</main>
      <Footer />
    </>
  )
}
