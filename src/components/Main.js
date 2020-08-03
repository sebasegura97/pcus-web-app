import { useMutation, useQuery } from "@apollo/react-hooks";
import { IconButton, makeStyles, Snackbar } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import Alert from "@material-ui/lab/Alert";
import React from "react";
import { SET_SNACKBAR } from "../gql/mutations/snackbar";
import { SNACKBAR_STATUS } from "../gql/queries/snackbar";

const useStyles = makeStyles(theme => ({
  content: {
    width: "100%",
    height: "auto",
    position: "relative",
    background: "white"
  }
}));


const Main = props => {
  const classes = useStyles();

  const { data } = useQuery(SNACKBAR_STATUS);

  const [closeSnackbar] = useMutation(SET_SNACKBAR, { variables: { open: false }})

  const handleCloseSnackbar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    closeSnackbar();
  };

  if (data) {
    const snackbar = data.snackbarStatus;
    return (
      <div className={classes.content}>
        {props.children}
        <Snackbar 
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "right"
          }}
          open={snackbar.open}
          autoHideDuration={6000}
          onClose={handleCloseSnackbar}
          action={
            <IconButton
              size="small"
              aria-label="close"
              color="inherit"
              onClick={handleCloseSnackbar}
            >
              <CloseIcon fontSize="small" />
            </IconButton>
          }
        >
          <Alert elevation={6} variant="filled" severity={snackbar.severity}>
            {snackbar.message}
          </Alert>
        </Snackbar>
      </div>
    )
  } else {
    return null
  }
};

Main.propTypes = {};

export default Main;
