'use client';
import { Review } from '@/types/types';
import { GiRoundStar } from 'react-icons/gi';
import { Rating } from 'react-simple-star-rating';

interface RatingBarProps {
  review: Review;
}

export default function RatingBar({ review }: RatingBarProps) {
  return (
    <Rating
      readonly
      initialValue={review.reviewer_rating}
      allowFraction
      fillIcon={<GiRoundStar size={16} color="var(--rating)" />}
      emptyIcon={<GiRoundStar size={16} color="var(--gray-light)" />}
    />
  );
}
