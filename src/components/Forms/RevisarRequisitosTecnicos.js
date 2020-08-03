import PropTypes from "prop-types";
import React from "react";
import {
  Grid,
  Divider,
  Typography,
  FormGroup,
  FormControlLabel,
  TextField,
  Button,
  Checkbox,
  CircularProgress,
  Tooltip,
  FormControl,
  FormLabel,
  FormHelperText,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
} from "@material-ui/core";
import { useMutation, useQuery } from "@apollo/react-hooks";
import { REVIEW } from "../../gql/mutations/procedure";
import { ValidatorForm } from "react-material-ui-form-validator";
import FormFeedback from "../FormFeedback";
import { GET_CURRENT_USER } from "../../gql/queries/users";
import { GET as GET_PROCEDURE } from "../../gql/queries/procedure";
import { useForm } from "../../utilities/useForm";
import RequirementChecker from "./RequirementChecker";
import lodash from "lodash";

export default function RevisarRequisitosJuridicos({ procedureId }) {
  const { data: procedures } = useQuery(GET_PROCEDURE, {
    variables: { id: procedureId },
  });

  const [makeReview, { data, loading, error }] = useMutation(REVIEW, {
    refetchQueries: [
      {
        query: GET_PROCEDURE,
        variables: { id: procedureId },
      },
    ],
  });

  // Dialog stuff
  const [openDialog, setOpenDialog] = React.useState(false);
  const handleCloseDialog = () => setOpenDialog(false);
  const handleOpenDialog = () => setOpenDialog(true);

  // Form stuff
  React.useEffect(() => {
    if (procedures && procedures.procedures.ok) {
      const procedure = procedures.procedures.procedures[0];
      const lastReview = procedure.reviews[0];
      if (lastReview) {
        setValues({
          formularioPCUS: lastReview.formularioPCUS,
          declaracionJuradaAptitudAmbiental:
            lastReview.declaracionJuradaAptitudAmbiental,
          PCUS: lastReview.PCUS,
          cartografia: lastReview.cartografia,
          estudioImpactoAmbiental: lastReview.estudioImpactoAmbiental,
        });
      } else {
        setValues({
          formularioPCUS: null,
          declaracionJuradaAptitudAmbiental: null,
          PCUS: null,
          cartografia: null,
          estudioImpactoAmbiental: null,
        });
      }
    }
  }, [procedures]);

  const [values, setValues] = React.useState({});

  const handleSubmit = () => {
    makeReview({
      variables: {
        input: {
          ...values,
          procedureId,
        },
      },
    });
  };

  // Requirement handling stuff
  const handleAcceptRequirement = (requirement) => {
    setValues({ ...values, [requirement]: true });
  };
  const handleRejectRequirement = (requirement) => {
    setValues({ ...values, [requirement]: false });
  };
  const handleReviewLaterRequirement = (requirement) => {
    setValues({ ...values, [requirement]: null });
  };
  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  if (error) {
    return (
      <Typography color="error" variant="h5">
        Ha ocurrido un error inesperado {error.message}
      </Typography>
    );
  }
  if (data) {
    return (
      <FormFeedback
        ok={data.reviewProcedure.ok}
        message={data.reviewProcedure.message}
      />
    );
  }
  if (procedures) {
    const procedure = procedures.procedures.procedures[0];
    const lastReview = procedure.reviews[0];
    if (["ACEPTADO", "RECHAZADO"].includes(procedure.estado)) {
      return (
        <Grid container spacing={2} style={{ maxWidth: 700 }}>
          <Grid item xs={12}>
            <Divider style={{ marginBottom: 16, marginTop: 16 }} />
            <Typography align="center" variant="h5" color="primary">
              ESTE PROCEDIMIENTO YA TIENE UNA RESOLUCIÓN
            </Typography>
            <Typography align="center" variant="subtitle2" color="secondary">
              Este procedimiento ya ha sido {procedure.estado}, por lo tanto no
              puede seguir efectuando revisiones.
            </Typography>
            <Divider style={{ marginBottom: 32, marginTop: 16 }} />
          </Grid>
        </Grid>
      );
    } else if (lastReview && lastReview.requisitosTecnicos) {
      return (
        <Grid container spacing={2} style={{ maxWidth: 700 }}>
          <Grid item xs={12}>
            <Divider style={{ marginBottom: 16, marginTop: 16 }} />
            <Typography align="center" variant="h5" color="primary">
              YA SE HAN APROBADO LOS REQUISITOS TECNICOS DE ESTE PROCEDIMIENTO
            </Typography>
            <Typography align="center" variant="subtitle2" color="secondary">
              Cuando un requerimiento es aprobado no puede deshacerse.
            </Typography>
            <Divider style={{ marginBottom: 32, marginTop: 16 }} />
          </Grid>
        </Grid>
      );
    } else if (procedure.superficiePCUS === null) {
      return (
        <Grid container spacing={2} style={{ maxWidth: 700 }}>
          <Grid item xs={12}>
            <Divider style={{ marginBottom: 16, marginTop: 16 }} />
            <Typography align="center" variant="h5" color="primary">
              EL PROPONENTE AUN NO HA PRESENTADO LOS REQUISITOS TÉCNICOS.
            </Typography>
            <Typography align="center" variant="subtitle2" color="textSecondary">
              Podrá realizar la corrección cuando el proponente haga la presentación pertinente.
            </Typography>
            <Divider style={{ marginBottom: 32, marginTop: 16 }} />
          </Grid>
        </Grid>
      );
    } else {
      return (
        <>
          <Grid container spacing={2} style={{ maxWidth: 700 }}>
            <Grid item xs={12}>
              <Divider style={{ marginBottom: 16, marginTop: 16 }} />
              <Typography align="center" variant="h5" color="primary">
                REVISION
              </Typography>
              <Typography align="center" variant="subtitle2">
                Luego de revisar los datos ingresados por el proponente por
                favor complete el siguiente formulario.
              </Typography>
              <Typography align="center" variant="subtitle2" color="secondary">
                Recuerde que luego de aprobar alguno de los requerimientos no
                podra cambiar su estado de aprobado a rechazado.
              </Typography>
              <Divider style={{ marginBottom: 32, marginTop: 16 }} />
            </Grid>
          </Grid>
          <Grid container spacing={4} style={{ maxWidth: 700 }}>
            {procedure.superficiePCUS <= 10 && (
              <Grid item xs={12}>
                <RequirementChecker
                  prevValue={lastReview ? lastReview.formularioPCUS : null}
                  value={values.formularioPCUS}
                  title="Formulario PCUS"
                  description="El formulario para plan de cambio de uso de suelo (res. Nº 831) se considera correcto y aprobado."
                  onAccept={() => handleAcceptRequirement("formularioPCUS")}
                  onReject={() => handleRejectRequirement("formularioPCUS")}
                  onWatchLater={() =>
                    handleReviewLaterRequirement("formularioPCUS")
                  }
                />
              </Grid>
            )}
            {procedure.superficiePCUS > 10 && (
              <>
                <Grid item xs={12}>
                  <RequirementChecker
                    prevValue={lastReview ? lastReview.PCUS : null}
                    value={values.PCUS}
                    title="Plan de cambio de uso de suelo"
                    description="Tanto el formato como el contenido del plan de cambio de uso de suelo es correcto y se considera aprobado."
                    onAccept={() => handleAcceptRequirement("PCUS")}
                    onReject={() => handleRejectRequirement("PCUS")}
                    onWatchLater={() => handleReviewLaterRequirement("PCUS")}
                  />
                </Grid>
                <Grid item xs={12}>
                  <RequirementChecker
                    prevValue={lastReview ? lastReview.cartografia : null}
                    value={values.cartografia}
                    title="Cartografía"
                    description="La cartografía incluye plano límite de la propiedad, plano de ubicacion, plano de diseño del PCUS y sistema de referencias en formato .shapefiles."
                    onAccept={() => handleAcceptRequirement("cartografia")}
                    onReject={() => handleRejectRequirement("cartografia")}
                    onWatchLater={() =>
                      handleReviewLaterRequirement("cartografia")
                    }
                  />
                </Grid>
              </>
            )}
            {procedure.superficiePCUS > 300 && (
              <Grid item xs={12}>
                <RequirementChecker
                  prevValue={
                    lastReview ? lastReview.estudioImpactoAmbiental : null
                  }
                  value={values.estudioImpactoAmbiental}
                  title="Estudio de impacto socioambiental"
                  description="El estudio de impacto socioambiental se considera completo y correcto."
                  onAccept={() =>
                    handleAcceptRequirement("estudioImpactoAmbiental")
                  }
                  onReject={() =>
                    handleRejectRequirement("estudioImpactoAmbiental")
                  }
                  onWatchLater={() =>
                    handleReviewLaterRequirement("estudioImpactoAmbiental")
                  }
                />
              </Grid>
            )}

            <Grid item xs={12}>
              <RequirementChecker
                prevValue={
                  lastReview
                    ? lastReview.declaracionJuradaAptitudAmbiental
                    : null
                }
                value={values.declaracionJuradaAptitudAmbiental}
                title="Declaracion jurada de aptitud ambiental"
                description="El contenido y formato de la declaracion jurada de aptitud ambiental se consideran aprobados."
                onAccept={() =>
                  handleAcceptRequirement("declaracionJuradaAptitudAmbiental")
                }
                onReject={() =>
                  handleRejectRequirement("declaracionJuradaAptitudAmbiental")
                }
                onWatchLater={() =>
                  handleReviewLaterRequirement(
                    "declaracionJuradaAptitudAmbiental"
                  )
                }
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                variant="outlined"
                type="text"
                name="comentarios"
                multiline
                rows="4"
                label="Detalle las observaciones"
                value={values.comentarios}
                // disabled={disabledField.fullForm}
                onChange={handleChange}
              />
            </Grid>
            <Grid item style={{ marginLeft: "auto" }}>
              <Button
                variant="outlined"
                color="primary"
                // disabled={disabledField.fullForm}
                onClick={handleOpenDialog}
              >
                CONFIRMAR
              </Button>
              <Dialog
                open={openDialog}
                onClose={handleCloseDialog}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
              >
                <DialogTitle id="alert-dialog-title">
                  Esta acción es irreversible.
                </DialogTitle>
                <DialogContent>
                  <DialogContentText id="alert-dialog-description">
                    Por favor tenga en cuenta que no podrá deshacer la
                    aceptación de uno o mas requisitos.
                  </DialogContentText>
                </DialogContent>
                <DialogActions>
                  <Button onClick={handleCloseDialog} color="primary">
                    Cancelar
                  </Button>
                  <Button
                    variant="contained"
                    color="primary"
                    type="submit"
                    onClick={handleSubmit}
                    disabled={loading}
                  >
                    CONFIRMAR
                  </Button>
                </DialogActions>
              </Dialog>
            </Grid>
          </Grid>
        </>
      );
    }
  } else {
    return <CircularProgress />;
  }
}

RevisarRequisitosJuridicos.propTypes = {
  procedureId: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
    .isRequired,
};
