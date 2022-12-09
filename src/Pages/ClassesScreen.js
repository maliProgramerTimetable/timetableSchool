import React, { useState, useCallback } from "react";
import { makeStyles } from "@material-ui/core/styles";
import PrimaryAppBar from "../components/Appbar";
import SectionInput from "../components/InputCards/sectionInput";
import SectionTable from "../components/Tables/sectionTable";
import "./HomeScreen.css";
import docs from "../constants/docs";
import firebase from "firebase";

const useStyles = makeStyles((theme) => ({
  cardHolder: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    marginTop: "20px",
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
    height: "100%",
    marginLeft: "200px",
  },
}));

const ClassesScreen = ({ db }) => {
  if (!localStorage.getItem("uid")) {
    window.location.href = "/login";
  }
  const userRef = db.collection(JSON.parse(localStorage.getItem("uid")));

  const classes = useStyles();
  const [sections, setSections] = useState([]);

  const updateDB = (sub, docType) => {
    switch (docType) {
      case "sections":
        setSections(sub);
        break;
      default:
        console.error("Wrong Document");
    }
    userRef
      .doc(docType)
      .set(docType === docs.workingTime ? sub : { ...Object(sub) })
      .catch((e) => console.error("error", e));
  };
  const fetchRecords = useCallback(async () => {
    const db = firebase.firestore();
    const userRef = db.collection(JSON.parse(localStorage.getItem("uid")));
    userRef
      .get()
      .then((snapShot) => {
        snapShot.forEach((doc) => {
          const records =
            doc.id === docs.workingTime
              ? doc.data()
              : Object.values(doc.data());
          switch (doc.id) {
            case docs.sections:
              setSections(records);
              break;

            default:
              console.error("Wrong Document");
          }
        });
      })
      .catch((e) => console.log("err", e));
  }, []);

  React.useEffect(() => {
    fetchRecords();
  }, [fetchRecords]);

  return (
    <div className={classes.container}>
      <div className={classes.sidebar}>
        <PrimaryAppBar razredi={true} />
      </div>
      <div className={classes.content}>
        <div className={classes.cardHolder}>
            <SectionInput
              className={classes.card}
              sections={sections}
              setSections={updateDB}
              docs={docs}
            />
            <SectionTable
              sections={sections}
              setSections={updateDB}
              docs={docs}
            />
        </div>
      </div>
    </div>
  );
};

export default ClassesScreen;
