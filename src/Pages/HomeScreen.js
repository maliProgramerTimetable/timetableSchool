import React, { useState, useCallback } from "react";
import { makeStyles } from "@material-ui/core/styles";
import PrimaryAppBar from "../components/Appbar";
import { Button, CircularProgress } from "@material-ui/core";
import GenerateTimetable from "../components/GenerateTimetable";
import "./HomeScreen.css";
import docs from "../constants/docs";
import firebase from "firebase";

const useStyles = makeStyles((theme) => ({
  genButton: {
    margin: 25,
  },
  wrapper: {
    position: "relative",
    display: "flex",
    justifyContent: "center",
  },
  buttonProgress: {
    margin: 25,
    position: "absolute",
    top: "3%",
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
    marginLeft: "200px",
    height: "100vh",
  },
}));

const HomeScreen = () => {
  const classes = useStyles();

  const [lectures, setLectures] = useState([]);
  const [loading, setloading] = useState(false);
  const [timetable, setTimetable] = useState(undefined);

  const fetchTimetable = useCallback(async () => {
    const db = firebase.firestore();
    const userRef = db.collection(JSON.parse(localStorage.getItem("uid")));

    const temp = {};

    await userRef
      .doc(docs.timeTable)
      .collection(docs.timeTable)
      .onSnapshot((snapshot) => {
        if (!snapshot.empty) {
          const lecSec = [];
          snapshot.forEach((snap) => {
            temp[snap.id] = Object.values(snap.data());
            lecSec.push(snap.id);
          });
          setTimetable(temp);
        }
      });
  }, []);

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
            case docs.lectures:
              setLectures(records);
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
    fetchTimetable();
  }, [fetchRecords, fetchTimetable]);

  const generateButton = () => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userID: firebase.auth().currentUser.uid }),
    };
    setloading(true);
    fetch("http://localhost:8001/generate", requestOptions)
      .then((response) => response.json())
      .then(async () => {
        fetchTimetable();
        setloading(false);
      })
      .catch((e) => {
        console.log(e);
        setloading(false);
      });
  };
  return (
    <div className={classes.container}>
      <div className={classes.sidebar}>
        <PrimaryAppBar raspored={true} />
      </div>
      <div className={classes.content}>
        <div className={classes.wrapper}>
          <Button
            variant="contained"
            color="secondary"
            size="large"
            className={classes.genButton}
            onClick={generateButton}
            disabled={!lectures.length || loading}
          >
            Generiši Raspored
          </Button>
          {loading && (
            <CircularProgress
              color="secondary"
              size={38}
              className={classes.buttonProgress}
            />
          )}
        </div>
        <GenerateTimetable timetable={timetable} />
      </div>
    </div>
  );
};

export default HomeScreen;
