import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="max-w-content mx-auto px-5 lg:px-8 py-20 text-center">
      <p className="text-5xl mb-4">404</p>
      <h1 className="text-h1 font-bold text-slate-900">Page not found</h1>
      <p className="mt-3 text-base text-slate-600 max-w-sm mx-auto">
        The page you are looking for does not exist or has been moved.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Link
          href="/"
          className="inline-flex items-center justify-center h-11 px-6 rounded-xl bg-brand-600 text-white font-semibold hover:bg-brand-700 transition-colors"
        >
          Go to Homepage
        </Link>
        <Link
          href="/products/"
          className="inline-flex items-center justify-center h-11 px-6 rounded-xl border border-slate-300 text-slate-700 font-semibold hover:bg-slate-50 transition-colors"
        >
          Browse Products
        </Link>
      </div>
    </div>
  );
}
