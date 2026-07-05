import type { Metadata } from 'next';
import ArticleCard from '@/components/ArticleCard';
import Breadcrumbs from '@/components/Breadcrumbs';
import Schema from '@/components/Schema';
import CTASection from '@/components/CTASection';
import { getAllGuides } from '@/lib/articles';
import { buildMetadata, collectionPageSchema } from '@/lib/seo';

export const metadata: Metadata = buildMetadata({
  title: 'Bluebeam Revu Guides for Construction Teams',
  description:
    'Step-by-step guides for importing BTX tool sets, organising your Bluebeam Tool Chest, and getting the most from construction markup workflows.',
  path: '/guides/',
  keywords: ['bluebeam revu guides', 'how to import btx', 'bluebeam tool chest guide'],
});

export default function GuidesPage() {
  const guides = getAllGuides();
  const schema = collectionPageSchema({
    name: 'Bluebeam Revu Guides',
    description: 'Practical guides for construction teams using Bluebeam Revu markup tool sets.',
    url: '/guides/',
  });

  return (
    <>
      <Schema data={schema} />
      <div className="max-w-content mx-auto px-5 lg:px-8 py-8">
        <Breadcrumbs crumbs={[{ name: 'Home', url: '/' }, { name: 'Guides', url: '/guides/' }]} />

        <div className="mt-6 mb-10">
          <h1 className="text-h1 font-bold text-slate-900">Bluebeam Revu Guides</h1>
          <p className="mt-3 text-base text-slate-600 max-w-2xl">
            Practical step-by-step guides for importing BTX tool sets, organising your Tool Chest, and getting the most from Bluebeam Revu markup workflows on construction projects.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {guides.map((guide) => (
            <ArticleCard key={guide.slug} article={guide} />
          ))}
        </div>

        <div className="mt-12">
          <CTASection
            headline="Ready to start using structured markup tools?"
            body="Download the free sample pack and follow the import guide to get your Tool Chest set up in minutes."
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
