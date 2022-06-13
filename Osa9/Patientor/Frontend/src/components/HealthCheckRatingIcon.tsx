import FavoriteIcon from "@material-ui/icons/Favorite";

import { HealthCheckRating } from "../types";
import { assertNever } from "../helpers";

const HealthCheckRatingIcon = ({ rating }: { rating: HealthCheckRating }) => {
  switch(rating) {
    case HealthCheckRating.Healthy:
      return <FavoriteIcon style={{ color: "green" }} />;
    case HealthCheckRating.LowRisk:
      return <FavoriteIcon style={{ color: "yellow" }} />;
    case HealthCheckRating.HighRisk:
      return <FavoriteIcon style={{ color: "orange" }} />;
    case HealthCheckRating.CriticalRisk:
      return <FavoriteIcon style={{ color: "black" }} />;
    default:
      return assertNever(rating);
  }
};

export default HealthCheckRatingIcon;