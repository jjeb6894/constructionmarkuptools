import type { Metadata } from 'next';
import Link from 'next/link';
import Breadcrumbs from '@/components/Breadcrumbs';
import Schema from '@/components/Schema';
import TrustBadges from '@/components/TrustBadges';
import FAQ from '@/components/FAQ';
import ProductCard from '@/components/ProductCard';
import { getProductBySlug, products } from '@/lib/products';
import { buildMetadata, productSchema, faqSchema, breadcrumbSchema } from '@/lib/seo';

export const metadata: Metadata = buildMetadata({
  title: 'Free Bluebeam Symbols Sample — Download and Test the BTX Workflow',
  description:
    'Download a free sample of original Bluebeam Revu markup symbols. Test the BTX import process, symbol quality, and Tool Chest structure before buying a full trade pack.',
  path: '/free-bluebeam-symbols-sample/',
  keywords: ['free bluebeam symbols', 'bluebeam sample download', 'free btx tool set', 'bluebeam symbols free download'],
});

const sampleFaqs = [
  {
    question: 'Is this really free? No credit card required?',
    answer:
      'Yes, completely free. Enter your email address and download the BTX file immediately. No payment or credit card is needed.',
  },
  {
    question: 'What does the sample pack include?',
    answer:
      'A small selection of original construction markup symbols drawn from across our trade pack range, plus a quick import guide. It is designed to give you a representative taste of the full pack quality and structure.',
  },
  {
    question: 'Do I need Bluebeam Revu to use it?',
    answer:
      'Yes. You need Bluebeam Revu installed on your computer. The BTX file imports directly into the Revu Tool Chest. Revu is sold separately by Bluebeam, Inc.',
  },
  {
    question: 'Can I upgrade to a full pack after testing?',
    answer:
      'Yes. Each trade-specific tool set is available to purchase separately. If you work across multiple trades, bundle options are also available.',
  },
  {
    question: 'Will I receive marketing emails?',
    answer:
      'We may send occasional product updates and new pack announcements to the email you provide. You can unsubscribe at any time.',
  },
];

export default function FreeSamplePage() {
  const sampleProduct = getProductBySlug('free-bluebeam-symbols-sample');
  const paidProducts = products.filter((p) =>
    ['bluebeam-electrical-tool-set', 'bluebeam-fire-alarm-symbols', 'bluebeam-cctv-tool-set'].includes(p.slug)
  );

  const schemas = [
    productSchema({
      name: 'Free Bluebeam Symbols Sample',
      description: 'A free sample pack of original Bluebeam Revu markup symbols to test the BTX import workflow.',
      price: 0,
      url: '/free-bluebeam-symbols-sample/',
      sku: 'free-sample',
    }),
    faqSchema(sampleFaqs),
    breadcrumbSchema([
      { name: 'Home', url: '/' },
      { name: 'Free Sample', url: '/free-bluebeam-symbols-sample/' },
    ]),
  ];

  return (
    <>
      <Schema data={schemas} />

      {/* Hero */}
      <section className="bg-gradient-to-br from-brand-950 to-slate-900 text-white py-16 px-5">
        <div className="max-w-content mx-auto">
          <Breadcrumbs
            crumbs={[
              { name: 'Home', url: '/' },
              { name: 'Free Sample', url: '/free-bluebeam-symbols-sample/' },
            ]}
          />

          <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-success-700/30 border border-success-500/40 text-success-500 text-xs font-semibold mb-5">
                Free — No Credit Card Required
              </span>
              <h1 className="text-h1 font-bold text-white">
                Free Bluebeam Symbols Sample Pack
              </h1>
              <p className="mt-4 text-base text-slate-300 leading-relaxed">
                Download a small selection of original construction markup symbols and test the BTX import process before purchasing a full trade pack. Includes a quick import guide.
              </p>

              <ul className="mt-5 space-y-2">
                {sampleProduct?.includedItems.map((item) => (
                  <li key={item} className="flex items-center gap-2 text-sm text-slate-300">
                    <svg className="w-4 h-4 text-success-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Download form */}
            <div id="download" className="bg-white rounded-2xl p-8 shadow-xl">
              <h2 className="text-xl font-bold text-slate-900 mb-2">Download Free Sample</h2>
              <p className="text-sm text-slate-600 mb-6">
                Enter your email and receive the download link immediately.
              </p>

              {/* TODO: Wire this form to an email delivery service (e.g., ConvertKit, Mailchimp, or a Supabase edge function) */}
              <form className="space-y-4" action="#" method="post">
                <div>
                  <label htmlFor="name" className="block text-xs font-semibold text-slate-700 mb-1.5">
                    Your name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    placeholder="Jane Smith"
                    className="w-full h-11 px-4 rounded-lg border border-slate-300 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-brand-500"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-xs font-semibold text-slate-700 mb-1.5">
                    Email address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="jane@company.com"
                    required
                    className="w-full h-11 px-4 rounded-lg border border-slate-300 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-brand-500"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full h-12 rounded-xl bg-brand-600 text-white font-bold text-sm hover:bg-brand-700 transition-colors"
                >
                  Download Free Sample
                </button>
              </form>

              <p className="mt-4 text-xs text-slate-500 text-center leading-relaxed">
                By submitting, you agree to receive occasional product updates. Unsubscribe at any time.
              </p>

              <div className="mt-5 pt-5 border-t border-slate-100">
                <p className="text-xs text-slate-500 text-center">
                  Requires Bluebeam Revu (sold separately).{' '}
                  <Link href="/faq/" className="text-brand-600 hover:text-brand-800">
                    Read FAQ
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-content mx-auto px-5 lg:px-8 py-12 space-y-14">

        {/* How to use the sample */}
        <section>
          <h2 className="text-h2 font-bold text-slate-900">How to Use the Sample Pack</h2>
          <div className="mt-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              { step: '1', title: 'Download the BTX file', body: 'Enter your email and download the free BTX file to your computer.' },
              { step: '2', title: 'Import into Bluebeam Revu', body: 'Open Tool Chest, click Import, and select the downloaded BTX file.' },
              { step: '3', title: 'Explore the symbols', body: 'Place symbols on any drawing to check quality and see the Tool Chest structure.' },
            ].map((s) => (
              <div key={s.step} className="flex items-start gap-4 p-5 rounded-xl border border-slate-200 bg-white">
                <span className="w-8 h-8 rounded-full bg-brand-600 text-white flex items-center justify-center text-sm font-bold flex-shrink-0">
                  {s.step}
                </span>
                <div>
                  <p className="font-semibold text-slate-900 text-sm">{s.title}</p>
                  <p className="mt-1 text-xs text-slate-600 leading-relaxed">{s.body}</p>
                </div>
              </div>
            ))}
          </div>
          <p className="mt-4 text-sm text-slate-600">
            Need more help?{' '}
            <Link href="/guides/how-to-import-bluebeam-btx-tool-set/" className="text-brand-600 hover:text-brand-800 font-medium">
              Read the full import guide
            </Link>
          </p>
        </section>

        {/* Trust */}
        <section>
          <h2 className="text-h2 font-bold text-slate-900 mb-5">What to Expect</h2>
          <TrustBadges />
        </section>

        {/* FAQ */}
        <FAQ faqs={sampleFaqs} title="Sample Pack FAQ" includeSchema={false} />

        {/* Full packs */}
        <section>
          <h2 className="text-h2 font-bold text-slate-900">Ready for the Full Pack?</h2>
          <p className="mt-2 text-sm text-slate-600 max-w-xl">
            Once you have tested the sample, upgrade to a full trade tool set with complete symbol coverage and workflow organisation.
          </p>
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {paidProducts.map((product) => (
              <ProductCard key={product.slug} product={product} />
            ))}
          </div>
          <div className="mt-5 text-center">
            <Link href="/products/" className="text-sm font-semibold text-brand-600 hover:text-brand-800">
              View all tool sets →
            </Link>
          </div>
        </section>

        {/* Disclaimer */}
        <p className="text-xs text-slate-400 text-center">
          Bluebeam and Revu are trademarks of their respective owners. Construction Markup Tools is independent and not affiliated with or endorsed by Bluebeam, Inc.
        </p>
      </div>
    </>
  );
}
