import { getFilter } from '@/lib/api/camperApi';
import ClientCatalog from './CatalogClient';

export default async function Catalog() {
  const filter = await getFilter();

  return <ClientCatalog filter={filter} />;
}
