import React from "react";
import { Typography, Grid, Divider, CircularProgress } from "@material-ui/core";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import { useLazyQuery } from "@apollo/react-hooks";
import { GET_STATISTICS } from "../gql/queries/procedure";
import moment from "moment";

function Statistic({ title, description, mas300, menos300, unit }) {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "row",
        justifyContent: "right",
        alignItems: "center",
        padding: 16,
        boxShadow:
          "0px 2px 1px -1px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 1px 3px 0px rgba(0,0,0,0.12)",
      }}
    >
      <div style={{ paddingRight: 16, width: "60%" }}>
        <Typography
          variant="h6"
          color="primary"
          style={{ textTransform: "uppercase", fontSize: 14 }}
        >
          {title}
        </Typography>
        <Typography variant="subtitle2" color="textSecondary">
          {description}
        </Typography>
      </div>
      <div
        style={{
          // width: "30%",
          borderLeft: "1px solid rgba(0,0,0,0.25)",
          margin: "auto",
          width: "40%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          padding: 16,
        }}
      >
        <Typography variant="overline" align="left" color="textSecondary">
          MENOS 300HA:{" "}
          <strong style={{ color: "#FF5722" }}>
            {" "}
            {menos300} {unit}
          </strong>
        </Typography>
        <Typography variant="overline" align="left" color="textSecondary">
          MAS 300HA:{" "}
          <strong style={{ color: "#FF5722" }}>
            {" "}
            {mas300} {unit}
          </strong>
        </Typography>
      </div>
    </div>
  );
}

export default function Statistics() {
  const [from, setFrom] = React.useState(() => {
    const now = moment();
    return moment([now.year(), now.month(), 1]);
  });

  const [to, setTo] = React.useState(moment());

  const [getStatistics, { data: statistics }] = useLazyQuery(GET_STATISTICS);

  React.useEffect(() => {
    if (moment(to).isAfter(moment(from))) {
      getStatistics({
        variables: {
          from: moment(from).format("DD/MM/YYYY"),
          to: moment(to).format("DD/MM/YYYY"),
        },
      });
    }
  }, [from, to]);

  const handleChangeFrom = (date) => {
    setFrom(moment(date));
  };

  const handleChangeTo = (date) => {
    setTo(moment(date));
  };

  if (statistics) {
    return (
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography variant="h4" color="primary">
            ESTADISTICAS
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <KeyboardDatePicker
              margin="none"
              label="Desde"
              format="dd/MM/yyyy"
              value={from}
              onChange={handleChangeFrom}
              KeyboardButtonProps={{
                "aria-label": "desde",
              }}
            />
          </MuiPickersUtilsProvider>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <KeyboardDatePicker
              margin="none"
              label="Hasta"
              format="dd/MM/yyyy"
              value={to}
              onChange={handleChangeTo}
              KeyboardButtonProps={{
                "aria-label": "desde",
              }}
            />
          </MuiPickersUtilsProvider>
        </Grid>
        <Grid item xs={12}>
          <Divider />
        </Grid>
        {statistics.getStatistics.map((item, index) => (
          <Grid item xs={6} key={index}>
            <Statistic
              title={item.name}
              description={item.description}
              mas300={item.valueMoreThan300}
              menos300={item.valueLessThan300}
              unit={item.unit}
            />
          </Grid>
        ))}
      </Grid>
    );
  } else {
    return <CircularProgress />;
  }
}
