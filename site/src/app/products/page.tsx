import type { Metadata } from 'next';
import ProductCard from '@/components/ProductCard';
import Breadcrumbs from '@/components/Breadcrumbs';
import Schema from '@/components/Schema';
import CTASection from '@/components/CTASection';
import { products } from '@/lib/products';
import { buildMetadata, collectionPageSchema } from '@/lib/seo';

export const metadata: Metadata = buildMetadata({
  title: 'Bluebeam Tool Sets and Symbol Packs',
  description:
    'Browse all original Bluebeam Revu markup tool sets for electrical, fire alarm, CCTV, security, AV/data, HVAC, plumbing, and estimating. Instant BTX download.',
  path: '/products/',
  keywords: ['bluebeam tool sets', 'bluebeam symbols', 'bluebeam markup tools', 'btx tool set download'],
});

const categories = [
  { label: 'All', value: 'all' },
  { label: 'Electrical', value: 'Electrical' },
  { label: 'Fire Alarm', value: 'Fire Alarm' },
  { label: 'CCTV', value: 'CCTV' },
  { label: 'Security', value: 'Security' },
  { label: 'AV and Data', value: 'AV and Data' },
  { label: 'HVAC', value: 'HVAC' },
  { label: 'Plumbing', value: 'Plumbing' },
  { label: 'Estimating', value: 'Estimating' },
  { label: 'Free', value: 'Free' },
];

export default function ProductsPage() {
  const schema = collectionPageSchema({
    name: 'Bluebeam Tool Sets and Symbol Packs',
    description: 'Original downloadable Bluebeam Revu markup tool sets and symbol packs for construction professionals.',
    url: '/products/',
  });

  const paidProducts = products.filter((p) => !p.isFree);
  const freeProduct = products.find((p) => p.isFree);

  return (
    <>
      <Schema data={schema} />

      <div className="max-w-content mx-auto px-5 lg:px-8 py-8">
        <Breadcrumbs crumbs={[{ name: 'Home', url: '/' }, { name: 'Products', url: '/products/' }]} />

        <div className="mt-6 mb-10">
          <h1 className="text-h1 font-bold text-slate-900">Bluebeam Tool Sets and Symbol Packs</h1>
          <p className="mt-3 text-base text-slate-600 max-w-2xl">
            Original downloadable markup libraries for Bluebeam Revu, organised by trade. Each pack imports as a BTX file into your Tool Chest and is ready to use immediately.
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

        {/* Products grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {paidProducts.map((product) => (
            <ProductCard key={product.slug} product={product} />
          ))}
        </div>

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
