import React from "react";
import { Typography, Grid, Divider, makeStyles } from "@material-ui/core";

const useStyles = makeStyles({
  container: {
    padding: 16,
  },
  stepContainer: {
    display: "flex",
    justifyContent: "left",
    alignItems: "center",
    margin: 24,
  },
  stepNumber: {
    minWidth: "50px",
    maxWidth: "50px",
    height: "50px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontSize: 24,
    lineHeight: 1,
    color: "white",
    backgroundColor: "#00796B",
    borderRadius: "50%",
    marginRight: 16,
  },
});

export default function Guia() {
  const classes = useStyles();

  return (
    <Grid container spacing={2} justify="center" className={classes.container}>
      <Grid item xs={12}>
        <Typography variant="h4" align="center" color="primary">
          GUIA PARA COMPLETAR EL PROCEDIMIENTO PARA CAMBIOS DE USO DE SUELO:
        </Typography>
        <Typography variant="subtitle2" align="center" color="primary">
          Si es la primera vez que realizas el procedimiento o quieres recordar
          algun paso te sugerimos esta guía.
        </Typography>
        <Typography variant="subtitle2" align="center" color="textSecondary">
          Se recomienda, antes que todo, leer la{" "}
          <a href={`${process.env.REACT_APP_API_URL}/static/resolucion000831.pdf`} download target="_blank">
            resolucion Nro. 000831
          </a>
          , sobre el procedimiento para presentacion de plan de cambio de uso de
          suelo.
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Divider />
      </Grid>
      <Grid item xs={12} style={{ maxWidth: 800 }}>
        <Typography variant="h5" color="primary" align="center">
          COMO USAR EL SISTEMA:
        </Typography>
        <div className={classes.stepContainer}>
          <div className={classes.stepNumber}>1</div>
          <Typography variant="body1">
            Una vez registrado deberá iniciar un trámite (desde la opcion del menú "inicar
            trámite") cargando el formulario de requisitos juridicos que se le
            presentará.
          </Typography>
        </div>
        <div className={classes.stepContainer}>
          <div className={classes.stepNumber}>2</div>
          <Typography variant="body1">
            En "Mis procedimientos" podrá ver el estado de sus procedimientos y
            actualizar los datos cargados.
            <strong>
              {" "}
              Solo usted puede actualizar los datos de su procedimiento.
            </strong>
          </Typography>
        </div>
        <div className={classes.stepContainer}>
          <div className={classes.stepNumber}>3</div>
          <Typography variant="body1">
            Cuando se apruebe o rechace su procedimiento o alguno de sus
            requisitos será notificado al mail con el que se registro y por
            medio de las notificaciones del sistema.
          </Typography>
        </div>
        <Typography variant="h5" color="primary" align="center">
          ESTADOS DE UN PROCEDIMIENTO:
        </Typography>
        <Typography variant="subtitle2" color="primary" align="center">
          Un procedimiento pasará por todos o algunos de los siguientes estados
          hasta llegar a la resolucion final.
        </Typography>
        <div className={classes.stepContainer}>
          <div className={classes.stepNumber}>1</div>
          <Typography variant="body1">
            <strong>ESPERANDO REVISIÓN:</strong> Se espera que la secretaría
            revise el procedimiento para aprobar o rechazar requisitos. Se
            presentará al iniciar el prociedimiento y cada vez que ud. corrija o
            agregue datos.
          </Typography>
        </div>
        <div className={classes.stepContainer}>
          <div className={classes.stepNumber}>2</div>
          <Typography variant="body1">
            <strong>ESPERANDO CORRECCION:</strong> Se espera que el proponente
            corrija los requisitos rechazados. Se presentará luego de una
            revisión por parte de la secretaría.
          </Typography>
        </div>
        <div className={classes.stepContainer}>
          <div className={classes.stepNumber}>3</div>
          <Typography variant="body1">
            <strong>APROBADO:</strong> Todos los requisitos técnicos físicos y
            jurídicos han sido aprobados.
          </Typography>
        </div>
        <div className={classes.stepContainer}>
          <div className={classes.stepNumber}>4</div>
          <Typography variant="body1">
            <strong>RECHAZADO:</strong> Se ha rechazado su solicitud y no podrá
            seguir gestionandola.
          </Typography>
        </div>
        <Typography variant="h5" color="primary" align="center">
          REQUISITOS
        </Typography>
        <Typography variant="subtitle2" color="primary" align="center">
          Esto es un breve resumen y ud. debería leer la resolucion Nº 0000831
          para informarse de manera completa. Con el fin de simplificar el
          procedimiento distinguiremos 3 tipos de requisitos, los cuales deberán
          ser aprobados en su totalidad para que el procedimiento sea aprobado.
        </Typography>
        <div className={classes.stepContainer}>
          <div className={classes.stepNumber}>1</div>
          <Typography variant="body1">
            <strong>REQUISITOS JURIDICOS:</strong> Aquellos datos y documentos
            que pueden ser declarados y presentados por esta plataforma.
          </Typography>
        </div>
        <div className={classes.stepContainer}>
          <div className={classes.stepNumber}>2</div>
          <Typography variant="body1">
            <strong>REQUISITOS JURIDICOS FISICOS:</strong> Aquellos documentos
            de los que se requiere una copia física sin excepción. Deberan ser
            presentados en la Secretaría de Ambiente de la provincia de Salta.
          </Typography>
        </div>
        <div className={classes.stepContainer}>
          <div className={classes.stepNumber}>3</div>
          <Typography variant="body1">
            <strong>REQUISITOS TÉCNICOS:</strong> Datos y documentos que deberán
            ser completados por un técnico profesional autorizado.
          </Typography>
        </div>
      </Grid>
    </Grid>
  );
}
