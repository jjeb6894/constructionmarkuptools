import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Breadcrumbs from '@/components/Breadcrumbs';
import Schema from '@/components/Schema';
import CTASection from '@/components/CTASection';
import { getArticleBySlug, getAllComparePages } from '@/lib/articles';
import { buildMetadata, articleSchema, breadcrumbSchema } from '@/lib/seo';

interface Props {
  params: { slug: string };
}

export function generateStaticParams() {
  return getAllComparePages().map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const article = getArticleBySlug(params.slug);
  if (!article) return {};
  return buildMetadata({
    title: article.seoTitle,
    description: article.seoDescription,
    path: `/compare/${article.slug}/`,
    keywords: article.keywords,
  });
}

export default function ComparePage({ params }: Props) {
  const article = getArticleBySlug(params.slug);
  if (!article || article.category !== 'compare') notFound();

  const schemas = [
    articleSchema({
      title: article.title,
      description: article.seoDescription,
      url: `/compare/${article.slug}/`,
      datePublished: article.publishedDate,
    }),
    breadcrumbSchema([
      { name: 'Home', url: '/' },
      { name: 'Compare', url: '/compare/' },
      { name: article.title, url: `/compare/${article.slug}/` },
    ]),
  ];

  const paragraphs = article.content.trim().split('\n\n').filter((p) => p.trim());

  return (
    <>
      <Schema data={schemas} />
      <div className="max-w-content mx-auto px-5 lg:px-8 py-8">
        <Breadcrumbs
          crumbs={[
            { name: 'Home', url: '/' },
            { name: 'Compare', url: '/compare/' },
            { name: article.title, url: `/compare/${article.slug}/` },
          ]}
        />

        <div className="mt-8 max-w-3xl">
          <div className="flex items-center gap-3 mb-4">
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-amber-50 text-amber-700 ring-1 ring-amber-200">
              Comparison
            </span>
            <span className="text-xs text-slate-500">{article.readTime} min read</span>
          </div>
          <h1 className="text-h1 font-bold text-slate-900 leading-tight">{article.title}</h1>
          <p className="mt-3 text-lg text-slate-600 leading-relaxed">{article.excerpt}</p>

          <div className="mt-8 prose-article">
            {paragraphs.map((block, i) => {
              if (block.startsWith('## ')) return <h2 key={i}>{block.replace(/^## /, '')}</h2>;
              if (block.startsWith('### ')) return <h3 key={i}>{block.replace(/^### /, '')}</h3>;
              if (block.startsWith('- ')) {
                const items = block.split('\n').filter((l) => l.startsWith('- '));
                return <ul key={i}>{items.map((item, j) => <li key={j}>{item.replace(/^- /, '')}</li>)}</ul>;
              }
              if (block.startsWith('**') && !block.includes('\n')) {
                return <p key={i}><strong>{block.replace(/\*\*/g, '')}</strong></p>;
              }
              return <p key={i}>{block}</p>;
            })}
          </div>

          <div className="mt-12">
            <CTASection
              headline="Try a structured tool set for free"
              body="Download the free sample pack to test the import process and see the difference a structured BTX tool set makes."
              primaryLabel="Download Free Sample"
              primaryHref="/free-bluebeam-symbols-sample/"
              secondaryLabel="View All Products"
              secondaryHref="/products/"
            />
          </div>
        </div>
      </div>
    </>
  );
}
