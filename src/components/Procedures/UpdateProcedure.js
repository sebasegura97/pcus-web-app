import {
  Divider,
  Grid,
  Typography,
  Card,
  CardContent,
  makeStyles,
  IconButton,
  CircularProgress,
} from "@material-ui/core";
import React from "react";
import RequisitosJuridicos from "../../components/Forms/RequisitosJuridicos";
import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/react-hooks";
import { GET } from "../../gql/queries/procedure";
import RequisitosTecnicos from "../Forms/RequisitosTecnicos";
import EditIcon from "@material-ui/icons/Edit";
import { Close as CloseIcon, Feedback } from "@material-ui/icons";
import FormFeedback from "../FormFeedback";
import ProcedureState from "./ProcedureState";

const useStyles = makeStyles((theme) => ({
  buttonsContainer: {
    maxWidth: 600,
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
  editIcon: {
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
  procedureStateContainer: {
    justifyContent: "center",
    display: "flex",
  },
  accentText: {
    color: "#00796B",
  },
}));

const UpdateProcedure = () => {
  const { id } = useParams();
  const classes = useStyles();
  const [form, setForm] = React.useState(null);
  const [formResponse, setFormResponse] = React.useState({});
  const { data } = useQuery(GET, {
    variables: { id },
  });

  const formSubmitCallback = (data) => {
    console.log(data);
    setForm("FEEDBACK");
    setFormResponse(data);
  };
  if (form === "FEEDBACK") {
    return (
      <Grid container justify="center">
        <FormFeedback ok={formResponse.ok} message={formResponse.message} />
      </Grid>
    );
  } else if (data) {
    const procedure = data.procedures.procedures[0];
    if (procedure.estado === "ESPERANDO CORRECCION") {
      return (
        <Grid container spacing={2} justify="center">
          <Grid item xs={12}>
            <Typography
              style={{ maxWidth: 600, margin: "auto" }}
              variant="h6"
              align="center"
              color="primary"
            >
              DEBAJO PUEDE ACTUALIZAR LOS DATOS INGRESADOS PARA EFECTUAR
              CORRECCIONES
            </Typography>
          </Grid>

          {form === null && (
            <Grid
              container
              spacing={4}
              justify="center"
              className={classes.buttonsContainer}
            >
              {!procedure.reviews[0].requisitosJuridicos ||
                (!procedure.reviews[0].requisitosFisicos && (
                  <Grid item xs={6}>
                    <div
                      className={classes.button}
                      onClick={() => setForm("REQUISITOS JURIDICOS")}
                    >
                      <EditIcon className={classes.editIcon} color="inherit" />
                      <Typography variant="button" color="inherit">
                        ACTUALIZAR REQUISITOS <strong>JURIDICOS</strong>
                      </Typography>
                    </div>
                  </Grid>
                ))}
              {!procedure.reviews[0].requisitosTecnicos && (
                <Grid item xs={6}>
                  <div
                    className={classes.button}
                    onClick={() => setForm("REQUISITOS TECNICOS")}
                  >
                    <EditIcon className={classes.editIcon} color="inherit" />
                    <Typography variant="button" color="inherit">
                      ACTUALIZAR REQUISITOS <strong>TECNICOS</strong>
                    </Typography>
                  </div>
                </Grid>
              )}
            </Grid>
          )}

          {form !== null && (
            <Grid item xs={12}>
              <div className={classes.closeButtonContainer}>
                <IconButton onClick={() => setForm(null)}>
                  <CloseIcon />
                </IconButton>
              </div>
            </Grid>
          )}

          {form === "REQUISITOS JURIDICOS" && (
            <RequisitosJuridicos
              onCompleted={formSubmitCallback}
              procedureId={id}
              readOnly={false}
            />
          )}

          {form === "REQUISITOS TECNICOS" && (
            <RequisitosTecnicos
              onCompleted={formSubmitCallback}
              procedureId={id}
              readOnly={false}
            />
          )}

          <Grid item xs={12}>
            <Divider style={{ marginTop: 24 }} />
          </Grid>
          <Grid item xs={12}>
            <Typography
              style={{ maxWidth: 600, margin: "auto" }}
              variant="h6"
              align="center"
              color="primary"
            >
              VER ESTADO DEL PROCEDIMIENTO
            </Typography>
          </Grid>
          <Grid item xs={12} className={classes.procedureStateContainer}>
            <ProcedureState procedureId={id} />
          </Grid>
        </Grid>
      );
    } else {
      return (
        <Grid item xs={12}>
          <Typography
            style={{ maxWidth: 600, margin: "auto" }}
            variant="h6"
            align="center"
            color="textPrimary"
          >
            NO PUEDE ACTUALIZAR ESTE PROCEDIMIENTO YA QUE SU ESTADO ES{" "}
            <span className={classes.accentText}>{procedure.estado}.</span>{" "}
            Recuerde que solo puede actualizar un procedimiento que tiene el
            estado{" "}
            <span className={classes.accentText}>ESPERANDO CORRECCION.</span>
          </Typography>
          <Grid item xs={12} className={classes.procedureStateContainer}>
            <ProcedureState procedureId={id} />
          </Grid>
        </Grid>
      );
    }
  } else {
    return <CircularProgress />;
  }
};

UpdateProcedure.propTypes = {};

export default UpdateProcedure;
