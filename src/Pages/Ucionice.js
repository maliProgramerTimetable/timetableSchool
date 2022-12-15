import React from "react";
import PrimaryAppBar from "../components/Appbar";
import { makeStyles } from "@material-ui/core/styles";
import "./HomeScreen.css";

const useStyles = makeStyles((theme) => ({
  cardHolder: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    marginTop: "20px",
    width: "100%",
  },
  lectures: {
    width: "100%",
    margin: "0% 5%",
  },
  genButton: {
    marginBottom: 25,
  },
  wrapper: {
    position: "relative",
    display: "flex",
    justifyContent: "center",
  },
  buttonProgress: {
    position: "absolute",
    top: "3%",
  },
  footer: {
    marginBottom: 30,
    fontSize: "1.2rem",
    letterSpacing: "0.3rem",
    textAlign: "center",
    color: "white",
    "& a": {
      color: "#791E94",
      "&:hover": {
        fontWeight: 700,
      },
    },
  },
  container: {
    display: "flex",
  },
  sidebar: {
    width: "200px",
    height: "100%",
    position: "fixed",
    backgroundColor: "white",
  },
  content: {
    width: "100%",
    height: "100vh",
    marginLeft: "200px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  ako: {
    color: "white",
    fontSize: 25
  }
}));

const Ucionice = () => {
  if (!localStorage.getItem("uid")) {
    window.location.href = "/login";
  }
  const classes = useStyles();
  return (
    <div className={classes.container}>
      <div className={classes.sidebar}>
        <PrimaryAppBar ucionice={true} />
      </div>
      <div className={classes.content}>
      <div className="divptaga">
        <p className="ptag">U izradi...</p>
      </div>
      <div className={classes.ako} >(Ako Pobijedimo)</div>
      </div>
      </div>
  );
};

export default Ucionice;
