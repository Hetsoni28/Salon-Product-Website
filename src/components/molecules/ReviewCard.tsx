import React from 'react';
import { CheckCircle2 } from 'lucide-react';
import { Rating } from '@/components/atoms';

export interface ReviewCardProps {
  author: string;
  date: string;
  rating: number;
  review: string;
  verified?: boolean;
  className?: string;
}

export const ReviewCard: React.FC<ReviewCardProps> = ({
  author,
  date,
  rating,
  review,
  verified,
  className = '',
}) => {
  return (
    <div className={`rounded-xl border border-gray-100 bg-white p-5 shadow-sm ${className}`}>
      <div className="mb-3 flex items-start justify-between">
        <div>
          <div className="flex items-center gap-2">
            <span className="font-semibold text-gray-900">{author}</span>
            {verified && (
              <span className="flex items-center gap-1 text-xs text-green-600">
                <CheckCircle2 size={12} />
                Verified
              </span>
            )}
          </div>
          <div className="mt-1">
            <Rating value={rating} />
          </div>
        </div>
        <span className="text-xs text-gray-500">{date}</span>
      </div>
      <p className="text-sm leading-relaxed text-gray-600">{review}</p>
    </div>
  );
};

export default ReviewCard;
