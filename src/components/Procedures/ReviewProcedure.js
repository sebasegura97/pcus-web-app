import {
  Divider,
  Grid,
  Typography,
  FormGroup,
  FormControlLabel,
  Checkbox,
  makeStyles,
  IconButton,
  TextField,
  Button,
} from "@material-ui/core";
import React from "react";
import RequisitosJuridicos from "../../components/Forms/RequisitosJuridicos";
import { useQuery } from "@apollo/react-hooks";
import { useParams } from "react-router-dom";
import RequisitosTecnicos from "../Forms/RequisitosTecnicos";
import { Close as CloseIcon } from "@material-ui/icons";
import ViewListIcon from "@material-ui/icons/ViewList";
import RevisarRequisitosJuridicos from "../Forms/RevisarRequisitosJuridicos";
import RevisarRequisitosTecnicos from "../Forms/RevisarRequisitosTecnicos";
import ProcedureState from "./ProcedureState";
import { GET_CURRENT_USER } from "../../gql/queries/users";

const useStyles = makeStyles({
  buttonsContainer: {
    maxWidth: 600,
    margin: "auto",
  },
  button: {
    boxShadow:
      "0px 2px 1px -1px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 1px 3px 0px rgba(0,0,0,0.12)",
    borderRadius: 4,
    paddingRight: 16,
    paddingLeft: 16,
    paddingTop: 32,
    paddingBottom: 32,
    textAlign: "center",
    transition: ".3s",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    "&:hover": {
      cursor: "pointer",
      backgroundColor: "#00796B",
      color: "white",
      transition: ".3s",
    },
  },
  viewListIcon: {
    fontSize: 36,
    marginBottom: 8,
  },
  closeButtonContainer: {
    maxWidth: 600,
    display: "flex",
    justifyContent: "flex-end",
    marginRight: "auto",
    marginLeft: "auto",
  },
});

const ReviewProcedure = () => {
  const { id } = useParams();
  const classes = useStyles();
  const [form, setForm] = React.useState(null);
  const { data: user } = useQuery(GET_CURRENT_USER);

  return (
    <>
      {user && ["CONTROL_TECNICO", "CONTROL_JURIDICO"].includes(user.me.role) && (
        <Grid container spacing={2} justify="center">
          <Grid item xs={12}>
            <Typography variant="h5" align="center" color="primary">
              REVISAR DATOS DEL PROCEDIMIENTO <strong> NRO. {id} </strong>
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="subtitle1" align="center">
              Aqui puede revisar los datos ingresados por el proponente.
            </Typography>
            <Typography variant="subtitle2" align="center">
              Aqui podrá visualizar los mismos formularios ingresados por el
              proponente con el objetivo de: aprobar el procedimiento, solicitar
              revision del proponente en determinados campos o rechazar el
              procedimiento.
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Divider style={{ marginBottom: 16 }} />
          </Grid>
        </Grid>
      )}

      {form === null && (
        <Grid
          container
          spacing={4}
          alignContent="center"
          justify="center"
          className={classes.buttonsContainer}
        >
          {user && user.me.role === "CONTROL_JURIDICO" && (
            <Grid item xs={6}>
              <div
                className={classes.button}
                onClick={() => setForm("REQUISITOS JURIDICOS")}
              >
                <ViewListIcon
                  className={classes.viewListIcon}
                  color="inherit"
                />
                <Typography variant="button" color="inherit">
                  REVISAR DATOS <strong>JURIDICOS</strong> INGRESADOS
                </Typography>
              </div>
            </Grid>
          )}

          {user && user.me.role === "CONTROL_TECNICO" && (
            <Grid item xs={6}>
              <div
                className={classes.button}
                onClick={() => setForm("REQUISITOS TECNICOS")}
              >
                <ViewListIcon
                  className={classes.viewListIcon}
                  color="inherit"
                />
                <Typography variant="button" color="inherit">
                  REVISAR DATOS <strong>TECNICOS</strong> INGRESADOS
                </Typography>
              </div>
            </Grid>
          )}
        </Grid>
      )}

      {user && user.me.role === "ADMINISTRADOR" && (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <ProcedureState procedureId={id} />
          <RequisitosJuridicos procedureId={id} readOnly />
          <RequisitosTecnicos procedureId={id} readOnly />
        </div>
      )}

      {form !== null && (
        <div className={classes.closeButtonContainer}>
          <IconButton onClick={() => setForm(null)}>
            <CloseIcon />
          </IconButton>
        </div>
      )}

      {form === "REQUISITOS JURIDICOS" && (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <RequisitosJuridicos procedureId={id} readOnly />
          <RevisarRequisitosJuridicos
            procedureId={id}
            requisitosJuridicos={true}
            requisitosFisicos={true}
          />
        </div>
      )}

      {form === "REQUISITOS TECNICOS" && (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <RequisitosTecnicos procedureId={id} readOnly />
          <RevisarRequisitosTecnicos
            procedureId={id}
            requisitosTecnicos={true}
          />
        </div>
      )}
    </>
  );
};

ReviewProcedure.propTypes = {};

export default ReviewProcedure;
