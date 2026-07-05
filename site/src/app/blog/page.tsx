import type { Metadata } from 'next';
import ArticleCard from '@/components/ArticleCard';
import Breadcrumbs from '@/components/Breadcrumbs';
import Schema from '@/components/Schema';
import CTASection from '@/components/CTASection';
import { getAllBlogPosts } from '@/lib/articles';
import { buildMetadata, collectionPageSchema } from '@/lib/seo';

export const metadata: Metadata = buildMetadata({
  title: 'Bluebeam Markup Articles and Resources',
  description:
    'Articles and guidance for construction professionals using Bluebeam Revu. Electrical symbols, CCTV drawings, fire alarm markups, and contractor tool set guides.',
  path: '/blog/',
  keywords: ['bluebeam articles', 'bluebeam revu resources', 'construction markup guide'],
});

export default function BlogPage() {
  const posts = getAllBlogPosts();
  const schema = collectionPageSchema({
    name: 'Bluebeam Markup Articles',
    description: 'Articles and resources for construction professionals using Bluebeam Revu markup tools.',
    url: '/blog/',
  });

  return (
    <>
      <Schema data={schema} />
      <div className="max-w-content mx-auto px-5 lg:px-8 py-8">
        <Breadcrumbs crumbs={[{ name: 'Home', url: '/' }, { name: 'Blog', url: '/blog/' }]} />

        <div className="mt-6 mb-10">
          <h1 className="text-h1 font-bold text-slate-900">Bluebeam Markup Articles</h1>
          <p className="mt-3 text-base text-slate-600 max-w-2xl">
            Guidance, tips, and resources for construction professionals using Bluebeam Revu. Covering electrical symbols, CCTV markups, fire alarm drawing reviews, and contractor workflows.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post) => (
            <ArticleCard key={post.slug} article={post} />
          ))}
        </div>

        <div className="mt-12">
          <CTASection
            headline="Looking for practical how-to guides?"
            body="Visit the guides section for step-by-step instructions on importing BTX tool sets and organising your Bluebeam Tool Chest."
            primaryLabel="View Guides"
            primaryHref="/guides/"
            secondaryLabel="Browse Products"
            secondaryHref="/products/"
          />
        </div>
      </div>
    </>
  );
}
