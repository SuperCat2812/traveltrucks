import { getCamper } from '@/lib/api/clientApi';
import ClientCatalog from './CatalogClient';

export default async function Catalog() {
  const page = 1;
  const perPage = 4;
  const catalogCampers = await getCamper({ page, perPage });
  return <ClientCatalog catalogCampers={catalogCampers} />;
}
