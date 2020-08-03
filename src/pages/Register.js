import React from "react";
import { useHistory } from "react-router-dom";
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
import { REGISTER_USER } from "../gql/mutations/auth";
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
  const [disableSubmit, setDisableSubmit] = React.useState(false)
  const [snackbar, setSnackbar] = React.useState({
    open: false,
    severity: "error",
    message: "",
  });

  const initialValues = {
    email: "",
    name: "",
    lastname: "",
    password: "",
    repeatPassword: "",
  };

  const handleSubmit = (e) => {
    console.log("values", values);
    // let variables = values;
    // delete variables.repeatPassword;
    register({
      variables: {
        email: values.email,
        name: values.name,
        lastname: values.lastname,
        password: values.password,
        role: "PROPONENTE",
      },
    });
  };

  const { onChange, onSubmit, values } = useForm(handleSubmit, initialValues);

  const [register, { loading, data }] = useMutation(REGISTER_USER, {
    onCompleted(data) {
      const ok = data.register.ok;
      setDisableSubmit(ok)
      const message = ok
        ? "Se ha registrado exitosamente, por favor inicie sesion"
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
    <div  className={classes.root}>
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
              <Typography
                variant="subtitle2"
                align="center"
                color="textPrimary"
                style={{ marginBottom: 70 }}
              >
                Sistema de gestion del procedimiento para cambio de usos del
                suelo.
              </Typography>
              <Typography variant="h6" align="center" color="primary">
                REGISTRARSE
              </Typography>
              <Typography
                variant="subtitle2"
                align="center"
                color="textSecondary"
              >
                Para registrarse como proponente de plan de cambio de uso de
                suelo complete el siguiente formulario.
              </Typography>
            </Grid>
            <Grid item xs={12} sm={12}>
              <TextValidator
                placeholder="Email"
                variant="outlined"
                fullWidth
                label="Email"
                validators={["required", "isEmail"]}
                errorMessages={[
                  "Este campo es requerido",
                  "Ingrese una direccion de email valida",
                ]}
                type="email"
                value={values.email}
                name="email"
                onChange={onChange}
                className={classes.input}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextValidator
                placeholder="Nombre"
                variant="outlined"
                fullWidth
                label="Nombre"
                validators={["required"]}
                errorMessages={["Este campo es requerido"]}
                value={values.name}
                name="name"
                onChange={onChange}
                className={classes.input}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextValidator
                placeholder="Apellido"
                variant="outlined"
                fullWidth
                label="Apellido"
                validators={["required"]}
                errorMessages={["Este campo es requerido"]}
                value={values.lastname}
                name="lastname"
                onChange={onChange}
                className={classes.input}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextValidator
                placeholder="Contraseña"
                variant="outlined"
                fullWidth
                label="Contraseña"
                validators={["required"]}
                errorMessages={["Ingrese contraseña"]}
                type="contraseña"
                value={values.password}
                name="password"
                type="password"
                onChange={onChange}
                className={classes.input}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
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
                Registrarse
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
