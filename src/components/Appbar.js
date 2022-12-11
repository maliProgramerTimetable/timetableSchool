import React, { useState, useEffect } from "react";
import { makeStyles, IconButton } from "@material-ui/core";
import { ExitToApp, AccountCircle } from "@material-ui/icons";
import firebase from "firebase";

const useStyles = makeStyles((theme) => ({
  title: {
    margin: "10px !important",
  },
  sidebarInner: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
    height: "100%",
    color: "rgba(0, 0, 0, 0.8)",
  },
  links: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  link: {
    margin: "10px 0px",
    textDecoration: "none",
    fontSize: "1.2rem",
    color: "rgba(0, 0, 0, 0.5)",
  },
  linksInner: {
    marginTop: "30px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  active: {
    color: "rgba(0, 0, 0, 0.8)",
  },
  mainLink: {
    marginLeft: "10px",
  },
}));

export default function PrimaryAppBar({
  predmeti,
  razredi,
  radniDani,
  raspored,
}) {
  const [user, setUser] = useState(null);
  const classes = useStyles();
  useEffect(() => {
    const db = firebase.firestore();
    const userRef = db.collection(JSON.parse(localStorage.getItem("uid")));
    userRef.get().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        if (doc.id === JSON.parse(localStorage.getItem("uid"))) {
          setUser(doc.data());
        }
      });
    });
  }, []);

  return (
    <div className={classes.sidebarInner}>
      <div className={classes.links}>
        <IconButton
          edge="end"
          aria-label="Logged In User"
          color="inherit"
          className={classes.title}
        >
          <AccountCircle />
          <div className={classes.mainLink}>
            {user ? user.displayName : "User"}
          </div>
        </IconButton>
        <div className={classes.linksInner}>
          <a
            href="/predmeti"
            className={`${classes.link} ${predmeti ? classes.active : ""}`}
          >
            Predmeti
          </a>
          <a
            href="/razredi"
            className={`${classes.link} ${razredi ? classes.active : ""}`}
          >
            Razredi
          </a>
          <a
            href="/radni-dani"
            className={`${classes.link} ${radniDani ? classes.active : ""}`}
          >
            Radni dani
          </a>
          <a
            href="/"
            className={`${classes.link} ${raspored ? classes.active : ""}`}
          >
            Raspored
          </a>
        </div>
      </div>
      <IconButton
        edge="end"
        aria-label="Sign Out"
        aria-haspopup="true"
        onClick={() => {
          firebase.auth().signOut();
          localStorage.removeItem("uid");
          window.location.href = "/login";
        }}
        className={classes.title}
        color="inherit"
      >
        <ExitToApp />
        <div className={classes.mainLink}>Odjavi se</div>
      </IconButton>
    </div>
  );
}
