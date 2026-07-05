'use client';

import { useState } from 'react';
import { faqSchema } from '@/lib/seo';

interface FaqItem {
  question: string;
  answer: string;
}

interface Props {
  faqs: FaqItem[];
  title?: string;
  includeSchema?: boolean;
}

export default function FAQ({ faqs, title = 'Frequently Asked Questions', includeSchema = true }: Props) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section>
      {includeSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema(faqs)) }}
        />
      )}
      <h2 className="text-h2 font-bold text-slate-900">{title}</h2>
      <dl className="mt-6 divide-y divide-slate-200 border-t border-slate-200">
        {faqs.map((faq, i) => (
          <div key={i}>
            <dt>
              <button
                className="flex w-full items-center justify-between py-5 text-left gap-4"
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                aria-expanded={openIndex === i}
              >
                <span className="text-sm font-semibold text-slate-900">{faq.question}</span>
                <svg
                  className={`w-5 h-5 flex-shrink-0 text-slate-400 transition-transform duration-200 ${openIndex === i ? 'rotate-180' : ''}`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
            </dt>
            <dd
              className={`overflow-hidden transition-all duration-200 ${openIndex === i ? 'max-h-96 pb-5' : 'max-h-0'}`}
            >
              <p className="text-sm text-slate-600 leading-relaxed">{faq.answer}</p>
            </dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
