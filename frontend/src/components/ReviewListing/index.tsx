import ReviewCard from 'components/ReviewCard';
import { Review } from 'type/review';

import './styles.css';

type Props = {
  reviews: Review[];
};

const ReviewListing = ({ reviews }: Props) => {
  return (
    <div className="base-card review-card">
      {reviews?.map((review) => {
        return <div key={review.id}> <ReviewCard review={review} /> </div>;
      })}
    </div>
  );
};

export default ReviewListing;
