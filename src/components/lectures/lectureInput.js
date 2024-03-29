import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  TextField,
  Card,
  CardContent,
  Button,
  MenuItem,
} from "@material-ui/core";
import docs from "../../constants/docs";
import { strings } from "../../translation/strings";

const useStyles = makeStyles((theme) => ({
  root: {
    minWidth: 275,
    margin: 10,
    borderRadius: 20,
  },
  content: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  textField: {
    margin: 5,
    minWidth: 200,
  },
  button: {
    width: "30%",
    height: "55px",
    marginLeft: 30,
  },
  inputs: {
    marginLeft: 10,
  },
}));

const lectureArrangement = [
  ["1"],
  ["1 - 1", "2"],
  ["1 - 1 - 1", "2 - 1"],
  ["1 - 1 - 1 - 1", "2 - 1 - 1", "2-2"],
  ["1 - 1 - 1 - 1 - 1", "2 - 1 - 1 - 1", "2-2-1"],
];
export default function LectureInput({
  lectures,
  setLectures,
  subjects,
  sections,
  teachers,
}) {
  const classes = useStyles();
  const [subject, setsubject] = useState("");
  const [section, setsection] = useState("");
  const [teacher, setteacher] = useState("");
  const [lectureArr, setlectureArr] = useState("");

  const [subjectError, setsubjectError] = useState("");
  const [sectionError, setsectionError] = useState("");
  const [teacherError, setteacherError] = useState("");
  const [lecturearrError, setlecturearrError] = useState("");

  const subjectChange = (event) => {
    setlectureArr("");
    setsubject(event.target.value);
  };

  const sectionChange = (event) => {
    setsection(event.target.value);
  };

  const teacherChange = (event) => {
    setteacher(event.target.value);
  };

  const lecturesChange = (event) => {
    setlectureArr(event.target.value);
  };

  const setRequiredError = () => {
    !subject ? setsubjectError("Required") : setsubjectError("");
    !teacher ? setteacherError("Required") : setteacherError("");
    !section ? setsectionError("Required") : setsectionError("");
    !lectureArr ? setlecturearrError("Required") : setlecturearrError("");
  };

  const setEmptyTextfields = () => {
    setlectureArr("");
    setsubject("");
    setteacher("");
    setsection("");

    setsubjectError("");
    setteacherError("");
    setsectionError("");
    setlecturearrError("");
  };

  const addButton = () => {
    if (subject && teacher && section && lectureArr) {
      let temp = [...lectures];

      if (lectures) {
        if (
          temp.findIndex(
            (e) =>
              e[4] === teacher + section ||
              (e[1] === section && e[2] === subject)
          ) === -1
        )
          temp.push([teacher, section, subject, lectureArr, teacher + section]);
        else {
          setRequiredError();
          setteacherError("Lecture already exists");
          setsubjectError("Lecture already exists");
          setsectionError("Lecture already exists");
          return;
        }
      } else
        temp = [[teacher, section, subject, lectureArr, teacher + section]];

      setLectures(temp, docs.lectures);
      setEmptyTextfields();
    } else setRequiredError();
  };

  const selectedIndex = (array, element, index) =>
    array[array.findIndex((e) => e[index] === element)];

  const subjectIndex = selectedIndex(subjects, subject, 1);

  return (
    <Card className={classes.root}>
      <CardContent className={classes.content}>
        <h3 style={{ textAlign: "left" }}>{strings.add_lectures_title}</h3>
        <div className={classes.inputs}>
          <TextField
            type="number"
            className={classes.textField}
            id="teacher"
            label={strings.lecture_table_titles_title}
            select
            required
            error={!!teacherError}
            helperText={teacherError}
            onChange={teacherChange}
            value={teacher}
            InputLabelProps={{
              shrink: true,
            }}
            variant="outlined"
          >
            {teachers.map((option) => (
              <MenuItem
                key={option[1] ? option[1] : "teacher"}
                value={option[0]}
              >
                {option[0]}
              </MenuItem>
            ))}
          </TextField>
        </div>

        <div>
          <TextField
            type="number"
            className={classes.textField}
            id="section"
            label={strings.lecture_table_titles_section}
            select
            required
            error={!!sectionError}
            helperText={sectionError}
            onChange={sectionChange}
            value={section}
            InputLabelProps={{
              shrink: true,
            }}
            variant="outlined"
          >
            {sections.map((option) => (
              <MenuItem
                key={option[1] ? option[1] : "section"}
                value={option[1]}
              >
                {option[1]}
              </MenuItem>
            ))}
          </TextField>
        </div>

        <div>
          <TextField
            type="number"
            className={classes.textField}
            id="subject"
            label={strings.lecture_table_titles_subject}
            select
            required
            error={!!subjectError}
            helperText={subjectError}
            onChange={subjectChange}
            value={subject}
            InputLabelProps={{
              shrink: true,
            }}
            variant="outlined"
          >
            {subjects.map((option) => (
              <MenuItem
                key={option[1] ? option[1] : "subject"}
                value={option[1]}
              >
                {option[1]}
              </MenuItem>
            ))}
          </TextField>
        </div>

        <div>
          <TextField
            type="number"
            className={classes.textField}
            id="lecture"
            label={strings.lecture_arrangement_label}
            select
            required
            error={!!lecturearrError}
            helperText={lecturearrError}
            onChange={lecturesChange}
            value={lectureArr}
            disabled={!subject}
            onKeyDown={(e) => {
              if (e.keyCode === 13) addButton();
            }}
            InputLabelProps={{
              shrink: true,
            }}
            variant="outlined"
          >
            {subject && subjectIndex ? (
              lectureArrangement[subjectIndex[2] - 1].map((option) => (
                <MenuItem key={option ? option : "lecture"} value={option}>
                  {option}
                </MenuItem>
              ))
            ) : (
              <MenuItem></MenuItem>
            )}
          </TextField>
        </div>

        <Button
          className={classes.button}
          variant="contained"
          color="primary"
          size="medium"
          onClick={addButton}
        >
          {strings.add_lectures_button}
        </Button>
      </CardContent>
    </Card>
  );
}
