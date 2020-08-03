import React from "react";
import WarningRoundedIcon from "@material-ui/icons/WarningRounded";
import { Typography, Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { CheckCircleOutline } from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
  container: {
    maxWidth: 600,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    marginTop: theme.spacing(4),
  },
  icon: {
    fontSize: 94,
  },
  message: {
    marginTop: 16,
    marginBottom: 16,
  },
}));

export default function FormFeedback({ message, ok, children }) {
  const classes = useStyles();
  return (
    <div className={classes.container}>
      {ok ? (
        <CheckCircleOutline color="primary" className={classes.icon} />
      ) : (
        <WarningRoundedIcon color="error" className={classes.icon} />
      )}
      <Typography
        className={classes.message}
        color="textSecondary"
        variant="subtitle1"
        align="center"
      >
        {message}
      </Typography>
      <Grid container justify="flex-end">
        {children}
      </Grid>
    </div>
  );
}
