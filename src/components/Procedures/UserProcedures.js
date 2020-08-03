import React from "react";
import ProcedureCard from "./ProcedureCard";
import { Typography, Divider, CircularProgress, Grid } from "@material-ui/core";
import { GET } from "../../gql/queries/procedure";
import { useQuery } from "@apollo/react-hooks";

export default function UserProcedures() {
  const { data, error } = useQuery(GET, {
    onCompleted(data) {
      console.log(data);
    },
  });
  if (error) {
    return (
      <Typography color="error"> Ha ocurrido un error inesperado </Typography>
    );
  }
  if (data) {
    const procedures = data.procedures.procedures;
    return (
      <>
        <Typography variant="h4" color="primary">
          MIS TRAMITES
        </Typography>
        <Divider style={{ marginBottom: 16, marginTop: 8 }} />
        {procedures.length > 0 ? (
          <Grid container spacing={2}>
            {procedures.map((procedure, index) => (
              <Grid item key={index} xs={12} sm={6} md={3}>
                <ProcedureCard procedure={procedure} />
              </Grid>
            ))}
          </Grid>
        ) : (
          <Typography variant="body1" color="textSecondary">
            Aún no ha iniciado ningún procedimiento. Puede hacerlo desde la opción del menú "Iniciar trámite".
          </Typography>
        )}
      </>
    );
  } else {
    return <CircularProgress />;
  }
}
