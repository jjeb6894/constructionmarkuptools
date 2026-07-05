'use client';

import Link from 'next/link';
import { useState } from 'react';

const navLinks = [
  { label: 'Products', href: '/products/' },
  { label: 'Guides', href: '/guides/' },
  { label: 'Blog', href: '/blog/' },
  { label: 'FAQ', href: '/faq/' },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-slate-200">
      <div className="max-w-content mx-auto px-5 lg:px-8 flex items-center justify-between h-16">
        <Link href="/" className="text-slate-900 font-bold text-lg tracking-tight hover:text-brand-600 transition-colors">
          Construction Markup Tools
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-6" aria-label="Primary navigation">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-slate-600 hover:text-brand-600 transition-colors"
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/free-bluebeam-symbols-sample/"
            className="ml-2 inline-flex items-center h-9 px-4 rounded-md bg-brand-600 text-white text-sm font-semibold hover:bg-brand-700 transition-colors"
          >
            Free Sample
          </Link>
        </nav>

        {/* Mobile menu button */}
        <button
          className="md:hidden p-2 rounded-md text-slate-600 hover:text-slate-900 hover:bg-slate-100"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle navigation menu"
          aria-expanded={menuOpen}
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {menuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile nav */}
      {menuOpen && (
        <div className="md:hidden border-t border-slate-200 bg-white px-5 py-4 flex flex-col gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="block py-2 text-sm font-medium text-slate-700 hover:text-brand-600"
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/free-bluebeam-symbols-sample/"
            className="mt-2 inline-flex items-center justify-center h-10 px-4 rounded-md bg-brand-600 text-white text-sm font-semibold hover:bg-brand-700"
            onClick={() => setMenuOpen(false)}
          >
            Free Sample
          </Link>
        </div>
      )}
    </header>
  );
}
