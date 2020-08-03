import React from "react";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import CancelIcon from "@material-ui/icons/Cancel";
import WatchLaterIcon from "@material-ui/icons/WatchLater";
import {
  Grid,
  Typography,
  IconButton,
  Tooltip,
  Divider,
  makeStyles,
} from "@material-ui/core";

const useStyles = makeStyles({
  container: {
    boxShadow: "-2px 2px 4px rgba(0,0,0, .25)",
    borderRadius: 4,
    padding: 8,
    boxSizing: "border-box",
  },
});

export default function RequirementChecker({
  onAccept,
  onReject,
  onWatchLater,
  title,
  description,
  value,
  prevValue,
}) {
  const classes = useStyles();
  return (
    <Grid
      container
      justify="space-between"
      alignContent="center"
      className={classes.container}
      spacing={2}
    >
      <Grid item xs={12} sm={8}>
        <Typography variant="h6">{title.toUpperCase()}</Typography>
        <Divider style={{ marginTop: 4, marginBottom: 8 }} />
        <Typography variant="body1" color="textSecondary">
          {description}
        </Typography>
      </Grid>
      <Grid
        item
        xs={12}
        sm={4}
        style={{
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "center",
        }}
      >
        {Boolean(prevValue) ? (
          <Typography variant="button" color="primary">APROBADO</Typography>
        ) : (
          <>
            <IconButton
              disabled={Boolean(prevValue)}
              onClick={onAccept}
              color={value === true ? "primary" : "default"}
            >
              <Tooltip title="Aprobar requisito">
                <CheckCircleIcon fontSize="large" />
              </Tooltip>
            </IconButton>
            <IconButton
              disabled={Boolean(prevValue)}
              onClick={onWatchLater}
              style={{
                color: value === null ? "#EEAE26" : "rgba(0, 0, 0, 0.54)",
              }}
            >
              <Tooltip title="Evaluar mas tarde">
                <WatchLaterIcon fontSize="large" />
              </Tooltip>
            </IconButton>
            <IconButton
              disabled={Boolean(prevValue)}
              onClick={onReject}
              style={{ color: value === false ? "red" : "rgba(0, 0, 0, 0.54)" }}
            >
              <Tooltip title="Rechazar requisito">
                <CancelIcon fontSize="large" />
              </Tooltip>
            </IconButton>
          </>
        )}
      </Grid>
    </Grid>
  );
}
