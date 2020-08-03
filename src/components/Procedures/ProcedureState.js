import React from "react";
import { GET } from "../../gql/queries/procedure";
import { useQuery } from "@apollo/react-hooks";
import {
  Grid,
  Typography,
  makeStyles,
  Table,
  TableHead,
  TableCell,
  TableRow,
  TableBody,
  CircularProgress,
  Tooltip,
  Divider,
} from "@material-ui/core";
import HourglassFullIcon from "@material-ui/icons/HourglassFull";
import DoneAllIcon from "@material-ui/icons/DoneAll";
import WarningIcon from "@material-ui/icons/Warning";

const useStyles = makeStyles((theme) => ({
  container: {
    maxWidth: 600,
  },
  header: {
    paddingLeft: 16,
    paddingBottom: 8,
    paddingTop: 8,
    backgroundColor: "rgba(0,0,0,0.05)",
  },
  state: {
    color: "#00796B",
  },
}));

export default function ProcedureState({ procedureId }) {
  const classes = useStyles();
  const { data, loading } = useQuery(GET, {
    variables: { id: procedureId },
    onCompleted(data) {
      console.log("procedure state", data);
    },
  });

  const getRequirementState = (requirement) => {
    const procedure = data.procedures.procedures[0];
    const lastReview = procedure.reviews[0];
    if (lastReview && lastReview[`${requirement}`] === true) {
      return (
        <Tooltip title="Este requisito ha sido aprobado">
          <DoneAllIcon color="primary" />
        </Tooltip>
      );
    } else if (
      !lastReview ||
      (lastReview && lastReview[requirement] === null)
    ) {
      return (
        <Tooltip title="Este requisito aún no ha sido revisado.">
          <HourglassFullIcon color="secondary" />
        </Tooltip>
      );
    } else if (lastReview && lastReview[requirement] === false) {
      return (
        <Tooltip title="Este requisito ha sido rechazado">
          <WarningIcon color="error" />
        </Tooltip>
      );
    }
  };
  if (data && data.procedures.ok) {
    const procedure = data.procedures.procedures[0];
    const lastReview = procedure.reviews[0];
    return (
      <Grid container className={classes.container}>
        <Grid item xs={12} className={classes.header}>
          <Typography variant="h6" color="textSecondary" align="left">
            PROCEDIMIENTO Nº {procedureId}
          </Typography>
          <Typography
            variant="subtitle2"
            color="textSecondary"
            align="left"
            className={classes.subtitle}
          >
            <strong>ESTADO ACTUAL:</strong>{" "}
            <span className={classes.state}>{procedure.estado}</span>
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell align="left" colSpan={2}>
                  {" "}
                  <strong> REQUISITO </strong>{" "}
                </TableCell>
                <TableCell align="center">
                  {" "}
                  <strong> ESTADO </strong>{" "}
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell colSpan={2}> REQUISITOS FISICOS </TableCell>
                <TableCell align="center">
                  {getRequirementState("requisitosFisicos")}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell colSpan={2}> REQUISITOS JURÍDICOS </TableCell>
                <TableCell align="center">
                  {getRequirementState("requisitosJuridicos")}
                </TableCell>
              </TableRow>
              {procedure.calidadDelProponente === "PERSONA HUMANA" && (
                <TableRow>
                  <TableCell colSpan={1}></TableCell>
                  <TableCell> CONSTANCIA DE CUIT </TableCell>
                  <TableCell align="center">
                    {getRequirementState("constanciaDeCuit")}
                  </TableCell>
                </TableRow>
              )}
              <TableRow>
                <TableCell colSpan={1}></TableCell>
                <TableCell> CONSTANCIA DE MATRICULA </TableCell>
                <TableCell align="center">
                  {getRequirementState("constanciaDeMatricula")}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell colSpan={1}></TableCell>
                <TableCell> PLANO DE MENSURA </TableCell>
                <TableCell align="center">
                  {getRequirementState("planoDeMensura")}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell colSpan={2}> REQUISITOS TÉCNICOS </TableCell>
                <TableCell align="center">
                  {getRequirementState("requisitosTecnicos")}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell colSpan={1}></TableCell>
                <TableCell> DECLARACION JURADA DE APTITUD AMBIENTAL </TableCell>
                <TableCell align="center">
                  {getRequirementState("declaracionJuradaAptitudAmbiental")}
                </TableCell>
              </TableRow>

              {procedure.superficiePCUS <= 10 && (
                <TableRow>
                  <TableCell colSpan={1}></TableCell>
                  <TableCell> FORMULARIO PCUS </TableCell>
                  <TableCell align="center">
                    {getRequirementState("formularioPCUS")}
                  </TableCell>
                </TableRow>
              )}
              {procedure.superficiePCUS > 10 && (
                <>
                  <TableRow>
                    <TableCell colSpan={1}></TableCell>
                    <TableCell> PLAN DE CAMBIO DE USO DE SUELO </TableCell>
                    <TableCell align="center">
                      {getRequirementState("PCUS")}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell colSpan={1}></TableCell>
                    <TableCell> CARTOGRAFIA </TableCell>
                    <TableCell align="center">
                      {getRequirementState("cartografia")}
                    </TableCell>
                  </TableRow>
                  {procedure.superficiePCUS > 300 && (
                    <TableRow>
                      <TableCell colSpan={1}></TableCell>
                      <TableCell>
                        {" "}
                        ESTUDIO DE IMPACTO SOCIAL Y AMBIENTAL{" "}
                      </TableCell>
                      <TableCell align="center">
                        {getRequirementState("estudioImpactoAmbiental")}
                      </TableCell>
                    </TableRow>
                  )}
                </>
              )}
            </TableBody>
          </Table>
        </Grid>
      </Grid>
    );
  }
  if (loading) {
    return <CircularProgress />;
  } else {
    return <div></div>;
  }
}
