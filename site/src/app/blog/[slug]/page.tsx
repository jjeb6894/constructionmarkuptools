import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Breadcrumbs from '@/components/Breadcrumbs';
import Schema from '@/components/Schema';
import CTASection from '@/components/CTASection';
import ProductCard from '@/components/ProductCard';
import { getArticleBySlug, getAllBlogPosts } from '@/lib/articles';
import { getProductBySlug } from '@/lib/products';
import { buildMetadata, articleSchema, breadcrumbSchema } from '@/lib/seo';

interface Props {
  params: { slug: string };
}

export function generateStaticParams() {
  return getAllBlogPosts().map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const article = getArticleBySlug(params.slug);
  if (!article) return {};
  return buildMetadata({
    title: article.seoTitle,
    description: article.seoDescription,
    path: `/blog/${article.slug}/`,
    keywords: article.keywords,
  });
}

export default function BlogPostPage({ params }: Props) {
  const article = getArticleBySlug(params.slug);
  if (!article || article.category !== 'blog') notFound();

  const relatedProducts = article.relatedProducts
    .map((slug) => getProductBySlug(slug))
    .filter(Boolean);

  const schemas = [
    articleSchema({
      title: article.title,
      description: article.seoDescription,
      url: `/blog/${article.slug}/`,
      datePublished: article.publishedDate,
    }),
    breadcrumbSchema([
      { name: 'Home', url: '/' },
      { name: 'Blog', url: '/blog/' },
      { name: article.title, url: `/blog/${article.slug}/` },
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
            { name: 'Blog', url: '/blog/' },
            { name: article.title, url: `/blog/${article.slug}/` },
          ]}
        />

        <div className="mt-8 grid grid-cols-1 lg:grid-cols-4 gap-12">
          <article className="lg:col-span-3">
            <header className="mb-8">
              <div className="flex items-center gap-3 mb-4">
                <span className="px-3 py-1 rounded-full text-xs font-semibold bg-slate-100 text-slate-700 ring-1 ring-slate-200">
                  Article
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
                return <p key={i}>{block}</p>;
              })}
            </div>

            <div className="mt-12">
              <CTASection
                headline="Get the right tool set for your drawings"
                body="Browse original Bluebeam Revu markup tool sets by trade. Each pack imports as a BTX file into your Tool Chest."
                primaryLabel="View All Tool Sets"
                primaryHref="/products/"
                secondaryLabel="Download Free Sample"
                secondaryHref="/free-bluebeam-symbols-sample/"
              />
            </div>
          </article>

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
          </aside>
        </div>
      </div>
    </>
  );
}
