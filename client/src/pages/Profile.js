import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { CssBaseline } from "@material-ui/core";
import Header from "../components/ProfileHeader";
import PlaceToVisit from "../components/PlaceToVisit";

const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: "10vh",
    backgroundImage: `url(${process.env.PUBLIC_URL + "/assets/bg6.jpg"})`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
  },
}));
export default function Profile() {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <CssBaseline />
<Header />
    This is the profile Page
	</div>
  );
}
