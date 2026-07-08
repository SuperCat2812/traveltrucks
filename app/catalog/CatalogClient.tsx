'use client';

import css from './catalog.module.css';
import { useState } from 'react';
import { campers, campersData, filterData, formDataValue } from '@/types/types';
import Filter from '@/components/Filter/Filter';
import Image from 'next/image';
import { GiRoundStar } from 'react-icons/gi';
import { CiMap } from 'react-icons/ci';
import { TbManualGearbox, TbAutomaticGearbox } from 'react-icons/tb';
import { FaGasPump } from 'react-icons/fa6';
import { MdElectricBolt } from 'react-icons/md';
import { FaCarAlt } from 'react-icons/fa';
import { getCamper } from '@/lib/api/clientApi';
import { useRouter } from 'next/navigation';

interface ClientCatalogProps {
    catalogCampers: campersData;
    filter: filterData;
}

export default function ClientCatalog({ catalogCampers,filter }: ClientCatalogProps) {
  const router = useRouter();
  const [location, setLocation] = useState('');
  const [page, setPage] = useState(1);
  const perPage = 4;
  const [totalPage, setTotalPage] = useState(catalogCampers.totalPages);
  console.log(totalPage);

  const [campers, setCamper] = useState<campers[]>(catalogCampers.campers);
  const initialFilters: formDataValue = {
    location: '',
    form: '',
    engine: '',
    transmission: '',
  };
  const [filters, setFilters] = useState<formDataValue>(initialFilters);
  const handleLoadMore = async () => {
    const data = await getCamper({
      dataFilter: filters,
      page,
      perPage,
    });

    setCamper(prev => {
      const existingIds = new Set(prev.map(item => item.id));

      const newItems = data.campers.filter(item => !existingIds.has(item.id));

      return [...prev, ...newItems];
    });
    setTotalPage(data.totalPages);
    setPage(prev => prev + 1);
  };
  const handlerClick = (id: string) => {
    router.push(`/catalog/${id}`);
  };
  return (
    <div className={css.container}>
      <Filter
        location={location}
        setLocation={setLocation}
        setCamper={setCamper}
        setFilters={setFilters}
        setPage={setPage}
              setTotalPage={setTotalPage}
              filter={filter}
      />
      <div className={css.containerList}>
        <ul>
          {campers.map(camper => (
            <li key={camper.id} className={css.camperItem}>
              <Image src={camper.coverImage} alt={camper.name} width={219} height={240} className={css.camperImage} />
              <div className={css.containerCamper}>
                <div>
                  <div className={css.camperTitle}>
                    <p>{camper.name}</p>
                    <p>{camper.price}</p>
                  </div>
                  <div className={css.camperRating}>
                    <GiRoundStar size={16} className={css.ratingStar} /> <p>{camper.rating}</p>
                    <p>({camper.totalReviews} Reviews )</p>
                    <p className={css.location}>
                      <CiMap size={24} /> {camper.location}
                    </p>
                  </div>
                </div>

                <div>
                  <p className={css.description}>{camper.description}</p>
                </div>
                <div>
                  <ul className={css.listCategory}>
                    <li key={camper.engine} className={css.itemCategory}>
                      {camper.engine == 'petrol' || camper.engine == 'diesel' ? (
                        <FaGasPump size={20} />
                      ) : camper.engine == 'hybrid' ? (
                        <>
                          <FaGasPump size={20} />
                          <MdElectricBolt size={20} />
                        </>
                      ) : (
                        <MdElectricBolt size={20} />
                      )}
                      {camper.engine}
                    </li>
                    <li key={camper.transmission} className={css.itemCategory}>
                      {camper.transmission === 'automatic' ? (
                        <TbAutomaticGearbox size={20} />
                      ) : (
                        <TbManualGearbox size={20} />
                      )}
                      {camper.transmission}
                    </li>
                    <li key={camper.form} className={css.itemCategory}>
                      <FaCarAlt size={20} />
                      {camper.form}
                    </li>
                  </ul>
                </div>
                <div>
                  <button className={css.showMore} onClick={() => handlerClick(camper.id)}>
                    Show more
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
        {campers.length > 0 && page < totalPage && (
          <button className={css.louderBtn} onClick={handleLoadMore}>
            Load more
          </button>
        )}
      </div>
    </div>
  );
}
