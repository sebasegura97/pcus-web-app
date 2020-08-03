import React from "react";
import { useHistory, Link } from "react-router-dom";
import { Grid, Fade, makeStyles, Button, Typography } from "@material-ui/core";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import { useMutation } from "@apollo/react-hooks";
import { LOGIN_MUTATION } from "../gql/mutations/auth";
import { IS_LOGGED_IN } from "../gql/queries/auth";
import { GET_CURRENT_USER } from "../gql/queries/users";

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

export default function Login() {
  const classes = useStyles();
  const history = useHistory();

  const [login] = useMutation(LOGIN_MUTATION, {
    onCompleted({ login }) {
      const { ok, token, refreshToken, errors } = login;
      if (ok) {
        localStorage.setItem("token", token);
        localStorage.setItem("refreshToken", refreshToken);
        window.location.reload();
      }
      if (errors) {
        setErrors(errors);
      }
    },
    update(cache, { data: result }) {
      console.log("result", result);
      if (result.login.ok) {
        cache.writeQuery({
          query: IS_LOGGED_IN,
          data: {
            isLoggedIn: result.login.ok,
          },
        });
        cache.writeQuery({
          query: GET_CURRENT_USER,
          data: {
            me: result.login.user,
          },
        });
      }
    },
  });

  const [values, setValues] = React.useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = React.useState([]);

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    login({ variables: values });
  };

  return (
    <div className={classes.root}>
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
                INICIO DE SESION
              </Typography>
              <Typography
                variant="subtitle2"
                align="center"
                color="textSecondary"
              >
                Para iniciar sesión ingrese email y contraseña. Si no dispone de
                uno este debe ser generado en la Secretaría de Ambiente de la
                provincia de salta.
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
                onChange={handleChange}
                className={classes.input}
              />
            </Grid>
            <Grid item xs={12} sm={12}>
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
                helperText={<Link to="/forgot-password">Ha olvidado su contraseña?</Link>}
                onChange={handleChange}
                className={classes.input}
              />
            </Grid>
            {errors.length ? (
              <Grid item xs={12} style={{ textAlign: "right" }}>
                {errors.map((error) => (
                  <Typography color="error" align="center" variant="overline">
                    {error.message}
                  </Typography>
                ))}
              </Grid>
            ) : null}
            <Grid item xs={12} className={classes.buttonContainer}>
              <Button variant="contained" color="secondary" type="submit">
                Iniciar sesion
              </Button>
              <Button
                variant="text"
                color="inherit"
                onClick={() => history.push("/register")}
                size="small"
              >
                Registrarse
              </Button>
            </Grid>
          </Grid>
        </ValidatorForm>
      </Fade>
    </div>
  );
}
