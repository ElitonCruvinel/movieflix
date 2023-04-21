import { ReactComponent as StarImage } from 'assets/images/star.svg';
import { Review } from 'type/review';

import './styles.css';

type Props = {
  review: Review;
};

const ReviewCard = ({ review }: Props) => {
  return (
    <div className="base-card review-card-container">
      <div className="user-container">
        <StarImage />
        <span>{review.user.name}</span>
      </div>
      <div className="text-container">
        <p>{review.text}</p>
      </div>
    </div>
  );
};

export default ReviewCard;
