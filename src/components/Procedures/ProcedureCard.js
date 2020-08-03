import React from "react";
import { makeStyles, Card, CardContent, Typography } from "@material-ui/core/";
import formatDate from "../../utilities/formatDate";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles({
  root: {
    // maxWidth: 300,
    "&:hover": {
      cursor: "pointer",
      backgroundColor: "rgba(0,0,0,0.025)",
      transition: "0.3ms",
    },
  },
});

export default function ProcedureCard({ procedure }) {
  const classes = useStyles();
  const history = useHistory();
  const handleClick = () => {
    history.push(`/procedure/${procedure.id}`);
  };

  return (
    <Card className={classes.root} onClick={handleClick}>
      <CardContent>
        <Typography variant="caption" color="primary">
          PLAN DE CAMBIO DE USO DE SUELO
        </Typography>
        <Typography variant="body2" color="textSecondary">
          TRAMITE NRO.: {procedure.id}
        </Typography>
        <Typography variant="body2" color="textSecondary">
          ESTADO: {procedure.estado}
        </Typography>
        <Typography variant="body2" color="textSecondary">
          INICIO: {formatDate(procedure.createdAt, "DD/MM/YYYY")}
        </Typography>
        <Typography variant="body2" color="textSecondary">
          ULTIMA ACTUALIZACION: {formatDate(procedure.updatedAt, "DD/MM/YYYY")}
        </Typography>
      </CardContent>
    </Card>
  );
}
