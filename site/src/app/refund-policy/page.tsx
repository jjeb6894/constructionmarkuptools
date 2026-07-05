import type { Metadata } from 'next';
import Breadcrumbs from '@/components/Breadcrumbs';
import { buildMetadata } from '@/lib/seo';

export const metadata: Metadata = buildMetadata({
  title: 'Refund Policy — Construction Markup Tools',
  description:
    'Refund policy for Construction Markup Tools digital products. Satisfaction guarantee within 14 days for products that do not work as described.',
  path: '/refund-policy/',
});

export default function RefundPolicyPage() {
  return (
    <div className="max-w-content mx-auto px-5 lg:px-8 py-8">
      <Breadcrumbs crumbs={[{ name: 'Home', url: '/' }, { name: 'Refund Policy', url: '/refund-policy/' }]} />

      <div className="mt-8 max-w-3xl">
        <h1 className="text-h1 font-bold text-slate-900">Refund Policy</h1>
        <p className="mt-3 text-base text-slate-600">
          Construction Markup Tools sells digital download products. This policy explains when refunds are available.
        </p>

        <div className="mt-8 prose-article space-y-6">

          <section>
            <h2>Satisfaction Guarantee</h2>
            <p>
              If a purchased product does not function as described on a supported version of Bluebeam Revu (2019, 20, or 21 on Windows), you may request a refund within 14 days of purchase.
            </p>
            <p>
              To request a refund, contact us via the contact page with your order details and a brief description of the issue. We will investigate and, where the problem is confirmed, process a full refund within 5 working days.
            </p>
          </section>

          <section>
            <h2>When Refunds Are Not Available</h2>
            <p>Refunds are not available in the following circumstances:</p>
            <ul>
              <li>You have already successfully imported and used the tool set.</li>
              <li>The issue is caused by using an unsupported version of Bluebeam Revu or an unsupported operating system.</li>
              <li>You changed your mind after purchase without a product functionality issue.</li>
              <li>More than 14 days have passed since the purchase date.</li>
              <li>You purchased the wrong product when the correct product was clearly described on the product page.</li>
            </ul>
          </section>

          <section>
            <h2>Free Sample First</h2>
            <p>
              We strongly encourage all potential buyers to download and test the free sample pack before purchasing. The sample confirms the import process works on your system and gives you a representative view of the symbol quality and Tool Chest structure.
            </p>
            <p>
              If the free sample imports and works correctly on your installation, the full paid packs use the same file format and should behave identically.
            </p>
          </section>

          <section>
            <h2>Digital Product Nature</h2>
            <p>
              Because these products are digital downloads, we cannot accept returns in the traditional sense. The refund policy is based on product functionality, not change of mind.
            </p>
          </section>

          <section>
            <h2>Contact</h2>
            <p>
              To request a refund or ask a question about this policy, use the <a href="/contact/" className="text-brand-600 hover:text-brand-800">contact page</a>.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
