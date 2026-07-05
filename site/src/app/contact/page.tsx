import type { Metadata } from 'next';
import Breadcrumbs from '@/components/Breadcrumbs';
import { buildMetadata } from '@/lib/seo';

export const metadata: Metadata = buildMetadata({
  title: 'Contact Construction Markup Tools',
  description:
    'Contact us with questions about Bluebeam tool sets, compatibility, licensing, or purchases.',
  path: '/contact/',
});

export default function ContactPage() {
  return (
    <div className="max-w-content mx-auto px-5 lg:px-8 py-8">
      <Breadcrumbs crumbs={[{ name: 'Home', url: '/' }, { name: 'Contact', url: '/contact/' }]} />

      <div className="mt-8 max-w-xl">
        <h1 className="text-h1 font-bold text-slate-900">Contact Us</h1>
        <p className="mt-3 text-base text-slate-600">
          Questions about a product, compatibility, licensing, or a purchase? Use the form below and we will respond within one working day.
        </p>

        {/* TODO: Wire this form to a contact handler (e.g., Resend, SendGrid, or a Supabase edge function) */}
        <form className="mt-8 space-y-5" action="#" method="post">
          <div>
            <label htmlFor="contact-name" className="block text-sm font-semibold text-slate-700 mb-1.5">
              Name
            </label>
            <input
              type="text"
              id="contact-name"
              name="name"
              required
              className="w-full h-11 px-4 rounded-lg border border-slate-300 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-brand-500"
              placeholder="Your name"
            />
          </div>

          <div>
            <label htmlFor="contact-email" className="block text-sm font-semibold text-slate-700 mb-1.5">
              Email address
            </label>
            <input
              type="email"
              id="contact-email"
              name="email"
              required
              className="w-full h-11 px-4 rounded-lg border border-slate-300 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-brand-500"
              placeholder="you@company.com"
            />
          </div>

          <div>
            <label htmlFor="contact-subject" className="block text-sm font-semibold text-slate-700 mb-1.5">
              Subject
            </label>
            <select
              id="contact-subject"
              name="subject"
              className="w-full h-11 px-4 rounded-lg border border-slate-300 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-brand-500 bg-white"
            >
              <option value="">Select a topic</option>
              <option value="product-question">Product question</option>
              <option value="compatibility">Compatibility</option>
              <option value="purchase">Purchase enquiry</option>
              <option value="licensing">Licensing</option>
              <option value="refund">Refund request</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div>
            <label htmlFor="contact-message" className="block text-sm font-semibold text-slate-700 mb-1.5">
              Message
            </label>
            <textarea
              id="contact-message"
              name="message"
              rows={5}
              required
              className="w-full px-4 py-3 rounded-lg border border-slate-300 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-brand-500 resize-y"
              placeholder="How can we help?"
            />
          </div>

          <button
            type="submit"
            className="w-full h-12 rounded-xl bg-brand-600 text-white font-bold text-sm hover:bg-brand-700 transition-colors"
          >
            Send Message
          </button>
        </form>

        <div className="mt-8 p-5 rounded-xl bg-slate-50 border border-slate-200">
          <h2 className="text-sm font-bold text-slate-900 mb-2">Before contacting us</h2>
          <ul className="space-y-1.5 text-sm text-slate-600">
            <li>
              Check the <a href="/faq/" className="text-brand-600 hover:text-brand-800">FAQ</a> for answers to common questions.
            </li>
            <li>
              Read the <a href="/guides/how-to-import-bluebeam-btx-tool-set/" className="text-brand-600 hover:text-brand-800">import guide</a> for BTX installation help.
            </li>
            <li>
              Review <a href="/license/" className="text-brand-600 hover:text-brand-800">licence terms</a> for usage questions.
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
