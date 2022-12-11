import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  TextField,
  Card,
  Button,
  MenuItem,
} from "@material-ui/core";
import docs from "../../constants/docs";
import { strings } from "../../translation/strings";

const useStyles = makeStyles((theme) => ({
  root: {
    margin: 10,
    borderRadius: 20,
    minHeight: 360,
    display: "flex",
    justifyContent: "space-between",
  },
  title: {
    fontSize: 14,
  },
  textField: {
    margin: 5,
  },
  hrs: {
   marginTop: "10px",
   marginBottom:"10px",
   width:"95%",
    
  },
  hours: {
    display: "flex",
    justifyContent: "center",
    alignItems: "baseline",
  },
  globe:{
    fontSize: 400,
    color: "rgba(0, 0, 0, 0.08)",
    
  },
  inputs: {
    marginLeft: "20%", 
    marginTop: "3%",
  },
  button: {
    width:"95%",
    marginLeft:"5px"
  },
}));

export default function SubjectInput({ subjects, setSubjects }) {
  const classes = useStyles();

  const [title, setTitle] = React.useState("");
  const [code, setCode] = React.useState("");
  const [contactHrs, setcontantHrs] = React.useState("");
  const [creditHrs, setcreditHrs] = React.useState("");

  const [titleError, setTitleError] = React.useState("");
  const [codeError, setCodeError] = React.useState("");
  const [contantHrsError, setcontantHrsError] = React.useState("");

  const titleChange = (event) => {
    setTitle(event.target.value);
  };
  const codeChange = (event) => {
    setCode(event.target.value);
  };
  const contacthrsChange = (event) => {
    setcontantHrs(event.target.value);
    setcreditHrs(event.target.value);
  };
  const setRequiredError = () => {
    !title ? setTitleError("Required") : setTitleError("");
    !code ? setCodeError("Required") : setCodeError("");
    !contactHrs ? setcontantHrsError("Required") : setcontantHrsError("");
  };
  const setEmptyTextfields = () => {
    setTitle("");
    setCode("");
    setcontantHrs("");
    setcreditHrs("");

    setTitleError("");
    setCodeError("");
    setcontantHrsError("");
  };
  const addButton = () => {
    let temp = [...subjects];
    if (title && code && contactHrs && creditHrs) {
      if (creditHrs <= contactHrs) {
        if (temp) {
          if (temp.findIndex((e) => e[1] === code) === -1)
            temp.push([title, code, contactHrs, creditHrs]);
          else {
            setRequiredError();
            setCodeError("Subject already exists");
            return;
          }
        } else temp = [[title, code, contactHrs, creditHrs]];
        setSubjects(temp, docs.subjects);
        setEmptyTextfields();
      } else {
        setcontantHrsError("CreditHrs can't exceed contactHrs");
      }
    } else {
      setRequiredError();
    }
  };
  return (
    <Card className={classes.root}>
      <div className={classes.inputs}>
      <h3>{strings.add_subject_title}</h3>
      <div>
        <TextField
          className={!titleError ? classes.textField : ""}
          onChange={titleChange}
          value={title}
          required
          id="course-title"
          label="Naslov"
          variant="outlined"
          error={!!titleError}
          helperText={titleError}
        />
      </div>
      <div>
        <TextField
          required
          className={!codeError ? classes.textField : ""}
          value={code}
          onChange={codeChange}
          id="course-code"
          label="Kod predmeta"
          variant="outlined"
          error={!!codeError}
          helperText={codeError}
        />
      </div>
      <div className={classes.hours}>
       
        <TextField
          type="number"
          className={!contantHrsError ? classes.hrs : ""}
          id="contact-hours"
          label="Broj sati"
          select
          required
          error={!!contantHrsError}
          helperText={contantHrsError}
          onChange={contacthrsChange}
          value={contactHrs}
          onKeyDown={(e) => {
            if (e.keyCode === 13) addButton();
          }}
          InputLabelProps={{
            shrink: true,
          }}
          variant="outlined"
        >
          {[1, 2, 3, 4, 5].map((option) => (
            <MenuItem key={option} value={option}>
              {option}
            </MenuItem>
          ))}
        </TextField>
      </div>
      <Button
        className={classes.button}
        variant="contained"
        color="primary"
        size="medium"
        onClick={addButton}
      >
        {strings.add_subject_button}
      </Button>
      </div>
      <div>
        <i className={`fa-solid fa-globe ${classes.globe}`}></i>
      </div>
    </Card>
  );
}
