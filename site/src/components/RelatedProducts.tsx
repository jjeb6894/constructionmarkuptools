import ProductCard from './ProductCard';
import type { Product } from '@/lib/products';

interface Props {
  products: Product[];
  title?: string;
}

export default function RelatedProducts({ products, title = 'Related Products' }: Props) {
  if (!products.length) return null;

  return (
    <section>
      <h2 className="text-h2 font-bold text-slate-900">{title}</h2>
      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {products.map((product) => (
          <ProductCard key={product.slug} product={product} />
        ))}
      </div>
    </section>
  );
}
