import type { Metadata } from 'next';
import Breadcrumbs from '@/components/Breadcrumbs';
import Schema from '@/components/Schema';
import CTASection from '@/components/CTASection';
import { buildMetadata, faqSchema } from '@/lib/seo';

export const metadata: Metadata = buildMetadata({
  title: 'Frequently Asked Questions — Bluebeam Tool Sets',
  description:
    'Answers to common questions about Bluebeam Revu markup tool sets, BTX files, compatibility, licensing, and the free sample download.',
  path: '/faq/',
});

const faqs = [
  {
    section: 'About the Products',
    items: [
      {
        question: 'What is a Bluebeam BTX tool set?',
        answer:
          'A BTX file is a Bluebeam Tool Set export format that packages markup symbols, tools, and categories into a single importable file. When imported into Bluebeam Revu, the categories appear in your Tool Chest ready to use on any drawing.',
      },
      {
        question: 'Are these symbols original?',
        answer:
          'Yes. Every symbol and markup tool in the Construction Markup Tools product range is an original asset created specifically for this product. We do not reuse competitor files, screenshots, or third-party symbols.',
      },
      {
        question: 'Is this affiliated with Bluebeam, Inc.?',
        answer:
          'No. Construction Markup Tools is an independent business and is not affiliated with, endorsed by, or connected to Bluebeam, Inc. in any way. Bluebeam and Revu are trademarks of their respective owners.',
      },
      {
        question: 'What trades are covered?',
        answer:
          'Current tool sets cover electrical, fire alarm, CCTV, security and intruder detection, access control, AV and data, telecom, HVAC and mechanical, plumbing, and estimating and takeoff workflows. A free sample pack is also available.',
      },
    ],
  },
  {
    section: 'Compatibility',
    items: [
      {
        question: 'Do I need Bluebeam Revu?',
        answer:
          'Yes. Bluebeam Revu must be installed on your computer to import and use BTX tool set files. Revu is not included with any Construction Markup Tools purchase and must be purchased separately from Bluebeam, Inc.',
      },
      {
        question: 'Which versions of Bluebeam Revu are supported?',
        answer:
          'Tool sets are tested against Bluebeam Revu 2019, Revu 20, and Revu 21. Compatibility with future Revu versions will be confirmed as updates are released. See the product pages for specific compatibility notes.',
      },
      {
        question: 'Does this work on Mac?',
        answer:
          'Bluebeam Revu is a Windows application. BTX tool set files are imported via Revu on Windows. Mac compatibility depends on the Revu version and platform support provided by Bluebeam, Inc.',
      },
    ],
  },
  {
    section: 'Import and Setup',
    items: [
      {
        question: 'How do I import a BTX file into Bluebeam Revu?',
        answer:
          'Open Bluebeam Revu, go to the Tool Chest panel, click the manage icon, select Import, and locate your downloaded BTX file. The tool categories appear in your Tool Chest immediately. See the full import guide for step-by-step instructions.',
      },
      {
        question: 'What happens if the Tool Chest shows no new groups after import?',
        answer:
          'Try closing and reopening the Tool Chest panel. If symbols still do not appear, retry the import process with the BTX file saved to a simpler folder path such as the Desktop. Check that the file has a .btx extension and was not corrupted during download.',
      },
      {
        question: 'Can I share the tool set with my team?',
        answer:
          'After importing, you can export your configured Tool Chest as a new BTX file from within Bluebeam Revu and share it with colleagues. This lets your team work from the same markup library. Redistribution of the original purchased BTX file is not permitted under the licence.',
      },
      {
        question: 'Can I edit the symbols after importing?',
        answer:
          'Yes. Once imported into Bluebeam Revu, you can modify colours, labels, subjects, sizes, and other properties of any markup tool to match project requirements.',
      },
    ],
  },
  {
    section: 'Purchase and Delivery',
    items: [
      {
        question: 'How do I receive the product after purchasing?',
        answer:
          'Downloads are available immediately after purchase. You receive a link to the BTX file as soon as the transaction is complete. No physical product is shipped.',
      },
      {
        question: 'Can I try before buying?',
        answer:
          'Yes. Download the free sample pack to test the import process, check symbol quality, and confirm the Tool Chest structure works on your system before purchasing any paid pack.',
      },
      {
        question: 'What payment methods are accepted?',
        answer:
          'Payment processing via Stripe is being configured. In the meantime, contact us to arrange a purchase. We accept major credit and debit cards.',
      },
      {
        question: 'What is the refund policy?',
        answer:
          'Because these are digital downloads, we offer a satisfaction-based refund within 14 days of purchase if the product does not work as described on a supported Bluebeam Revu version. See the refund policy page for full details.',
      },
    ],
  },
  {
    section: 'Licensing',
    items: [
      {
        question: 'How many people can use one licence?',
        answer:
          'The standard licence covers one user for internal business use across all their projects. Team licences (up to 10 users) and company licences (unlimited internal users) are available. Contact us for multi-user pricing.',
      },
      {
        question: 'Can I use the tool sets on client projects?',
        answer:
          'Yes. The licence covers internal business use, which includes using the markups on drawings for your clients as part of your normal project delivery work. You may not resell or redistribute the BTX files themselves.',
      },
      {
        question: 'Can I modify the symbols for my own use?',
        answer:
          'Yes. After importing, you may adjust colours, labels, subjects, and tool behaviour within Bluebeam Revu for any project. You may not redistribute modified versions of the original BTX files.',
      },
    ],
  },
];

export default function FAQPage() {
  const allFaqItems = faqs.flatMap((s) => s.items);
  const schema = faqSchema(allFaqItems);

  return (
    <>
      <Schema data={schema} />

      <div className="max-w-content mx-auto px-5 lg:px-8 py-8">
        <Breadcrumbs crumbs={[{ name: 'Home', url: '/' }, { name: 'FAQ', url: '/faq/' }]} />

        <div className="mt-6 mb-10">
          <h1 className="text-h1 font-bold text-slate-900">Frequently Asked Questions</h1>
          <p className="mt-3 text-base text-slate-600 max-w-2xl">
            Common questions about Bluebeam Revu markup tool sets, compatibility, importing, licensing, and purchase.
          </p>
        </div>

        <div className="max-w-3xl space-y-10">
          {faqs.map((section) => (
            <section key={section.section}>
              <h2 className="text-lg font-bold text-slate-900 mb-4 pb-2 border-b border-slate-200">
                {section.section}
              </h2>
              <dl className="space-y-6">
                {section.items.map((faq) => (
                  <div key={faq.question}>
                    <dt className="text-sm font-semibold text-slate-900">{faq.question}</dt>
                    <dd className="mt-2 text-sm text-slate-600 leading-relaxed">{faq.answer}</dd>
                  </div>
                ))}
              </dl>
            </section>
          ))}
        </div>

        <div className="mt-14">
          <CTASection
            headline="Still have a question?"
            body="If you did not find the answer you were looking for, contact us and we will get back to you."
            primaryLabel="Contact Us"
            primaryHref="/contact/"
            secondaryLabel="Read the Import Guide"
            secondaryHref="/guides/how-to-import-bluebeam-btx-tool-set/"
          />
        </div>
      </div>
    </>
  );
}
