import { getCamperID } from '@/lib/api/clientApi';
import css from './camperId.module.css';
import { GiRoundStar } from 'react-icons/gi';
import { CiMap } from 'react-icons/ci';
import CamperGallery from '@/components/CamperGallery/CamperGallery';

interface CamperDetailsProps {
  params: Promise<{ camperId: string }>;
}

export default async function CamperDetails({ params }: CamperDetailsProps) {
  const { camperId } = await params;
  const camper = await getCamperID(camperId);
  return (
    <div key={camper.id} className={css.camperItem}>
      <div className={css.Images}>
        <CamperGallery images={camper.gallery} name={camper.name} />
      </div>
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
              {camper.engine}
            </li>
            <li key={camper.transmission} className={css.itemCategory}>
              {camper.transmission}
            </li>
            <li key={camper.form} className={css.itemCategory}>
              {camper.form}
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
