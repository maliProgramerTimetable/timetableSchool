import React, { useState, useCallback } from "react";
import { makeStyles } from "@material-ui/core/styles";
import PrimaryAppBar from "../components/Appbar";
import SubjectInput from "../components/InputCards/subjectInput";
import TeacherInput from "../components/InputCards/teacherInput";
import SubjectTable from "../components/Tables/subjectTable";
import TeacherTable from "../components/Tables/teacherTable";
import LectureInput from "../components/lectures/lectureInput";
import LectureTable from "../components/lectures/lectureTable";
import "./HomeScreen.css";
import docs from "../constants/docs";
import firebase from "firebase";

const useStyles = makeStyles((theme) => ({
  cardHolder: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    marginTop: "20px",
    width: "100%",
  },
  innerCradHolder: {
    display: "flex",
    flexDirection: "column",
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
    height: "100%",
    marginLeft: "200px",
  },
}));


const SubjectsScreen = ({db}) => {
  if(!localStorage.getItem("uid")){
		window.location.href = "/login"
	}
  const userRef = db.collection(JSON.parse(localStorage.getItem("uid")));

    const classes = useStyles();
   const [subjects, setSubjects] = useState([]);
    const [sections, setSections] = useState([]);
    const [teachers, setTeachers] = useState([]);
    const [lectures, setLectures] = useState([]);
  
    const updateDB = (sub, docType) => {
      switch (docType) {
        case "subjects":
          setSubjects(sub);
          break;
        case "teachers":
          setTeachers(sub);
          break;
        case "lectures":
          setLectures(sub);
          break;
        default:
          console.error("Wrong Document");
      }
      userRef
        .doc(docType)
        .set(docType === docs.workingTime ? sub : { ...Object(sub) })
        .then((e) => console.log("saved"))
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
              case docs.subjects:
                setSubjects(records);
                break;
              case docs.teachers:
                setTeachers(records);
                break;
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
    }, [fetchRecords]);

    return (
      <div className={classes.container} >
      <div className={classes.sidebar}>
        <PrimaryAppBar predmeti={true} />
      </div>
      <div className={classes.content}>
        <div className={classes.cardHolder}>
          <div className={classes.innerCradHolder}>
            <SubjectInput
              className={classes.card}
              subjects={subjects}
              setSubjects={updateDB}
              docs={docs}
            />
            <SubjectTable
              subjects={subjects}
              setSubjects={updateDB}
              docType={docs}
            />
          </div>
          <div className={classes.innerCradHolder}>
            <TeacherInput
              className={classes.card}
              teachers={teachers}
              setTeachers={updateDB}
              docs={docs}
            />
            <TeacherTable
              teachers={teachers}
              setTeachers={updateDB}
              docs={docs}
            />
          </div>

          <div  className={classes.innerCradHolder}>
            <LectureInput
              lectures={lectures}
              setLectures={updateDB}
              docs={docs}
              subjects={subjects}
              sections={sections}
              teachers={teachers}
            />
            <LectureTable
              lectures={lectures}
              setLectures={updateDB}
              docs={docs}
            />
          </div>
        </div>
      </div>
    </div>
    );
};

export default SubjectsScreen