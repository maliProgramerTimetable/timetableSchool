import React from "react";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import { strings } from "../translation/strings";
import Paper from "@material-ui/core/Paper";

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: "#0052bc",
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
   // border: "1px solid black",
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

const useStyles = makeStyles((theme) => ({
  root: {
    margin: theme.spacing(2),
  },
  table: {
    minWidth: 360,
  },
  section: {
    fontWeight: "bold",
    fontSize: 18,
  }
}));

const weekDays = ["PON  ", "UTO", "SRI", "ČET", "PET", "SUB"];

export default function Timetable({ timeTable, section }) {
  const classes = useStyles();

  return (
    <TableContainer className={classes.root} component={Paper}>
      <Table className={classes.table} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell key={"sec" + section} className={classes.section} >
              {section}
            </StyledTableCell>
            {timeTable ? (
              timeTable[0]?.map((day, i) => (
                <StyledTableCell key={"lectures" + section + i} align="left">
                  Čas: {i + 1}
                </StyledTableCell>
              ))
            ) : (
              <StyledTableCell key={"lectures" + section}></StyledTableCell>
            )}
          </TableRow>
        </TableHead>
        <TableBody>
          {timeTable?.map((row, i) => (
            <StyledTableRow key={i + section}>
              <StyledTableCell
                key={weekDays[i] + section}
                component="th"
                scope="column"
              >
                {weekDays[i]}
              </StyledTableCell>
              {row.map((r, j) => (
                <StyledTableCell key={r + j + section} align="left">
                  {r ? r : strings.free_label}
                </StyledTableCell>
              ))}
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
