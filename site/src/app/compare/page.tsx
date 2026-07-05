import type { Metadata } from 'next';
import ArticleCard from '@/components/ArticleCard';
import Breadcrumbs from '@/components/Breadcrumbs';
import { getAllComparePages } from '@/lib/articles';
import { buildMetadata } from '@/lib/seo';

export const metadata: Metadata = buildMetadata({
  title: 'Bluebeam Tool Set Comparisons',
  description:
    'Compare Bluebeam tool set options, markup approaches, and symbol pack choices for construction drawing review workflows.',
  path: '/compare/',
});

export default function ComparePage() {
  const pages = getAllComparePages();
  return (
    <div className="max-w-content mx-auto px-5 lg:px-8 py-8">
      <Breadcrumbs crumbs={[{ name: 'Home', url: '/' }, { name: 'Compare', url: '/compare/' }]} />
      <div className="mt-6 mb-10">
        <h1 className="text-h1 font-bold text-slate-900">Bluebeam Tool Set Comparisons</h1>
        <p className="mt-3 text-base text-slate-600 max-w-2xl">
          Side-by-side comparisons to help you choose the right Bluebeam markup approach for your projects.
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {pages.map((page) => (
          <ArticleCard key={page.slug} article={page} />
        ))}
      </div>
    </div>
  );
}
