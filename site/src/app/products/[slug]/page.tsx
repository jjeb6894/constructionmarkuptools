import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Breadcrumbs from '@/components/Breadcrumbs';
import FAQ from '@/components/FAQ';
import TrustBadges from '@/components/TrustBadges';
import RelatedProducts from '@/components/RelatedProducts';
import CTASection from '@/components/CTASection';
import Schema from '@/components/Schema';
import { products, getProductBySlug, getRelatedProducts } from '@/lib/products';
import { productSchema, faqSchema, breadcrumbSchema } from '@/lib/seo';

interface Props {
  params: { slug: string };
}

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const product = getProductBySlug(params.slug);
  if (!product) return {};
  return {
    title: product.seoTitle,
    description: product.seoDescription,
    keywords: product.keywords.join(', '),
    alternates: { canonical: `https://constructionmarkuptools.com/products/${product.slug}/` },
    openGraph: {
      title: product.seoTitle,
      description: product.seoDescription,
      url: `https://constructionmarkuptools.com/products/${product.slug}/`,
      type: 'website',
    },
  };
}

export default function ProductPage({ params }: Props) {
  const product = getProductBySlug(params.slug);
  if (!product) notFound();

  const relatedProducts = getRelatedProducts(product.relatedSlugs);
  const schemas = [
    productSchema({
      name: product.title,
      description: product.shortDescription,
      price: product.price,
      url: `/products/${product.slug}/`,
      sku: product.slug,
    }),
    faqSchema(product.faqs),
    breadcrumbSchema([
      { name: 'Home', url: '/' },
      { name: 'Products', url: '/products/' },
      { name: product.title, url: `/products/${product.slug}/` },
    ]),
  ];

  return (
    <>
      <Schema data={schemas} />

      <div className="max-w-content mx-auto px-5 lg:px-8 py-8">
        <Breadcrumbs
          crumbs={[
            { name: 'Home', url: '/' },
            { name: 'Products', url: '/products/' },
            { name: product.title, url: `/products/${product.slug}/` },
          ]}
        />

        {/* Hero */}
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-8 pb-10 border-b border-slate-200">
          <div className="lg:col-span-2">
            {product.badge && (
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-brand-600 text-white mb-4">
                {product.badge}
              </span>
            )}
            <h1 className="text-h1 font-bold text-slate-900">{product.title}</h1>
            <p className="mt-4 text-lg text-slate-600 leading-relaxed max-w-2xl">
              {product.fullDescription}
            </p>

            <div className="mt-6 flex flex-wrap items-center gap-3">
              <span className="px-3 py-1 rounded-full text-sm font-medium bg-slate-100 text-slate-700 border border-slate-200">
                {product.category}
              </span>
              {product.compatibleWith.map((v) => (
                <span key={v} className="px-3 py-1 rounded-full text-xs font-medium bg-brand-50 text-brand-700 border border-brand-200">
                  {v}
                </span>
              ))}
            </div>
          </div>

          {/* Purchase card */}
          <div className="lg:col-span-1">
            <div className="rounded-2xl border border-slate-200 bg-white shadow-card p-6 sticky top-24">
              <div className="mb-4">
                {product.price === 0 ? (
                  <span className="text-3xl font-bold text-success-700">Free</span>
                ) : product.price ? (
                  <div>
                    <span className="text-3xl font-bold text-slate-900">£{product.price}</span>
                    <span className="ml-2 text-sm text-slate-500">one-time purchase</span>
                  </div>
                ) : (
                  <span className="text-xl font-semibold text-slate-500">Coming soon</span>
                )}
              </div>

              <ul className="space-y-2 mb-5">
                {product.includedItems.slice(0, 5).map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm text-slate-600">
                    <svg className="w-4 h-4 text-brand-500 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    {item}
                  </li>
                ))}
                {product.includedItems.length > 5 && (
                  <li className="text-xs text-slate-400 pl-6">+{product.includedItems.length - 5} more included</li>
                )}
              </ul>

              {product.price === 0 ? (
                <Link
                  href="/free-bluebeam-symbols-sample/#download"
                  className="w-full inline-flex items-center justify-center h-12 px-6 rounded-xl bg-brand-600 text-white font-bold hover:bg-brand-700 transition-colors"
                >
                  Download Free
                </Link>
              ) : product.price ? (
                <>
                  {/* TODO: Replace with Stripe Checkout link */}
                  <a
                    href="#checkout"
                    className="w-full inline-flex items-center justify-center h-12 px-6 rounded-xl bg-brand-600 text-white font-bold hover:bg-brand-700 transition-colors"
                  >
                    Buy Now — £{product.price}
                  </a>
                  <p className="mt-2 text-xs text-center text-slate-500">
                    Instant download after purchase
                  </p>
                </>
              ) : null}

              <div className="mt-4 pt-4 border-t border-slate-100">
                <p className="text-xs text-slate-500 leading-relaxed">
                  File format: {product.fileFormats.join(', ')}
                </p>
                <p className="mt-1 text-xs text-slate-500">
                  Requires Bluebeam Revu (sold separately)
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Main content */}
        <div className="mt-10 space-y-12">

          {/* What's included */}
          <section>
            <h2 className="text-h2 font-bold text-slate-900">What&apos;s Included</h2>
            <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-3">
              {product.includedItems.map((item) => (
                <div key={item} className="flex items-start gap-3 p-3 rounded-lg bg-slate-50 border border-slate-200">
                  <svg className="w-5 h-5 text-brand-500 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="text-sm text-slate-700">{item}</span>
                </div>
              ))}
            </div>
          </section>

          {/* Symbol categories */}
          <section>
            <h2 className="text-h2 font-bold text-slate-900">Symbol Categories</h2>
            <p className="mt-2 text-sm text-slate-600">
              Tools are organised into these groups inside the Bluebeam Revu Tool Chest.
            </p>
            <div className="mt-5 flex flex-wrap gap-2">
              {product.symbolCategories.map((cat) => (
                <span
                  key={cat}
                  className="px-3 py-1.5 rounded-lg text-sm font-medium bg-brand-50 text-brand-800 border border-brand-200"
                >
                  {cat}
                </span>
              ))}
            </div>
          </section>

          {/* Who this is for */}
          <section>
            <h2 className="text-h2 font-bold text-slate-900">Who This Is For</h2>
            <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-3">
              {product.useCases.map((uc) => (
                <div key={uc} className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-brand-500 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span className="text-sm text-slate-700">{uc}</span>
                </div>
              ))}
            </div>
          </section>

          {/* Compatible with Bluebeam */}
          <section className="rounded-2xl bg-brand-50 border border-brand-200 p-6">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-brand-100 flex items-center justify-center flex-shrink-0">
                <svg className="w-6 h-6 text-brand-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <div>
                <h2 className="text-base font-bold text-slate-900">Compatible with Bluebeam Revu</h2>
                <p className="mt-1 text-sm text-slate-600">
                  This tool set is designed for use with Bluebeam Revu. Bluebeam Revu is not included with this product.
                </p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {product.compatibleWith.map((v) => (
                    <span key={v} className="px-2.5 py-1 rounded-md text-xs font-medium bg-brand-100 text-brand-800">
                      {v}
                    </span>
                  ))}
                </div>
                <p className="mt-3 text-xs text-slate-500">
                  Bluebeam and Revu are trademarks of their respective owners. Not affiliated with or endorsed by Bluebeam, Inc.
                </p>
              </div>
            </div>
          </section>

          {/* Installation guide */}
          <section>
            <h2 className="text-h2 font-bold text-slate-900">How to Import and Use</h2>
            <p className="mt-2 text-sm text-slate-600">
              The import process takes under a minute.{' '}
              <Link href="/guides/how-to-import-bluebeam-btx-tool-set/" className="text-brand-600 hover:text-brand-800 font-medium">
                Read the full import guide
              </Link>{' '}
              for detailed instructions.
            </p>
            <ol className="mt-5 space-y-4">
              {product.installSteps.map((step, i) => (
                <li key={i} className="flex items-start gap-4">
                  <span className="w-8 h-8 rounded-full bg-brand-600 text-white flex items-center justify-center text-sm font-bold flex-shrink-0">
                    {i + 1}
                  </span>
                  <p className="text-sm text-slate-700 mt-1.5">{step}</p>
                </li>
              ))}
            </ol>
          </section>

          {/* Trust badges */}
          <section>
            <h2 className="text-h2 font-bold text-slate-900 mb-5">Quality and Delivery</h2>
            <TrustBadges />
          </section>

          {/* Licence note */}
          <section className="rounded-xl border border-slate-200 bg-slate-50 p-5">
            <h2 className="text-base font-bold text-slate-900">Licence and Usage</h2>
            <p className="mt-2 text-sm text-slate-600 leading-relaxed">
              Each purchase is for one user for internal business use across their projects. Team and company licences are available. After importing into Bluebeam Revu, you may adjust colours, labels, and tool behaviour for project needs. Redistribution of the original BTX file is not permitted.
            </p>
            <Link href="/license/" className="mt-3 inline-block text-sm font-semibold text-brand-600 hover:text-brand-800">
              Read the full licence terms →
            </Link>
          </section>

          {/* FAQ */}
          <FAQ faqs={product.faqs} includeSchema={false} />

          {/* Checkout placeholder */}
          {product.price !== null && product.price > 0 && (
            <section id="checkout" className="rounded-2xl bg-slate-900 text-white p-8 text-center">
              <h2 className="text-xl font-bold text-white">Purchase {product.title}</h2>
              <p className="mt-2 text-slate-300 text-sm">
                Instant download after payment. One-time purchase, no subscription.
              </p>
              <div className="mt-4">
                <span className="text-3xl font-bold text-white">£{product.price}</span>
              </div>
              {/* TODO: Replace button href with Stripe Checkout URL when payment is configured */}
              <a
                href="#checkout"
                className="mt-6 inline-flex items-center justify-center h-12 px-8 rounded-xl bg-brand-500 text-white font-bold hover:bg-brand-400 transition-colors cursor-not-allowed opacity-70"
                aria-disabled="true"
              >
                Buy Now (Payment setup coming soon)
              </a>
              <p className="mt-3 text-xs text-slate-500">
                {/* TODO: Add Stripe integration */}
                Payment processing is being configured. Contact us to arrange a purchase in the meantime.
              </p>
              <Link href="/contact/" className="mt-2 inline-block text-sm text-brand-400 hover:text-brand-200">
                Contact us →
              </Link>
            </section>
          )}

          {/* Related products */}
          {relatedProducts.length > 0 && (
            <RelatedProducts products={relatedProducts} />
          )}

          {/* Free sample CTA */}
          <CTASection
            headline="Test the workflow before you buy"
            body="Download the free sample pack to confirm the import process, symbol quality, and Tool Chest structure work on your system."
            primaryLabel="Download Free Sample"
            primaryHref="/free-bluebeam-symbols-sample/"
            secondaryLabel="View All Products"
            secondaryHref="/products/"
          />
        </div>
      </div>
    </>
  );
}
