import { Divider, Grid, Typography, Button } from "@material-ui/core";
import React from "react";
import RequisitosJuridicos from "../../components/Forms/RequisitosJuridicos";
import RequisitosTecnicos from "../../components/Forms/RequisitosTecnicos";
import FormFeedback from "../FormFeedback";

const BeginProcedure = () => {
  const [step, setStep] = React.useState(1);
  const [formResponse, setFormResponse] = React.useState({});

  const handleOnComplete = (formResponse) => {
    setFormResponse(formResponse);
    setStep(step + 1);
  };

  return (
    <Grid container spacing={2} justify="center">
      <Grid item xs={12}>
        <Typography variant="h5" align="center" color="primary">
          INICIAR PROCEDIMIENTO PARA PLAN DE CAMBIO DE USO DE SUELO
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Typography variant="subtitle1" align="center">
          PARA INICIAR EL PROCEDIMIENTO COMPLETE EL SIGUIENTE FORMULARIO:
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Divider style={{ marginBottom: 16 }} />
      </Grid>
      {/* <FormProcedure /> */}
      {step === 1 && (
        <RequisitosJuridicos onCompleted={handleOnComplete} readOnly={false} />
      )}
      {step === 2 && (
        <FormFeedback
          ok={formResponse.ok}
          message={
            formResponse.ok
              ? `${formResponse.message} Los requisitos técnicos pueden ser completados ahora o mas adelante (desde la opcion del menú "Tramites"). Si los envia cuanto antes su procedimiento podría agilizarse.`
              : formResponse.message
          }
        >
          {formResponse.ok && (
            <Button
              variant="contained"
              color="primary"
              onClick={() => setStep(3)}
            >
              REQUISITOS TECNICOS
            </Button>
          )}
        </FormFeedback>
      )}
      {step === 3 && (
        <RequisitosTecnicos onCompleted={() => setStep(3)} readOnly={false} />
      )}
    </Grid>
  );
};

BeginProcedure.propTypes = {};

export default BeginProcedure;
