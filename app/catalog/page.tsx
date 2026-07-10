import { getFilter } from '@/lib/api/camperApi';
import ClientCatalog from './CatalogClient';
import { Metadata } from 'next';
export const metadata: Metadata = {
  title: 'Campers Catalog',
  description: 'Browse available campers.',
  openGraph: {
    title: 'Campers Catalog',
    description: 'Browse available campers.',
    url: 'https://traveltrucks-gray.vercel.app/catalog',
    images: ['/og-image.png'],
  },
};
export default async function Catalog() {
  const filter = await getFilter();

  return <ClientCatalog filter={filter} />;
}
