import Link from 'next/link';

const productLinks = [
  { label: 'Electrical Tool Set', href: '/products/bluebeam-electrical-tool-set/' },
  { label: 'Fire Alarm Symbols', href: '/products/bluebeam-fire-alarm-symbols/' },
  { label: 'CCTV Tool Set', href: '/products/bluebeam-cctv-tool-set/' },
  { label: 'Security Tool Set', href: '/products/bluebeam-security-tool-set/' },
  { label: 'AV and Data Symbols', href: '/products/bluebeam-av-data-symbols/' },
  { label: 'Estimating Tools', href: '/products/bluebeam-estimating-takeoff-tools/' },
];

const resourceLinks = [
  { label: 'How to Import a BTX File', href: '/guides/how-to-import-bluebeam-btx-tool-set/' },
  { label: 'Tool Chest Guide', href: '/guides/bluebeam-tool-chest-organisation-guide/' },
  { label: 'Electrical Symbols Guide', href: '/blog/bluebeam-electrical-symbols-guide/' },
  { label: 'All Guides', href: '/guides/' },
  { label: 'Blog', href: '/blog/' },
];

const supportLinks = [
  { label: 'FAQ', href: '/faq/' },
  { label: 'Contact', href: '/contact/' },
  { label: 'Licence', href: '/license/' },
  { label: 'Refund Policy', href: '/refund-policy/' },
  { label: 'Free Sample', href: '/free-bluebeam-symbols-sample/' },
];

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300">
      <div className="max-w-content mx-auto px-5 lg:px-8 py-14">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div>
            <Link href="/" className="text-white font-bold text-base hover:text-brand-400 transition-colors">
              Construction Markup Tools
            </Link>
            <p className="mt-3 text-sm text-slate-400 leading-relaxed">
              Original downloadable Bluebeam Revu markup tool sets for construction professionals.
            </p>
            <p className="mt-4 text-xs text-slate-500 leading-relaxed">
              Bluebeam and Revu are trademarks of their respective owners. This site is independent and not affiliated with or endorsed by Bluebeam, Inc.
            </p>
          </div>

          {/* Products */}
          <div>
            <h3 className="text-white text-sm font-semibold mb-4 uppercase tracking-wider">Products</h3>
            <ul className="space-y-2">
              {productLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-slate-400 hover:text-white transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-white text-sm font-semibold mb-4 uppercase tracking-wider">Resources</h3>
            <ul className="space-y-2">
              {resourceLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-slate-400 hover:text-white transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-white text-sm font-semibold mb-4 uppercase tracking-wider">Support</h3>
            <ul className="space-y-2">
              {supportLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-slate-400 hover:text-white transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-slate-800 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 text-xs text-slate-500">
          <p>&copy; {new Date().getFullYear()} Construction Markup Tools. All rights reserved.</p>
          <div className="flex gap-4">
            <Link href="/license/" className="hover:text-slate-300 transition-colors">Licence</Link>
            <Link href="/refund-policy/" className="hover:text-slate-300 transition-colors">Refund Policy</Link>
            <Link href="/contact/" className="hover:text-slate-300 transition-colors">Contact</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
