import Link from 'next/link';
import type { Product } from '@/lib/products';

const categoryColours: Record<string, string> = {
  Electrical: 'bg-amber-50 text-amber-700 ring-amber-200',
  'Fire Alarm': 'bg-red-50 text-red-700 ring-red-200',
  CCTV: 'bg-slate-100 text-slate-700 ring-slate-200',
  Security: 'bg-slate-100 text-slate-700 ring-slate-200',
  'AV and Data': 'bg-blue-50 text-blue-700 ring-blue-200',
  'Access Control': 'bg-slate-100 text-slate-700 ring-slate-200',
  Telecom: 'bg-blue-50 text-blue-700 ring-blue-200',
  HVAC: 'bg-teal-50 text-teal-700 ring-teal-200',
  Plumbing: 'bg-cyan-50 text-cyan-700 ring-cyan-200',
  Estimating: 'bg-green-50 text-green-700 ring-green-200',
  Free: 'bg-brand-50 text-brand-700 ring-brand-200',
  'Heating Records': 'bg-orange-50 text-orange-800 ring-orange-200',
  'Plumbing Records': 'bg-cyan-50 text-cyan-800 ring-cyan-200',
  'Masonry QA': 'bg-stone-100 text-stone-800 ring-stone-300',
  'Firestopping QA': 'bg-red-50 text-red-800 ring-red-200',
  'Concrete QA': 'bg-zinc-100 text-zinc-800 ring-zinc-300',
  'Fire Door QA': 'bg-rose-50 text-rose-800 ring-rose-200',
  'Site Safety Records': 'bg-yellow-50 text-yellow-800 ring-yellow-200',
  'Heat Pump Records': 'bg-sky-50 text-sky-800 ring-sky-200',
  'Roofing QA': 'bg-indigo-50 text-indigo-800 ring-indigo-200',
};

const categoryIcons: Record<string, string> = {
  Electrical: '⚡',
  'Fire Alarm': '🔥',
  CCTV: '📷',
  Security: '🔒',
  'AV and Data': '📡',
  'Access Control': '🚪',
  Telecom: '📶',
  HVAC: '💨',
  Plumbing: '🔧',
  Estimating: '📐',
  Free: '🎁',
  'Heating Records': '♨️',
  'Plumbing Records': '🧪',
  'Masonry QA': '🧱',
  'Firestopping QA': '🧯',
  'Concrete QA': '🏗️',
  'Fire Door QA': '🚪',
  'Site Safety Records': '🦺',
  'Heat Pump Records': '🌡️',
  'Roofing QA': '🏠',
};

interface Props {
  product: Product;
  variant?: 'default' | 'compact';
}

export default function ProductCard({ product, variant = 'default' }: Props) {
  const catColour = categoryColours[product.category] ?? 'bg-slate-100 text-slate-700 ring-slate-200';
  const catIcon = categoryIcons[product.category] ?? '📦';
  const href = `/products/${product.slug}/`;

  if (variant === 'compact') {
    return (
      <Link
        href={href}
        className="group block rounded-xl border border-slate-200 bg-white p-5 shadow-card hover:shadow-card-hover hover:border-brand-300 transition-all duration-200"
      >
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3">
            <span className="text-2xl" aria-hidden="true">{catIcon}</span>
            <div>
              <p className="text-sm font-semibold text-slate-900 group-hover:text-brand-700 transition-colors leading-tight">
                {product.title}
              </p>
              <p className="text-xs text-slate-500 mt-0.5">{product.category}</p>
            </div>
          </div>
          <span className="text-sm font-bold text-slate-900 whitespace-nowrap">
            {product.price === 0 ? 'Free' : product.price ? `£${product.price}` : 'Coming soon'}
          </span>
        </div>
      </Link>
    );
  }

  return (
    <article className="group flex flex-col rounded-2xl border border-slate-200 bg-white shadow-card hover:shadow-card-hover hover:border-brand-300 transition-all duration-200 overflow-hidden">
      {/* Card header */}
      <div className="relative p-6 pb-4 bg-gradient-to-br from-slate-50 to-white border-b border-slate-100">
        {product.badge && (
          <span className="absolute top-4 right-4 text-xs font-semibold px-2.5 py-1 rounded-full bg-brand-600 text-white">
            {product.badge}
          </span>
        )}
        <div className="flex items-center gap-3 mb-3">
          <span className="text-3xl" aria-hidden="true">{catIcon}</span>
          <span className={`text-xs font-medium px-2.5 py-1 rounded-full ring-1 ${catColour}`}>
            {product.category}
          </span>
        </div>
        <h3 className="text-lg font-bold text-slate-900 leading-snug group-hover:text-brand-700 transition-colors">
          {product.title}
        </h3>
      </div>

      {/* Card body */}
      <div className="flex flex-col flex-1 p-6 pt-4">
        <p className="text-sm text-slate-600 leading-relaxed flex-1">
          {product.shortDescription}
        </p>

        <ul className="mt-4 space-y-1.5">
          {product.includedItems.slice(0, 3).map((item) => (
            <li key={item} className="flex items-start gap-2 text-xs text-slate-600">
              <svg className="w-4 h-4 text-brand-500 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              {item}
            </li>
          ))}
          {product.includedItems.length > 3 && (
            <li className="text-xs text-slate-400 pl-6">
              +{product.includedItems.length - 3} more included
            </li>
          )}
        </ul>

        <div className="mt-5 flex items-center justify-between gap-3">
          <div>
            {product.price === 0 ? (
              <span className="text-xl font-bold text-success-700">Free</span>
            ) : product.price ? (
              <div className="flex items-baseline gap-2">
                <span className="text-xl font-bold text-slate-900">£{product.price}</span>
                {product.salePrice && (
                  <span className="text-sm text-slate-400 line-through">£{product.salePrice}</span>
                )}
              </div>
            ) : (
              <span className="text-sm font-medium text-slate-500">Coming soon</span>
            )}
          </div>
          <Link
            href={href}
            className="inline-flex items-center justify-center h-10 px-4 rounded-lg bg-brand-600 text-white text-sm font-semibold hover:bg-brand-700 transition-colors"
          >
            {product.price === 0 ? 'Download Free' : 'View Details'}
          </Link>
        </div>
      </div>
    </article>
  );
}
