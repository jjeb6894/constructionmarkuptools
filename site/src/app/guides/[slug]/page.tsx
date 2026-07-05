import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Breadcrumbs from '@/components/Breadcrumbs';
import Schema from '@/components/Schema';
import CTASection from '@/components/CTASection';
import ProductCard from '@/components/ProductCard';
import { articles, getArticleBySlug, getAllGuides } from '@/lib/articles';
import { getProductBySlug } from '@/lib/products';
import { buildMetadata, articleSchema, howToSchema, breadcrumbSchema } from '@/lib/seo';

interface Props {
  params: { slug: string };
}

export function generateStaticParams() {
  return getAllGuides().map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const article = getArticleBySlug(params.slug);
  if (!article) return {};
  return buildMetadata({
    title: article.seoTitle,
    description: article.seoDescription,
    path: `/guides/${article.slug}/`,
    keywords: article.keywords,
  });
}

export default function GuidePage({ params }: Props) {
  const article = getArticleBySlug(params.slug);
  if (!article || article.category !== 'guide') notFound();

  const relatedProducts = article.relatedProducts
    .map((slug) => getProductBySlug(slug))
    .filter(Boolean) as ReturnType<typeof getProductBySlug>[];

  const isHowTo = article.slug.startsWith('how-to');
  const schemas = [
    isHowTo
      ? howToSchema({
          name: article.title,
          description: article.seoDescription,
          steps: article.content
            .split('\n')
            .filter((l) => l.match(/^### Step/))
            .map((l) => l.replace(/^### /, '')),
        })
      : articleSchema({
          title: article.title,
          description: article.seoDescription,
          url: `/guides/${article.slug}/`,
          datePublished: article.publishedDate,
        }),
    breadcrumbSchema([
      { name: 'Home', url: '/' },
      { name: 'Guides', url: '/guides/' },
      { name: article.title, url: `/guides/${article.slug}/` },
    ]),
  ];

  const paragraphs = article.content
    .trim()
    .split('\n\n')
    .filter((p) => p.trim());

  return (
    <>
      <Schema data={schemas} />

      <div className="max-w-content mx-auto px-5 lg:px-8 py-8">
        <Breadcrumbs
          crumbs={[
            { name: 'Home', url: '/' },
            { name: 'Guides', url: '/guides/' },
            { name: article.title, url: `/guides/${article.slug}/` },
          ]}
        />

        <div className="mt-8 grid grid-cols-1 lg:grid-cols-4 gap-12">
          {/* Main content */}
          <article className="lg:col-span-3">
            <header className="mb-8">
              <div className="flex items-center gap-3 mb-4">
                <span className="px-3 py-1 rounded-full text-xs font-semibold bg-brand-50 text-brand-700 ring-1 ring-brand-200">
                  Guide
                </span>
                <span className="text-xs text-slate-500">{article.readTime} min read</span>
              </div>
              <h1 className="text-h1 font-bold text-slate-900 leading-tight">{article.title}</h1>
              <p className="mt-3 text-lg text-slate-600 leading-relaxed">{article.excerpt}</p>
            </header>

            <div className="prose-article">
              {paragraphs.map((block, i) => {
                if (block.startsWith('## ')) {
                  return <h2 key={i}>{block.replace(/^## /, '')}</h2>;
                }
                if (block.startsWith('### ')) {
                  return <h3 key={i}>{block.replace(/^### /, '')}</h3>;
                }
                if (block.startsWith('- ')) {
                  const items = block.split('\n').filter((l) => l.startsWith('- '));
                  return (
                    <ul key={i}>
                      {items.map((item, j) => (
                        <li key={j}>{item.replace(/^- /, '')}</li>
                      ))}
                    </ul>
                  );
                }
                if (block.match(/^\d+\. /)) {
                  const items = block.split('\n').filter((l) => l.match(/^\d+\. /));
                  return (
                    <ol key={i}>
                      {items.map((item, j) => (
                        <li key={j}>{item.replace(/^\d+\. /, '')}</li>
                      ))}
                    </ol>
                  );
                }
                if (block.startsWith('**') && block.endsWith('**')) {
                  return <p key={i}><strong>{block.replace(/\*\*/g, '')}</strong></p>;
                }
                return <p key={i}>{block}</p>;
              })}
            </div>

            <div className="mt-12">
              <CTASection
                headline="Ready to import your first tool set?"
                body="Download the free sample pack to test the import process on your system before purchasing a full trade pack."
                primaryLabel="Download Free Sample"
                primaryHref="/free-bluebeam-symbols-sample/"
                secondaryLabel="View All Products"
                secondaryHref="/products/"
              />
            </div>
          </article>

          {/* Sidebar */}
          <aside className="lg:col-span-1 space-y-6">
            <div className="rounded-xl border border-slate-200 bg-slate-50 p-5">
              <h3 className="text-sm font-bold text-slate-900 mb-3">Related Products</h3>
              <div className="space-y-3">
                {relatedProducts.filter(Boolean).map((product) => product && (
                  <ProductCard key={product.slug} product={product} variant="compact" />
                ))}
              </div>
            </div>

            <div className="rounded-xl border border-brand-200 bg-brand-50 p-5">
              <h3 className="text-sm font-bold text-slate-900 mb-2">Free Sample Pack</h3>
              <p className="text-xs text-slate-600 leading-relaxed mb-3">
                Test the import process and symbol quality before buying.
              </p>
              <Link
                href="/free-bluebeam-symbols-sample/"
                className="w-full inline-flex items-center justify-center h-9 px-4 rounded-lg bg-brand-600 text-white text-xs font-semibold hover:bg-brand-700 transition-colors"
              >
                Download Free
              </Link>
            </div>

            <div className="rounded-xl border border-slate-200 bg-white p-5">
              <h3 className="text-sm font-bold text-slate-900 mb-3">More Guides</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/guides/bluebeam-tool-chest-organisation-guide/" className="text-xs text-brand-600 hover:text-brand-800 font-medium">
                    How to Organise Your Tool Chest
                  </Link>
                </li>
                <li>
                  <Link href="/guides/how-to-import-bluebeam-btx-tool-set/" className="text-xs text-brand-600 hover:text-brand-800 font-medium">
                    How to Import a BTX File
                  </Link>
                </li>
              </ul>
            </div>
          </aside>
        </div>
      </div>
    </>
  );
}
