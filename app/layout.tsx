import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import Header from "@/components/header"
import { MatchesProvider } from "@/context/matches-context"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "IPL Cricket Live",
  description: "Live scores, match details and team information for IPL cricket",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <MatchesProvider>
            <div className="flex min-h-screen flex-col">
              <Header />
              <main className="flex-1">{children}</main>
              <footer className="border-t py-4">
                <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
                  © {new Date().getFullYear()} IPL Cricket Live. All rights reserved.
                </div>
              </footer>
            </div>
          </MatchesProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
