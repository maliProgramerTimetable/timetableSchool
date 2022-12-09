import React, { useState, useCallback } from "react";
import { makeStyles } from "@material-ui/core/styles";
import PrimaryAppBar from "../components/Appbar";
import WorkingtimeInput from "../components/InputCards/workingtimeInput";
import WorkingtimeTable from "../components/Tables/workingtimeTable";
import "./HomeScreen.css";
import docs from "../constants/docs";
import firebase from "firebase";

const useStyles = makeStyles((theme) => ({
  cardHolder: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-evenly",
    marginTop: "20px",
    width: "90%",
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
}));

const weekSchedule = { Pon: 0, Uto: 0, Sri: 0, Čet: 0, Pet: 0, Sub: 0 };

const WorkingTimeScreen = ({ db }) => {
  if (!localStorage.getItem("uid")) {
    window.location.href = "/login";
  }
  const userRef = db.collection(JSON.parse(localStorage.getItem("uid")));

  const classes = useStyles();
  const [sections, setSections] = useState([]);
  const [workingTime, setworkingTime] = useState(weekSchedule);

  const updateDB = (sub, docType) => {
    switch (docType) {
      case "workingTime":
        setworkingTime(sub);
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
            case docs.workingTime:
              setworkingTime(records);
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
        <PrimaryAppBar radniDani={true} />
      </div>
      <div className={classes.content}>
        <div className={classes.cardHolder}>
          <WorkingtimeInput
            workingTime={workingTime}
            setworkingTime={updateDB}
            sections={sections}
            docs={docs}
          />
          <WorkingtimeTable
            workingTime={workingTime}
            setworkingTime={updateDB}
            docs={docs}
          />
          </div>
      </div>
    </div>
  );
};

export default WorkingTimeScreen;
