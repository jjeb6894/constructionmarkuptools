import Link from 'next/link';
import type { Article } from '@/lib/articles';

const categoryLabels: Record<Article['category'], string> = {
  guide: 'Guide',
  blog: 'Article',
  compare: 'Comparison',
};

const categoryStyles: Record<Article['category'], string> = {
  guide: 'bg-brand-50 text-brand-700 ring-brand-200',
  blog: 'bg-slate-100 text-slate-700 ring-slate-200',
  compare: 'bg-amber-50 text-amber-700 ring-amber-200',
};

interface Props {
  article: Article;
}

export default function ArticleCard({ article }: Props) {
  const basePath = article.category === 'guide' ? '/guides' : article.category === 'compare' ? '/compare' : '/blog';
  const href = `${basePath}/${article.slug}/`;

  return (
    <article className="group flex flex-col rounded-2xl border border-slate-200 bg-white shadow-card hover:shadow-card-hover hover:border-brand-300 transition-all duration-200 overflow-hidden">
      <div className="p-6">
        <div className="flex items-center gap-2 mb-3">
          <span className={`text-xs font-medium px-2.5 py-1 rounded-full ring-1 ${categoryStyles[article.category]}`}>
            {categoryLabels[article.category]}
          </span>
          <span className="text-xs text-slate-400">{article.readTime} min read</span>
        </div>
        <h3 className="text-base font-bold text-slate-900 group-hover:text-brand-700 transition-colors leading-snug">
          <Link href={href} className="before:absolute before:inset-0">
            {article.title}
          </Link>
        </h3>
        <p className="mt-2 text-sm text-slate-600 leading-relaxed line-clamp-3">
          {article.excerpt}
        </p>
      </div>
      <div className="mt-auto px-6 pb-5">
        <Link
          href={href}
          className="text-sm font-semibold text-brand-600 hover:text-brand-800 transition-colors inline-flex items-center gap-1"
        >
          Read article
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </Link>
      </div>
    </article>
  );
}
