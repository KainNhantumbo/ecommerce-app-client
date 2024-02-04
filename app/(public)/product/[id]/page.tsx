import { Product } from '@/types';
import httpClient from '@/config/http-client';
import { useParams } from 'next/navigation';

const getProduct = async (id: string) => {
  const response = await httpClient.get<Product>(`/api/v1/products/${id}`);
  return response.data;
};

export default async function Page({ params }: any) {
  // const params = useParams()
  console.log(typeof params.id);
  const data = await getProduct(params.id);

  return (
    <main>
      <section>
        <section></section>
        <section></section>
      </section>
    </main>
  );
}
