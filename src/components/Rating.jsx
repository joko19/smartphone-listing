export default function Rating({ rating }) {
  const review = [1, 2, 3, 4, 5];
  return (
    <div className="flex -ml-1">
      {review.map((value, index) => (
        <div key={index}>
          {value < rating && (
            <img src="/icons/star.png" className="h-6 w-6 object-contain" />
          )}
          {value > rating && (
            <>
              {value - rating < 0.5 ? (
                <img
                  src="/icons/half-star.png"
                  className="h-6 w-6 object-contain"
                />
              ) : (
                <img
                  src="/icons/star-outline.png"
                  className="h-6 w-6 object-contain"
                />
              )}
            </>
          )}
        </div>
      ))}
    </div>
  );
}
