import { Bars } from "react-loader-spinner";
import classes from "./page.module.css";

const loaderSpinnerHeight = 80;
const loaderSpinnerWidth = 80;
const loaderSpinnerColor = "#cce6f4";

export const BarsLoaderSpinner = () => (
  <Bars
    height={loaderSpinnerHeight}
    width={loaderSpinnerWidth}
    color={loaderSpinnerColor}
    ariaLabel="bars-loading"
    wrapperClass={classes.loaderSpinner}
    visible={true}
  />
);
