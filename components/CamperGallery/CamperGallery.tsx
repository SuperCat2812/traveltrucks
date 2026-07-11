'use client';
import { Swiper as SwiperType } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';
import Image from 'next/image';
import { CamperID } from '@/types/types';
import { useState } from 'react';
import { FreeMode, Navigation, Thumbs } from 'swiper/modules';
import css from './CamperGallery.module.css';

type CamperGalleryProps = {
  images: CamperID['gallery'];
  name: string;
};

export default function CamperGallery({ images, name }: CamperGalleryProps) {
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType | null>(null);

  if (!images.length) {
    return <p>No images available</p>;
  }
  return (
    <div className={css.gallery}>
      <Swiper
        spaceBetween={10}
        navigation
        thumbs={{ swiper: thumbsSwiper }}
        modules={[FreeMode, Navigation, Thumbs]}
        className={css.mainSwiper}
      >
        {images.map(image => (
          <SwiperSlide key={image.id}>
            <Image src={image.original} alt={name} width={600} height={400} className={css.mainImage} />
          </SwiperSlide>
        ))}
      </Swiper>

      <Swiper
        onSwiper={setThumbsSwiper}
        spaceBetween={32}
        slidesPerView={Math.min(images.length, 4)}
        freeMode
        watchSlidesProgress
        modules={[FreeMode, Navigation, Thumbs]}
        className={css.thumbsSwiper}
      >
        {images.map(image => (
          <SwiperSlide key={image.id} className={css.thumbSlide}>
            <Image src={image.thumb} alt={name} width={120} height={80} className={css.thumbImage} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
