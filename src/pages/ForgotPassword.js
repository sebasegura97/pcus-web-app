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
import {
  REGISTER_USER,
  SEND_CHANGE_PASSWORD_EMAIL,
} from "../gql/mutations/auth";
import { SET_SNACKBAR } from "../gql/mutations/snackbar";

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
  const initialValues = {
    email: ""
  };

  const handleSubmit = (e) => {
    sendChangePasswordEmail({
      variables: {
        email: values.email,
      },
    });
  };

  const { onChange, onSubmit, values } = useForm(handleSubmit, initialValues);

  const [sendChangePasswordEmail, { loading, data }] = useMutation(
    SEND_CHANGE_PASSWORD_EMAIL,
    {
      onCompleted(data) {
        const ok = data.sendChangePasswordEmail;
        setDisableSubmit(ok);
        const message = ok
          ? `Se ha enviado un email a ${values.email}, por favor chequee la casilla para ver las instrucciones.`
          : data.register.message;
        const severity = ok ? "success" : "error";
        setSnackbar({ message, severity, open: true });
      },
    }
  );

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
        <ValidatorForm onSubmit={handleSubmit}>
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
              <Typography
                variant="subtitle2"
                align="center"
                color="textSecondary"
              >
                Para reestablecer su contraseña ingresa la dirección de email 
                con la que se registró. Le enviaremos un email con las instrucciones.
              </Typography>
            </Grid>
            <Grid item xs={12} sm={12}>
              <TextValidator
                fullWidth
                placeholder="Email"
                label="Email"
                type="email"
                name="email"
                variant="outlined"
                validators={["required", "isEmail"]}
                errorMessages={[
                  "Este campo es requerido",
                  "Ingrese una direccion de email valida",
                ]}
                value={values.email}
                onChange={onChange}
              />
            </Grid>
            <Grid item xs={12} className={classes.buttonContainer}>
              <Button
                variant="contained"
                color="secondary"
                type="submit"
                disabled={loading || disableSubmit}
              >
                Enviar instrucciones
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
