import Link from "next/link";

export default function Footer() {
  return (
    <footer className="mt-auto border-t border-gray-800 bg-[#1a1d2e]">
      <div className="mx-auto max-w-7xl px-6 py-8">
        <div className="flex items-center justify-between text-sm text-gray-400">
          <div className="flex items-center gap-2">
            <span>© 2025</span>
            <Link href="/" className="flex items-center gap-1 font-semibold hover:text-gray-300">
              <span className="bg-gradient-to-r from-purple-500 to-blue-500 bg-clip-text text-transparent">M</span>
              <span>orbius.cash</span>
            </Link>
            <span>•</span>
            <span>All rights reserved</span>
            <span>•</span>
            <Link href="/disclaimer" className="hover:text-gray-300">
              Disclaimer
            </Link>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <span>Socials:</span>
              <a
                href="https://t.me/@morbius_cash.me"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded p-1 hover:bg-gray-700/50 transition-colors"
              >
                <svg className="h-5 w-5 text-gray-400 hover:text-[#0088cc]" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.562 8.161c-.18 1.897-.962 6.502-1.359 8.627-.168.9-.5 1.201-.82 1.23-.697.064-1.226-.461-1.901-.903-1.056-.692-1.653-1.123-2.678-1.799-1.185-.781-.417-1.21.258-1.911.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.139-5.062 3.345-.479.329-.913.489-1.302.481-.428-.008-1.252-.241-1.865-.44-.752-.244-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.831-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635.099-.002.321.023.465.14.121.098.155.23.171.324.016.094.037.308.021.475z"/>
                </svg>
              </a>
            </div>
            <Link href="/report" className="flex items-center gap-2 hover:text-gray-300">
              <span>Report Issue</span>
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 21v-4m0 0V5a2 2 0 012-2h6.5l1 1H21l-3 6 3 6h-8.5l-1-1H5a2 2 0 00-2 2zm9-13.5V9" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
