import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { TextField, Card, Button } from "@material-ui/core";
import docs from "../../constants/docs";
import { strings } from "../../translation/strings";

const useStyles = makeStyles((theme) => ({
  root: {
    // minWidth: 275,
    borderRadius: 20,
    margin: 10,
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
  inputs: {
    marginLeft: "20%", 
    marginTop: "3%",
  },
  button: {
    width:"95%",
    marginLeft:"5px",
    marginTop: "10px",
    height: "50px",
  },  
  icon: {
    fontSize: 300,
    color: "#e0e0e0",
    marginTop: "30px",
    margin: "20px",
  },
}));

export default function SectionInput({ sections, setSections }) {
  const classes = useStyles();

  const [title, setTitle] = React.useState("");
  const [code, setCode] = React.useState("");

  const [titleError, setTitleError] = React.useState("");
  const [codeError, setCodeError] = React.useState("");

  const titleChange = (event) => {
    setTitle(event.target.value);
  };
  const codeChange = (event) => {
    setCode(event.target.value);
  };

  const setRequiredError = () => {
    !title ? setTitleError("Required") : setTitleError("");
    !code ? setCodeError("Required") : setCodeError("");
  };

  const setEmptyTextfields = () => {
    setTitle("");
    setCode("");

    setTitleError("");
    setCodeError("");
  };
  const addButton = () => {
    let temp = [...sections];
    if (title && code) {
      if (temp) {
        if (temp.findIndex((e) => e[1] === code) === -1)
          temp.push([title, code]);
        else {
          setRequiredError();
          setCodeError("Subject already exists");
          return;
        }
      } else temp = [[title, code]];

      setSections(temp, docs.sections);
      setEmptyTextfields();
    } else {
      setRequiredError();
    }
  };
  return (
    <Card className={classes.root}>
      <div className={classes.inputs}>
        <h3>{strings.add_section_title}</h3>
        <div>
          <TextField
            className={classes.textField}
            required
            id="class-title"
            label="Naziv razreda"
            variant="outlined"
            value={title}
            onChange={titleChange}
            error={!!titleError}
            helperText={titleError}
          />
        </div>
        <div>
          <TextField
            required
            className={classes.textField}
            id="class-code"
            label="Kod razreda"
            variant="outlined"
            error={!!codeError}
            helperText={codeError}
            value={code}
            onChange={codeChange}
            onKeyDown={(e) => {
              if (e.keyCode === 13) addButton();
            }}
          />
        </div>
        <div>
          <Button
            className={classes.button}
            variant="contained"
            color="primary"
            size="medium"
            onClick={addButton}
          >
            {strings.add_section_button}
          </Button>
        </div>
      </div>
      <div>
        <i className={`fa-solid fa-chalkboard-user ${classes.icon}`} />
      </div>
    </Card>
  );
}
