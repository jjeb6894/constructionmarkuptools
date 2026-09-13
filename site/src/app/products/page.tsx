import type { Metadata } from 'next';
import ProductCard from '@/components/ProductCard';
import Breadcrumbs from '@/components/Breadcrumbs';
import Schema from '@/components/Schema';
import CTASection from '@/components/CTASection';
import { products } from '@/lib/products';
import { buildMetadata, collectionPageSchema } from '@/lib/seo';

export const metadata: Metadata = buildMetadata({
  title: 'Construction Templates and Bluebeam Tool Sets',
  description:
    'Download editable construction inspection, testing, commissioning and handover templates, plus original Bluebeam Revu markup tool sets.',
  path: '/products/',
  keywords: ['construction templates Excel', 'construction inspection templates', 'commissioning sheets', 'bluebeam tool sets', 'bluebeam markup tools'],
});

const categories = [
  { label: 'All', value: 'all' },
  { label: 'Inspection Forms', value: 'inspection' },
  { label: 'Commissioning Logs', value: 'commissioning' },
  { label: 'Test Certificates', value: 'testing' },
  { label: 'Bluebeam Tool Sets', value: 'bluebeam' },
];

export default function ProductsPage() {
  const schema = collectionPageSchema({
    name: 'Bluebeam Tool Sets and Symbol Packs',
    description: 'Original downloadable Bluebeam Revu markup tool sets and symbol packs for construction professionals.',
    url: '/products/',
  });

  const jobPacks = products.filter((p) => p.productKind === 'job-pack');
  const bluebeamProducts = products.filter((p) => !p.isFree && p.productKind !== 'job-pack');
  const freeProduct = products.find((p) => p.isFree);

  return (
    <>
      <Schema data={schema} />

      <div className="max-w-content mx-auto px-5 lg:px-8 py-8">
        <Breadcrumbs crumbs={[{ name: 'Home', url: '/' }, { name: 'Products', url: '/products/' }]} />

        <div className="mt-6 mb-10">
          <h1 className="text-h1 font-bold text-slate-900">Construction Templates and Markup Tools</h1>
          <p className="mt-3 text-base text-slate-600 max-w-2xl">
            Download practical Excel records for live construction jobs and original Bluebeam markup libraries organised by trade. One-time purchase, reusable project copies, no subscription.
          </p>
        </div>

        {/* Category filter labels (visual only — all products shown, no JS filtering needed) */}
        <div className="flex flex-wrap gap-2 mb-8">
          {categories.map((cat) => (
            <span
              key={cat.value}
              className="px-3 py-1.5 rounded-full text-xs font-medium bg-slate-100 text-slate-600 border border-slate-200"
            >
              {cat.label}
            </span>
          ))}
        </div>

        <section id="job-packs" className="scroll-mt-24">
          <div className="mb-6">
            <p className="text-xs font-bold uppercase tracking-wider text-brand-700">Needed on a live job</p>
            <h2 className="mt-2 text-h2 font-bold text-slate-900">Inspection, Test and Commissioning Templates</h2>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600">
              Focused workbooks for evidence that must be captured before work is covered, inspected, handed over or revisited.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {jobPacks.map((product) => (
              <ProductCard key={product.slug} product={product} />
            ))}
          </div>
        </section>

        <section className="mt-16 border-t border-slate-200 pt-12">
          <div className="mb-6">
            <p className="text-xs font-bold uppercase tracking-wider text-brand-700">Drawing workflow</p>
            <h2 className="mt-2 text-h2 font-bold text-slate-900">Bluebeam Tool Sets and Symbol Packs</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {bluebeamProducts.map((product) => (
            <ProductCard key={product.slug} product={product} />
          ))}
          </div>
        </section>

        {/* Free sample highlight */}
        {freeProduct && (
          <div className="mt-12">
            <h2 className="text-h2 font-bold text-slate-900 mb-6">Start for Free</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              <ProductCard product={freeProduct} />
            </div>
          </div>
        )}

        {/* CTA */}
        <div className="mt-16">
          <CTASection
            headline="Not sure which pack is right for you?"
            body="Download the free sample pack and test the import process and symbol quality before choosing a trade pack or bundle."
            primaryLabel="Download Free Sample"
            primaryHref="/free-bluebeam-symbols-sample/"
            secondaryLabel="Read the Import Guide"
            secondaryHref="/guides/how-to-import-bluebeam-btx-tool-set/"
          />
        </div>

        {/* Disclaimer */}
        <p className="mt-10 text-xs text-slate-400 text-center">
          Bluebeam and Revu are trademarks of their respective owners. Construction Markup Tools is independent and not affiliated with or endorsed by Bluebeam, Inc.
        </p>
      </div>
    </>
  );
}
