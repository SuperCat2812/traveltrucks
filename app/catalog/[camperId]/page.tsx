import { getCamperID, getReviews } from '@/lib/api/camperApi';
import css from './camperId.module.css';
import { GiRoundStar } from 'react-icons/gi';
import { CiMap } from 'react-icons/ci';
import CamperGallery from '@/components/CamperGallery/CamperGallery';
import { FaEuroSign } from 'react-icons/fa';
import RatingBar from '@/components/RatingBar/RatingBar';
import BookForm from '@/components/BookForm/BookForm';
import { Metadata } from 'next';

interface CamperDetailsProps {
  params: Promise<{ camperId: string }>;
}

export async function generateMetadata({ params }: { params: Promise<{ camperId: string }> }): Promise<Metadata> {
  const { camperId } = await params;
  const camper = await getCamperID(camperId);

  return {
    title: camper.name,
    description: camper.description,
    openGraph: {
      title: camper.name,
      description: camper.description,
      images: [camper.gallery[0].thumb],
    },
  };
}
export default async function CamperDetails({ params }: CamperDetailsProps) {
  const { camperId } = await params;
  const [camper, reviews] = await Promise.all([getCamperID(camperId), getReviews(camperId)]);
  const formatLabel = (value: string) =>
    value
      .split('_')
      .map(word => word[0].toUpperCase() + word.slice(1))
      .join(' ');
  const features = [camper.transmission, camper.engine, ...camper.amenities, camper.form];
  return (
    <div>
      <div key={camper.id} className={css.camperItem}>
        <div className={css.Images}>
          <CamperGallery images={camper.gallery} name={camper.name} />
        </div>
        <div className={css.container}>
          <div className={css.containerCamper}>
            <div>
              <div className={css.camperTitle}>
                <p>{camper.name}</p>
              </div>
              <div className={css.containerCamperRating}>
                <div className={css.camperRating}>
                  <GiRoundStar size={16} className={css.ratingStar} /> <p>{camper.rating}</p>
                  <p>({camper.totalReviews} Reviews)</p>
                  <p className={css.location}>
                    <CiMap size={24} /> {camper.location}
                  </p>
                </div>
                <p className={css.price}>
                  <FaEuroSign size={20} />
                  {camper.price}
                </p>
              </div>
            </div>

            <div>
              <p className={css.description}>{camper.description}</p>
            </div>
          </div>
          <div className={css.containerAmenitie}>
            <div className={css.amenitieContent}>
              <p className={css.amenitieTitle}>Vehicle details</p>
              <ul className={css.amenitieList}>
                {features.map((feature, index) => (
                  <li key={`${feature}-${index}`} className={css.amenitieItem}>
                    <p className={css.amenitieText}>{formatLabel(feature)}</p>
                  </li>
                ))}
              </ul>
              <hr className={css.amenitieLine} />
              <ul className={css.detailList}>
                <li className={css.detailItem}>
                  <p>Form</p>
                  <p>{formatLabel(camper.form)}</p>
                </li>
                <li className={css.detailItem}>
                  <p>Length</p>
                  <p>{formatLabel(camper.length)}</p>
                </li>
                <li className={css.detailItem}>
                  <p>Width</p>
                  <p>{formatLabel(camper.width)}</p>
                </li>
                <li className={css.detailItem}>
                  <p>Height</p>
                  <p>{formatLabel(camper.height)}</p>
                </li>
                <li className={css.detailItem}>
                  <p>Tank</p>
                  <p>{formatLabel(camper.tank)}</p>
                </li>
                <li className={css.detailItem}>
                  <p>Consumption</p>
                  <p>{formatLabel(camper.consumption)}</p>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div className={css.reviewsSection}>
        <div className={css.reviewContainer}>
          <p className={css.reviewsTitle}>Reviews</p>
          <ul className={css.reviewList}>
            {reviews.map(review => (
              <li key={review.id} className={css.reviewItem}>
                <div className={css.reviewContent}>
                  <p className={css.icon}>{review.reviewer_name[0].toUpperCase()}</p>
                  <div className={css.reviewName}>
                    <p>{review.reviewer_name}</p>
                    <RatingBar review={review} />
                  </div>
                </div>
                <span className={css.reviewComment}>{review.comment}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className={css.bookingFormContainer}>
          <BookForm camperId={camperId} />
        </div>
      </div>
    </div>
  );
}
