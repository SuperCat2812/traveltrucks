'use client';

import css from './catalog.module.css';
import { useState } from 'react';
import { FilterData, FormDataValue } from '@/types/types';
import Filter from '@/components/Filter/Filter';
import Image from 'next/image';
import { GiRoundStar } from 'react-icons/gi';
import { CiMap } from 'react-icons/ci';
import { TbManualGearbox, TbAutomaticGearbox } from 'react-icons/tb';
import { FaGasPump } from 'react-icons/fa6';
import { MdElectricBolt } from 'react-icons/md';
import { FaCarAlt, FaEuroSign } from 'react-icons/fa';
import { getCamper } from '@/lib/api/camperApi';
import { useInfiniteQuery } from '@tanstack/react-query';
import { RxCross2 } from 'react-icons/rx';
import Loader from '@/components/Loading/Loading';
import Link from 'next/link';

interface ClientCatalogProps {
  filter: FilterData;
}

export default function ClientCatalog({ filter }: ClientCatalogProps) {
  const [location, setLocation] = useState('');
  const initialFilters: FormDataValue = {
    location: '',
    form: '',
    engine: '',
    transmission: '',
  };
  const [filters, setFilters] = useState<FormDataValue>(initialFilters);
  const [draftFilters, setDraftFilters] = useState<FormDataValue>(initialFilters);
  const perPage = 4;
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading, isError, refetch } = useInfiniteQuery({
    queryKey: ['campers', filters],
    initialPageParam: 1,
    queryFn: ({ pageParam }) =>
      getCamper({
        dataFilter: filters,
        page: pageParam,
        perPage,
      }),
    getNextPageParam: lastPage => (lastPage.page < lastPage.totalPages ? lastPage.page + 1 : undefined),
  });
  const campers = data?.pages.flatMap(page => page.campers) ?? [];

  const handleClearFilters = () => {
    setLocation('');
    setFilters(initialFilters);
    setDraftFilters(initialFilters);
  };
  const formatLabel = (value: string) =>
    value
      .split('_')
      .map(word => word[0].toUpperCase() + word.slice(1))
      .join(' ');
  const showInitialLoader = isLoading;
  return (
    <>
      {showInitialLoader && (
        <div className={css.loadingOverlay}>
          <Loader />
        </div>
      )}

      <div className={css.container}>
        <Filter
          location={location}
          setLocation={setLocation}
          setFilters={setFilters}
          setDraftFilters={setDraftFilters}
          filters={filter}
          onClear={handleClearFilters}
          draftFilters={draftFilters}
        />

        {campers.length > 0 ? (
          <div className={css.containerList}>
            <ul>
              {campers.map(camper => (
                <li key={camper.id} className={css.camperItem}>
                  <Image
                    src={camper.coverImage}
                    alt={camper.name}
                    width={219}
                    height={240}
                    className={css.camperImage}
                  />
                  <div className={css.containerCamper}>
                    <div>
                      <div className={css.camperTitle}>
                        <p className={css.name}>{camper.name}</p>
                        <p className={css.price}>
                          <FaEuroSign size={20} />
                          {camper.price}
                        </p>
                      </div>
                      <div className={css.camperRating}>
                        <GiRoundStar size={16} className={css.ratingStar} /> <p>{camper.rating}</p>
                        <p>({camper.totalReviews} Reviews)</p>
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
                          {formatLabel(camper.engine)}
                        </li>
                        <li key={camper.transmission} className={css.itemCategory}>
                          {camper.transmission === 'automatic' ? (
                            <TbAutomaticGearbox size={20} />
                          ) : (
                            <TbManualGearbox size={20} />
                          )}
                          {formatLabel(camper.transmission)}
                        </li>
                        <li key={camper.form} className={css.itemCategory}>
                          <FaCarAlt size={20} />
                          {formatLabel(camper.form)}
                        </li>
                      </ul>
                    </div>
                    <div className={css.showMoreContainer}>
                      <Link
                        href={`/catalog/${camper.id}`}
                        target="_blank"
                        className={css.showMore}
                        rel="noopener noreferrer"
                      >
                        Show more
                      </Link>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
            {hasNextPage && (
              <button className={css.louderBtn} onClick={() => fetchNextPage()} disabled={isFetchingNextPage}>
                {isFetchingNextPage ? 'Loading...' : 'Load more'}
              </button>
            )}
          </div>
        ) : isError ? (
          <div className={css.errorState}>
            <h2>Something went wrong</h2>
            <p>We could not load campers.</p>

            <button type="button" onClick={() => refetch()}>
              Try again
            </button>
          </div>
        ) : (
          <div className={css.containerNotFount}>
            <Image src="/notFound.png" alt="notFount" width={488} height={463} />
            <h2 className={css.notFountTitle}>No campers found</h2>
            <span className={css.notFountDescription}>
              We couldn`t find any campers that match your filters. Try adjusting your search or clearing some filters.
            </span>
            <div className={css.notFountButton}>
              <button type="button" className={css.clearBtn} onClick={handleClearFilters}>
                <RxCross2 size={24} />
                Clear filters
              </button>
              <button type="button" className={css.searchBtn} onClick={handleClearFilters}>
                View all campers
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
