"use client";

import { StarIcon as StarSolid } from "@heroicons/react/24/solid";
import { StarIcon as StarOutline } from "@heroicons/react/24/outline";

interface RatingStarsProps {
    rating: number; // 1-5
}

export default function RatingStars({ rating }: RatingStarsProps) {
    return (
        <div className="flex space-x-1">
            {[1, 2, 3, 4, 5].map((n) =>
                n <= rating ? (
                    <StarSolid key={n} className="w-5 h-5 text-yellow-400" />
                ) : (
                    <StarOutline key={n} className="w-5 h-5 text-gray-300" />
                )
            )}
        </div>
    );
}
