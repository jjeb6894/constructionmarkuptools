import type { Metadata } from 'next';
import Breadcrumbs from '@/components/Breadcrumbs';
import { buildMetadata } from '@/lib/seo';

export const metadata: Metadata = buildMetadata({
  title: 'Digital Product Licence — Construction Markup Tools',
  description:
    'Licence terms for Construction Markup Tools Bluebeam Revu tool sets and symbol packs. Single user, team, and company licences explained.',
  path: '/license/',
});

export default function LicensePage() {
  return (
    <div className="max-w-content mx-auto px-5 lg:px-8 py-8">
      <Breadcrumbs crumbs={[{ name: 'Home', url: '/' }, { name: 'Licence', url: '/license/' }]} />

      <div className="mt-8 max-w-3xl">
        <h1 className="text-h1 font-bold text-slate-900">Digital Product Licence</h1>
        <p className="mt-3 text-base text-slate-600">
          This licence applies to all downloadable products sold by Construction Markup Tools.
        </p>

        <div className="mt-8 prose-article space-y-8">

          <section>
            <h2>Licence Types</h2>

            <h3>Single User Licence</h3>
            <p>
              The standard purchase covers one named user for internal business use. The licensed user may install and use the BTX tool set files on their own work computer and Bluebeam Revu installation. They may use the markup tools across any number of projects as part of their normal employment duties.
            </p>

            <h3>Team Licence</h3>
            <p>
              A team licence covers up to 10 users within the same business. Each licensed user may install and use the BTX files on their own Bluebeam Revu installation. Team licences are priced separately. Contact us for pricing.
            </p>

            <h3>Company Licence</h3>
            <p>
              A company licence covers unlimited users within a single legal entity. The BTX files may be deployed across the organisation for internal business use. Company licences are priced separately. Contact us for pricing.
            </p>
          </section>

          <section>
            <h2>What You Are Permitted to Do</h2>
            <ul>
              <li>Import the BTX file into Bluebeam Revu on your licensed device.</li>
              <li>Use the included markup tools on construction drawings as part of your professional work.</li>
              <li>Adjust colours, labels, subjects, sizes, and other tool properties within Bluebeam Revu for project-specific needs.</li>
              <li>Export a modified version of the Tool Chest as a new BTX file to share within your licensed user group (team or company licence only).</li>
              <li>Use the markups and symbols on drawings delivered to clients as part of your normal business output.</li>
            </ul>
          </section>

          <section>
            <h2>What You Are Not Permitted to Do</h2>
            <ul>
              <li>Share, sell, or redistribute the original downloaded BTX file to any person outside your licensed user group.</li>
              <li>Upload the BTX file to any file sharing platform, marketplace, or public download location.</li>
              <li>Include the BTX file in another product or bundle that you create and sell or give away.</li>
              <li>Represent the symbols as your own original work for commercial resale.</li>
              <li>Circumvent any licence check or access control measures.</li>
            </ul>
          </section>

          <section>
            <h2>Originality of Assets</h2>
            <p>
              All symbols, markups, and tool configurations included in Construction Markup Tools products are original assets created for this product range. They are not copies of competitor products, screenshots, or third-party proprietary symbols.
            </p>
          </section>

          <section>
            <h2>Bluebeam Disclaimer</h2>
            <p>
              Bluebeam and Revu are trademarks of their respective owners. Construction Markup Tools is an independent business and is not affiliated with, endorsed by, or connected to Bluebeam, Inc. in any way. The BTX file format is used under normal compatibility expectations for Bluebeam Revu users.
            </p>
          </section>

          <section>
            <h2>Changes to This Licence</h2>
            <p>
              Construction Markup Tools reserves the right to update these licence terms. Changes will not affect purchases already made under a previous version of the licence. The current licence version applies to all new purchases from the date it is published.
            </p>
          </section>

          <section>
            <h2>Contact</h2>
            <p>
              If you have questions about your licence or need a team or company licence, contact us via the <a href="/contact/" className="text-brand-600 hover:text-brand-800">contact page</a>.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
