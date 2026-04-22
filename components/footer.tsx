import Link from 'next/link'

export function Footer() {
  return (
    <footer className="border-t border-border bg-card">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-8 md:grid-cols-4">
          {/* Brand */}
          <div className="md:col-span-2">
            <Link href="/" className="flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary">
                <span className="font-serif text-lg font-bold text-primary-foreground">A</span>
              </div>
              <span className="font-serif text-xl font-semibold text-primary">
                Advance Network
              </span>
            </Link>
            <p className="mt-4 max-w-md text-sm text-muted-foreground">
              Connecting job seekers with employers, ministries, and businesses within the Advance Movement family of churches in South Africa.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-semibold text-primary">Quick Links</h3>
            <ul className="mt-4 space-y-2">
              <li>
                <Link href="/candidates" className="text-sm text-muted-foreground hover:text-primary">
                  Browse Candidates
                </Link>
              </li>
              <li>
                <Link href="/signup" className="text-sm text-muted-foreground hover:text-primary">
                  Create Account
                </Link>
              </li>
              <li>
                <Link href="/login" className="text-sm text-muted-foreground hover:text-primary">
                  Sign In
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-sm font-semibold text-primary">Legal</h3>
            <ul className="mt-4 space-y-2">
              <li>
                <Link href="#" className="text-sm text-muted-foreground hover:text-primary">
                  Privacy Policy (POPIA)
                </Link>
              </li>
              <li>
                <Link href="#" className="text-sm text-muted-foreground hover:text-primary">
                  Terms of Service
                </Link>
              </li>
              <li>
                <a
                  href="https://advancemovement.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-muted-foreground hover:text-primary"
                >
                  Advance Movement
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 border-t border-border pt-8">
          <p className="text-center text-sm text-muted-foreground">
            © {new Date().getFullYear()} Advance Network. Part of the{' '}
            <a
              href="https://advancemovement.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent hover:underline"
            >
              Advance Movement
            </a>{' '}
            family.
          </p>
        </div>
      </div>
    </footer>
  )
}
