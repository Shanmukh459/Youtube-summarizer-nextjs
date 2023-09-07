import classes from "../page.module.css";
import { robotoMono, montserrat } from "../fonts";

export default function VideoMetadata(props) {
  const { author, source, description, title, view_count } =
    props.videoMetadataObj;

  return (
    <div className={classes.videoDetailsContainer}>
      <h2 className={`${classes.pageSubHeader} ${robotoMono.className}`}>
        Metadata
      </h2>
      <label className={classes.videoMetadataKey}>
        Author: <p className={classes.normalText}>{author}</p>
      </label>
      <label className={classes.videoMetadataKey}>
        Source: <p className={classes.normalText}>{source}</p>
      </label>
      <label className={classes.videoMetadataKey}>
        Description: <p className={classes.normalText}>{description}</p>
      </label>
      <label className={classes.videoMetadataKey}>
        Title: <p className={classes.normalText}>{title}</p>
      </label>
      <label className={classes.videoMetadataKey}>
        View Count: <p className={classes.normalText}>{view_count}</p>
      </label>
    </div>
  );
}
