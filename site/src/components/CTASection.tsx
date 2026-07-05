import Link from 'next/link';

interface Props {
  headline: string;
  body: string;
  primaryLabel: string;
  primaryHref: string;
  secondaryLabel?: string;
  secondaryHref?: string;
  variant?: 'default' | 'dark' | 'brand';
}

export default function CTASection({
  headline,
  body,
  primaryLabel,
  primaryHref,
  secondaryLabel,
  secondaryHref,
  variant = 'default',
}: Props) {
  const wrapperClass =
    variant === 'dark'
      ? 'bg-slate-900 text-white'
      : variant === 'brand'
      ? 'bg-brand-600 text-white'
      : 'bg-slate-50 border border-slate-200';

  const headlineClass =
    variant === 'dark' || variant === 'brand' ? 'text-white' : 'text-slate-900';

  const bodyClass =
    variant === 'dark' ? 'text-slate-300' : variant === 'brand' ? 'text-brand-100' : 'text-slate-600';

  const primaryClass =
    variant === 'dark'
      ? 'bg-white text-slate-900 hover:bg-slate-100'
      : variant === 'brand'
      ? 'bg-white text-brand-700 hover:bg-slate-50'
      : 'bg-brand-600 text-white hover:bg-brand-700';

  const secondaryClass =
    variant === 'dark' || variant === 'brand'
      ? 'border border-white/30 text-white hover:bg-white/10'
      : 'border border-slate-300 text-slate-700 hover:bg-slate-100';

  return (
    <section className={`rounded-2xl px-8 py-10 text-center ${wrapperClass}`}>
      <h2 className={`text-2xl font-bold ${headlineClass}`}>{headline}</h2>
      <p className={`mt-3 text-base max-w-prose mx-auto ${bodyClass}`}>{body}</p>
      <div className="mt-6 flex flex-wrap justify-center gap-3">
        <Link
          href={primaryHref}
          className={`inline-flex items-center justify-center h-11 px-6 rounded-lg text-sm font-semibold transition-colors ${primaryClass}`}
        >
          {primaryLabel}
        </Link>
        {secondaryLabel && secondaryHref && (
          <Link
            href={secondaryHref}
            className={`inline-flex items-center justify-center h-11 px-6 rounded-lg text-sm font-semibold transition-colors ${secondaryClass}`}
          >
            {secondaryLabel}
          </Link>
        )}
      </div>
    </section>
  );
}
