import { Rating } from "db";
import { styled } from "ui";

interface Props {
  rating: Rating | null;
  onRatingChanged?: (rating: Rating) => void;
}

const CenteredRadio = styled("div", {
  display: "grid",
  placeItems: "center",
  borderRadius: "$large",
  width: "48px",
  height: "48px",
  fontSize: "$5",

  '&[aria-checked="true"]': {
    background:
      "linear-gradient(62deg, #f37286 0%, #ef81ae 16%, #ec90cc 33%, #ea9ee2 50%, #d6b5e8 66%, #d0c5e8 83%, #d2d2e9 100%)",
  },
});

export const EmojiRating = ({ rating, onRatingChanged }: Props) => {
  return (
    <>
      <CenteredRadio
        role="radio"
        data-value={Rating.VERY_BAD}
        aria-checked={rating === Rating.VERY_BAD}
        onClick={() => onRatingChanged?.(Rating.VERY_BAD)}
        tabIndex={rating === Rating.VERY_BAD ? 0 : -1}
      >
        😢
      </CenteredRadio>
      <CenteredRadio
        role="radio"
        data-value={Rating.BAD}
        aria-checked={rating === Rating.BAD}
        onClick={() => onRatingChanged?.(Rating.BAD)}
        tabIndex={rating === Rating.BAD ? 0 : -1}
      >
        🙁
      </CenteredRadio>
      <CenteredRadio
        role="radio"
        data-value={Rating.AVERAGE}
        aria-checked={rating === Rating.AVERAGE}
        onClick={() => onRatingChanged?.(Rating.AVERAGE)}
        tabIndex={rating === Rating.AVERAGE ? 0 : -1}
      >
        😐
      </CenteredRadio>
      <CenteredRadio
        role="radio"
        data-value={Rating.GOOD}
        aria-checked={rating === Rating.GOOD}
        onClick={() => onRatingChanged?.(Rating.GOOD)}
        tabIndex={rating === Rating.GOOD ? 0 : -1}
      >
        🙂
      </CenteredRadio>
      <CenteredRadio
        role="radio"
        data-value={Rating.VERY_GOOD}
        aria-checked={rating === Rating.VERY_GOOD}
        onClick={() => onRatingChanged?.(Rating.VERY_GOOD)}
        tabIndex={rating === Rating.VERY_GOOD ? 0 : -1}
      >
        😍
      </CenteredRadio>
    </>
  );
};
