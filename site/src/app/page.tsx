import Link from 'next/link';
import type { Metadata } from 'next';
import ProductCard from '@/components/ProductCard';
import ArticleCard from '@/components/ArticleCard';
import CTASection from '@/components/CTASection';
import FAQ from '@/components/FAQ';
import Schema from '@/components/Schema';
import { getFeaturedProducts } from '@/lib/products';
import { getAllGuides, getAllBlogPosts } from '@/lib/articles';
import { organizationSchema, websiteSchema } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'Construction Markup Tools — Professional Bluebeam Tool Sets',
  description:
    'Download ready-made Bluebeam Revu markup tool sets for electrical, fire alarm, CCTV, security, AV/data, MEP, and estimating workflows. Original symbols, instant download.',
  alternates: { canonical: 'https://constructionmarkuptools.com/' },
};

const categories = [
  {
    icon: '⚡',
    label: 'Electrical',
    description: 'Power devices, conduit, panels, lighting controls, and takeoff tools.',
    href: '/products/bluebeam-electrical-tool-set/',
    color: 'bg-amber-50 border-amber-200 hover:border-amber-400',
    iconBg: 'bg-amber-100',
  },
  {
    icon: '🔥',
    label: 'Fire Alarm',
    description: 'Detectors, notification appliances, panels, and zone annotations.',
    href: '/products/bluebeam-fire-alarm-symbols/',
    color: 'bg-red-50 border-red-200 hover:border-red-400',
    iconBg: 'bg-red-100',
  },
  {
    icon: '📷',
    label: 'CCTV',
    description: 'Cameras, field-of-view markups, recording equipment, and cable routes.',
    href: '/products/bluebeam-cctv-tool-set/',
    color: 'bg-slate-50 border-slate-200 hover:border-slate-400',
    iconBg: 'bg-slate-100',
  },
  {
    icon: '🔒',
    label: 'Security',
    description: 'Intruder detection devices, panels, keypads, and zone markups.',
    href: '/products/bluebeam-security-tool-set/',
    color: 'bg-slate-50 border-slate-200 hover:border-slate-400',
    iconBg: 'bg-slate-100',
  },
  {
    icon: '📡',
    label: 'AV and Data',
    description: 'AV displays, speakers, network equipment, and cable annotations.',
    href: '/products/bluebeam-av-data-symbols/',
    color: 'bg-blue-50 border-blue-200 hover:border-blue-400',
    iconBg: 'bg-blue-100',
  },
  {
    icon: '📐',
    label: 'Estimating',
    description: 'Count tools, measurement markups, scope labels, and takeoff tools.',
    href: '/products/bluebeam-estimating-takeoff-tools/',
    color: 'bg-green-50 border-green-200 hover:border-green-400',
    iconBg: 'bg-green-100',
  },
];

const benefits = [
  {
    icon: '⏱',
    title: 'Faster drawing reviews',
    description: 'Common markup types are ready to use. No rebuilding symbols on every new project.',
  },
  {
    icon: '📋',
    title: 'Cleaner drawings',
    description: 'Consistent symbols and labelling make drawings easier to read and discuss.',
  },
  {
    icon: '🔄',
    title: 'Standardised symbols',
    description: 'Every team member works from the same markup library across projects.',
  },
  {
    icon: '🔢',
    title: 'Easier estimating',
    description: 'Consistent naming makes it faster to sort, count, and export markups for quantity checking.',
  },
  {
    icon: '👷',
    title: 'Built for contractors',
    description: 'Organised around how construction teams actually review drawings, not generic shapes.',
  },
  {
    icon: '🖥',
    title: 'Works in Bluebeam Revu',
    description: 'BTX format imports directly into your Revu Tool Chest in seconds.',
  },
];

const howItWorks = [
  {
    step: '01',
    title: 'Download the BTX file',
    description: 'Purchase a trade pack or download the free sample. You receive a BTX file ready to import.',
  },
  {
    step: '02',
    title: 'Import into Bluebeam Revu',
    description: 'Open Tool Chest, click Import, and select the BTX file. Symbol categories appear immediately.',
  },
  {
    step: '03',
    title: 'Start marking up drawings',
    description: 'Select tools from the organised Tool Chest groups and apply consistent markups across your drawing sheets.',
  },
];

const homeFaqs = [
  {
    question: 'What is a Bluebeam BTX tool set?',
    answer:
      'A BTX file is a Bluebeam Tool Set export format. It packages a collection of markup symbols, tools, and categories into a single importable file. When you import it into Bluebeam Revu, the categories appear in your Tool Chest ready to use.',
  },
  {
    question: 'Do I need Bluebeam Revu to use these tool sets?',
    answer:
      'Yes. Bluebeam Revu must be installed on your computer. These tool sets are importable markup libraries for Revu users — they are not a standalone application and do not replace Revu.',
  },
  {
    question: 'Are these symbols original or copied from another product?',
    answer:
      'Every symbol is an original Construction Markup Tools asset. We do not reuse competitor files, screenshots, or third-party symbols.',
  },
  {
    question: 'Can I try before buying?',
    answer:
      'Yes. Download the free sample pack to test the import process, check symbol quality, and confirm the Tool Chest workflow works on your system before purchasing.',
  },
  {
    question: 'How long does delivery take?',
    answer:
      'Downloads are available immediately after purchase. You receive a link to the BTX file as soon as the transaction is complete.',
  },
];

export default function HomePage() {
  const featuredProducts = getFeaturedProducts();
  const guides = getAllGuides().slice(0, 2);
  const posts = getAllBlogPosts().slice(0, 1);
  const featuredArticles = [...guides, ...posts];

  return (
    <>
      <Schema data={[organizationSchema(), websiteSchema()]} />

      {/* Hero */}
      <section className="bg-gradient-to-b from-slate-900 to-slate-800 text-white py-20 px-5">
        <div className="max-w-content mx-auto">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand-600/20 border border-brand-500/30 text-brand-300 text-xs font-medium mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-400"></span>
              Original downloadable BTX tool sets
            </div>
            <h1 className="text-display font-bold text-white leading-tight">
              Professional Bluebeam Toolsets for Construction Markups
            </h1>
            <p className="mt-5 text-lg text-slate-300 leading-relaxed max-w-2xl">
              Download ready-made symbol packs and markup tools for electrical, CCTV, security, fire alarm, AV/data, and MEP workflows. Import into Bluebeam Revu and start reviewing drawings faster.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/products/"
                className="inline-flex items-center justify-center h-12 px-6 rounded-xl bg-brand-600 text-white font-semibold hover:bg-brand-500 transition-colors"
              >
                View All Tool Sets
              </Link>
              <Link
                href="/free-bluebeam-symbols-sample/"
                className="inline-flex items-center justify-center h-12 px-6 rounded-xl bg-white/10 text-white font-semibold border border-white/20 hover:bg-white/20 transition-colors"
              >
                Download Free Sample
              </Link>
            </div>
            <p className="mt-6 text-xs text-slate-500">
              Bluebeam and Revu are trademarks of their respective owners. Not affiliated with or endorsed by Bluebeam, Inc.
            </p>
          </div>
        </div>
      </section>

      {/* Trade category grid */}
      <section className="py-18 px-5 bg-white">
        <div className="max-w-content mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-h1 font-bold text-slate-900">Browse by Trade</h2>
            <p className="mt-3 text-base text-slate-600 max-w-xl mx-auto">
              Markup tool sets organised by discipline. Each pack imports as a separate Tool Chest group in Bluebeam Revu.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {categories.map((cat) => (
              <Link
                key={cat.href}
                href={cat.href}
                className={`group flex items-start gap-4 p-5 rounded-2xl border-2 transition-all duration-200 ${cat.color}`}
              >
                <span className={`w-12 h-12 flex items-center justify-center rounded-xl text-2xl flex-shrink-0 ${cat.iconBg}`}>
                  {cat.icon}
                </span>
                <div>
                  <p className="font-bold text-slate-900 group-hover:text-brand-700 transition-colors">
                    {cat.label}
                  </p>
                  <p className="mt-1 text-sm text-slate-600 leading-snug">{cat.description}</p>
                </div>
              </Link>
            ))}
          </div>
          <div className="mt-6 text-center">
            <Link
              href="/products/"
              className="text-sm font-semibold text-brand-600 hover:text-brand-800 transition-colors inline-flex items-center gap-1"
            >
              View all products
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* Why use these toolsets */}
      <section className="py-18 px-5 bg-slate-50">
        <div className="max-w-content mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-h1 font-bold text-slate-900">Why Use a Structured Tool Set?</h2>
            <p className="mt-3 text-base text-slate-600 max-w-xl mx-auto">
              Building markups from scratch on every project takes time. A structured BTX tool set gives your team a clean, consistent starting point.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {benefits.map((benefit) => (
              <div key={benefit.title} className="flex items-start gap-4 p-5 rounded-xl bg-white border border-slate-200">
                <span className="text-2xl flex-shrink-0">{benefit.icon}</span>
                <div>
                  <p className="font-semibold text-slate-900">{benefit.title}</p>
                  <p className="mt-1 text-sm text-slate-600 leading-relaxed">{benefit.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured products */}
      <section className="py-18 px-5 bg-white">
        <div className="max-w-content mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-h1 font-bold text-slate-900">Popular Tool Sets</h2>
            <Link
              href="/products/"
              className="text-sm font-semibold text-brand-600 hover:text-brand-800 transition-colors hidden sm:inline-flex items-center gap-1"
            >
              View all
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {featuredProducts.map((product) => (
              <ProductCard key={product.slug} product={product} />
            ))}
          </div>
          <div className="mt-6 text-center sm:hidden">
            <Link href="/products/" className="text-sm font-semibold text-brand-600 hover:text-brand-800">
              View all products
            </Link>
          </div>
        </div>
      </section>

      {/* Free sample */}
      <section className="py-18 px-5 bg-brand-950">
        <div className="max-w-content mx-auto">
          <div className="max-w-2xl mx-auto text-center">
            <span className="text-4xl mb-4 block">🎁</span>
            <h2 className="text-h1 font-bold text-white">Try Before You Buy</h2>
            <p className="mt-4 text-base text-brand-200 leading-relaxed">
              Download a free sample pack with original construction markup symbols. Test the BTX import process, check symbol quality, and explore the Tool Chest workflow — no purchase required.
            </p>
            <Link
              href="/free-bluebeam-symbols-sample/"
              className="mt-6 inline-flex items-center justify-center h-12 px-8 rounded-xl bg-white text-brand-800 font-bold hover:bg-brand-50 transition-colors"
            >
              Download Free Sample
            </Link>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-18 px-5 bg-white">
        <div className="max-w-content mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-h1 font-bold text-slate-900">How It Works</h2>
            <p className="mt-3 text-base text-slate-600">
              From download to drawing review in three steps.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {howItWorks.map((step) => (
              <div key={step.step} className="text-center">
                <div className="w-14 h-14 mx-auto rounded-2xl bg-brand-50 border-2 border-brand-200 flex items-center justify-center text-xl font-bold text-brand-700">
                  {step.step}
                </div>
                <h3 className="mt-4 font-bold text-slate-900">{step.title}</h3>
                <p className="mt-2 text-sm text-slate-600 leading-relaxed">{step.description}</p>
              </div>
            ))}
          </div>
          <div className="mt-10 text-center">
            <Link
              href="/guides/how-to-import-bluebeam-btx-tool-set/"
              className="text-sm font-semibold text-brand-600 hover:text-brand-800 transition-colors"
            >
              Read the full import guide →
            </Link>
          </div>
        </div>
      </section>

      {/* Articles/guides */}
      {featuredArticles.length > 0 && (
        <section className="py-18 px-5 bg-slate-50">
          <div className="max-w-content mx-auto">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-h1 font-bold text-slate-900">Guides and Articles</h2>
              <Link
                href="/guides/"
                className="text-sm font-semibold text-brand-600 hover:text-brand-800 transition-colors hidden sm:inline-flex items-center gap-1"
              >
                View all guides
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {featuredArticles.map((article) => (
                <ArticleCard key={article.slug} article={article} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* FAQ */}
      <section className="py-18 px-5 bg-white">
        <div className="max-w-prose mx-auto">
          <FAQ faqs={homeFaqs} />
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-14 px-5 bg-slate-50">
        <div className="max-w-content mx-auto">
          <CTASection
            headline="Ready to speed up your drawing reviews?"
            body="Start with the free sample to test the workflow, then choose the trade pack or bundle that fits your projects."
            primaryLabel="View All Tool Sets"
            primaryHref="/products/"
            secondaryLabel="Download Free Sample"
            secondaryHref="/free-bluebeam-symbols-sample/"
            variant="dark"
          />
        </div>
      </section>
    </>
  );
}
