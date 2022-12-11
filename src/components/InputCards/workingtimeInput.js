import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { TextField, Card, Button, MenuItem } from "@material-ui/core";
import docs from "../../constants/docs";
import { strings } from "../../translation/strings";

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: "100px",
    margin: 10,
    borderRadius: 20,
  },
  content: {
    display: "flex",
    justifyContent: "space-between",
  },
  inputs: {
    marginLeft: "20%",
    marginTop: "3%",
  },
  icon: {
    fontSize: 400,
    color: "rgba(0, 0, 0, 0.1)",
    margin: "20px",
  },
  textField: {
    margin: 5,
    width: 250,
  },
  button: {
    margin: 5,
    width: 250,
    height: 50,
  },
}));

export default function WorkingtimeInput({
  workingTime,
  setworkingTime,
  sections,
}) {
  const classes = useStyles();

  const [day, setday] = useState("");
  const [period, setperiod] = useState("");

  const [dayError, setdayError] = useState("");
  const [periodError, setperiodError] = useState("");

  const dayChange = (event) => {
    setday(event.target.value);
  };

  const periodChange = (event) => {
    setperiod(event.target.value);
  };

  const setRequiredError = () => {
    !day ? setdayError("Required") : setdayError("");
    !period ? setperiodError("Required") : setperiodError("");
  };

  const setEmptyTextfields = () => {
    setday("");
    setperiod("");

    setdayError("");
    setperiodError("");
  };

  const addButton = () => {
    if (day && period) {
      let temp = { ...workingTime };
      temp[day] = period;
      setworkingTime(temp, docs.workingTime);

      setEmptyTextfields();
    } else setRequiredError();
  };

  return (
    <Card className={classes.root}>
      <div className={classes.content}>
        <div className={classes.inputs}>
          <h3 style={{ textAlign: "left" }}>
            {strings.working_days_periods_label}
          </h3>
          <div>
            <TextField
              type="number"
              className={classes.textField}
              id="day"
              label="Dan"
              select
              required
              error={!!dayError}
              helperText={dayError}
              onChange={dayChange}
              value={day}
              InputLabelProps={{
                shrink: true,
              }}
              variant="outlined"
            >
              {Object.entries(workingTime)
                .filter((e) => e[1] === 0)
                .map((option) => (
                  <MenuItem key={option[0]} value={option[0]}>
                    {option[0]}
                  </MenuItem>
                ))}
            </TextField>
          </div>

          <div>
            <TextField
              type="number"
              className={classes.textField}
              id="periods"
              label="Br časova"
              select
              required
              error={!!periodError}
              helperText={periodError}
              onChange={periodChange}
              value={period}
              onKeyDown={(e) => {
                if (e.keyCode === 13) addButton();
              }}
              InputLabelProps={{
                shrink: true,
              }}
              variant="outlined"
            >
              {[1, 2, 3, 4, 5, 6, 7].map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </TextField>
          </div>
          <div>
            <TextField
              type="number"
              className={classes.textField}
              id="days"
              label="Br razreda"
              select
              required
              value={sections.length}
              onKeyDown={(e) => {
                if (e.keyCode === 13) addButton();
              }}
              InputLabelProps={{
                shrink: true,
              }}
              variant="outlined"
            >
              {
                <MenuItem key={"rooms"} value={sections.length}>
                  {sections.length}
                </MenuItem>
              }
            </TextField>
          </div>
          <Button
            className={classes.button}
            variant="contained"
            color="primary"
            size="medium"
            onClick={addButton}
          >
            {strings.working_days_button}
          </Button>
        </div>
        <div>
          <i className={`fa-solid fa-calendar-days ${classes.icon}`}></i>
        </div>
      </div>
    </Card>
  );
}
