import type { MetadataRoute } from 'next';
import { products } from '@/lib/products';
import { articles } from '@/lib/articles';

const BASE = 'https://constructionmarkuptools.com';

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages: MetadataRoute.Sitemap = [
    { url: `${BASE}/`, lastModified: new Date(), changeFrequency: 'weekly', priority: 1.0 },
    { url: `${BASE}/products/`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },
    { url: `${BASE}/free-bluebeam-symbols-sample/`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.9 },
    { url: `${BASE}/guides/`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
    { url: `${BASE}/blog/`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
    { url: `${BASE}/compare/`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE}/faq/`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE}/contact/`, lastModified: new Date(), changeFrequency: 'yearly', priority: 0.5 },
    { url: `${BASE}/license/`, lastModified: new Date(), changeFrequency: 'yearly', priority: 0.4 },
    { url: `${BASE}/refund-policy/`, lastModified: new Date(), changeFrequency: 'yearly', priority: 0.4 },
  ];

  const productPages: MetadataRoute.Sitemap = products.map((p) => ({
    url: `${BASE}/products/${p.slug}/`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.85,
  }));

  const articlePages: MetadataRoute.Sitemap = articles.map((a) => {
    const basePath = a.category === 'guide' ? 'guides' : a.category === 'compare' ? 'compare' : 'blog';
    return {
      url: `${BASE}/${basePath}/${a.slug}/`,
      lastModified: new Date(a.publishedDate),
      changeFrequency: 'monthly',
      priority: 0.7,
    };
  });

  return [...staticPages, ...productPages, ...articlePages];
}
