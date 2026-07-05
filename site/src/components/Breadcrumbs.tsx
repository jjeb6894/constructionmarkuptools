import Link from 'next/link';
import { breadcrumbSchema } from '@/lib/seo';

interface Crumb {
  name: string;
  url: string;
}

interface Props {
  crumbs: Crumb[];
}

export default function Breadcrumbs({ crumbs }: Props) {
  const schema = breadcrumbSchema(crumbs);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <nav aria-label="Breadcrumb" className="text-sm text-slate-500">
        <ol className="flex flex-wrap items-center gap-1">
          {crumbs.map((crumb, i) => (
            <li key={crumb.url} className="flex items-center gap-1">
              {i < crumbs.length - 1 ? (
                <>
                  <Link href={crumb.url} className="hover:text-brand-600 transition-colors">
                    {crumb.name}
                  </Link>
                  <span aria-hidden="true" className="text-slate-300">/</span>
                </>
              ) : (
                <span className="text-slate-700 font-medium" aria-current="page">
                  {crumb.name}
                </span>
              )}
            </li>
          ))}
        </ol>
      </nav>
    </>
  );
}
