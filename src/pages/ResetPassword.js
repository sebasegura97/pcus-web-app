import React from "react";
import { useHistory, useParams } from "react-router-dom";
import {
  Grid,
  Fade,
  makeStyles,
  Button,
  Typography,
  Snackbar,
} from "@material-ui/core";
import MuiAlert from "@material-ui/lab/Alert";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import { useMutation } from "@apollo/react-hooks";
import { useForm } from "../utilities/useForm";
import { CHANGE_USER_PASSWORD } from "../gql/mutations/auth";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    display: "flex",
    justifyContent: "center",
  },
  formContainer: {
    marginTop: 36,
    width: "80vw",
    [theme.breakpoints.up("sm")]: {
      width: "40vw",
    },
  },
  buttonContainer: {
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "flex-end",
    flexDirection: "column",
  },
}));

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default function Register() {
  const history = useHistory();
  const classes = useStyles();
  const [disableSubmit, setDisableSubmit] = React.useState(false);
  const [snackbar, setSnackbar] = React.useState({
    open: false,
    severity: "error",
    message: "",
  });
  const { userId, token } = useParams();
  const initialValues = {
    password: "",
    repeatPassword: "",
  };

  const handleSubmit = () => {
    changePassword({
      variables: {
        newPassword: values.password,
        userId,
        token
      },
    });
  };

  const { onChange, onSubmit, values } = useForm(handleSubmit, initialValues);

  const [changePassword, { loading }] = useMutation(CHANGE_USER_PASSWORD, {
    onCompleted(data) {
      const ok = data.changeUserPassword;
      setDisableSubmit(ok);
      const message = ok
        ? "Se ha cambiado la contraseña exitosamente, por favor inicie sesión con su nueva contraseña."
        : data.register.message;
      const severity = ok ? "success" : "error";
      setSnackbar({ message, severity, open: true });
    },
  });

  ValidatorForm.addValidationRule("isPasswordMatch", (value) => {
    if (value !== values.password) {
      return false;
    }
    return true;
  });

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  return (
    <div className={classes.root}>
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
        <Alert onClose={handleCloseSnackbar} severity={snackbar.severity}>
          {snackbar.message}
        </Alert>
      </Snackbar>
      <Fade in={true} mountOnEnter unmountOnExit>
        <ValidatorForm onSubmit={onSubmit}>
          <Grid
            className={classes.formContainer}
            container
            spacing={2}
            justify="flex-end"
          >
            <Grid item xs={12}>
              <Typography variant="h2" align="center" color="primary">
                PCUS
              </Typography>
              <Typography variant="h6" align="center" color="primary">
                REESTABLECER CONTRASEÑA
              </Typography>
            </Grid>
            <Grid item xs={12} sm={12}>
              <TextValidator
                placeholder="Nueva contraseña"
                variant="outlined"
                fullWidth
                label="Nueva contraseña"
                validators={["required"]}
                errorMessages={["Ingrese su nueva contraseña"]}
                value={values.password}
                name="password"
                type="password"
                onChange={onChange}
                className={classes.input}
              />
            </Grid>
            <Grid item xs={12} sm={12}>
              <TextValidator
                placeholder="Repetir contraseña"
                variant="outlined"
                fullWidth
                label="Repetir contraseña"
                validators={["required", "isPasswordMatch"]}
                errorMessages={[
                  "Repita la contraseña",
                  "Las contraseñas no coiciden",
                ]}
                type="contraseña"
                value={values.repeatPassword}
                name="repeatPassword"
                type="password"
                onChange={onChange}
                className={classes.input}
              />
            </Grid>
            <Grid item xs={12} className={classes.buttonContainer}>
              <Button
                variant="contained"
                color="secondary"
                type="submit"
                disabled={loading || disableSubmit}
              >
                CAMBIAR CONTRASEÑA
              </Button>
              <Button
                variant="text"
                color="inherit"
                onClick={() => history.push("/login")}
                size="small"
              >
                Iniciar sesión
              </Button>
            </Grid>
          </Grid>
        </ValidatorForm>
      </Fade>
    </div>
  );
}
