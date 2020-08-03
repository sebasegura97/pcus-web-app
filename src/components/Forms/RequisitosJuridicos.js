import { useMutation, useLazyQuery } from "@apollo/react-hooks";
import {
  Button,
  Grid,
  makeStyles,
  MenuItem,
  Typography,
  CircularProgress,
  FormControl,
  FormLabel,
  FormControlLabel,
  FormGroup,
  Checkbox,
} from "@material-ui/core";
import React from "react";
import PropTypes from "prop-types";
import {
  SelectValidator,
  ValidatorForm,
  TextValidator,
} from "react-material-ui-form-validator";
import { CREATE_OR_UPDATE as CREATE_OR_UPDATE_PROCEDURE } from "../../gql/mutations/procedure";
import { GET } from "../../gql/queries/procedure";
import { useForm } from "../../utilities/useForm";
import { DragAndDrop } from "../DragAndDrop";
import CheckboxValidatorElement from "../Checkbox";

const useStyles = makeStyles({
  container: {
    maxWidth: 600,
    margin: "auto",
  },
  checkIcon: {
    fontSize: 72,
  },
});

function FormData(values) {
  return {
    id: values && values.id ? values.id : null,
    numeroDeExpediente: values && values.numeroDeExpediente ? values.numeroDeExpediente : null, 
    calidadDelProponente:
      values && values.calidadDelProponente
        ? values.calidadDelProponente
        : "PERSONA HUMANA",
    condicionJuridicaDelInmueble:
      values && values.condicionJuridicaDelInmueble
        ? values.condicionJuridicaDelInmueble
        : "TITULAR",
    nombreProponente:
      values && values.nombreProponente ? values.nombreProponente : "",
    apellidoProponente:
      values && values.apellidoProponente ? values.apellidoProponente : "",
    razonSocial: values && values.razonSocial ? values.razonSocial : "",
    denominacion: values && values.denominacion ? values.denominacion : "",
    tipoDeDocumentoProponente:
      values && values.tipoDeDocumentoProponente
        ? values.tipoDeDocumentoProponente
        : "CUIT",
    numeroDeDocumentoProponente:
      values && values.numeroDeDocumentoProponente
        ? values.numeroDeDocumentoProponente
        : "",
    nombreTRP: values && values.nombreTRP ? values.nombreTRP : "",
    apellidoTRP: values && values.apellidoTRP ? values.apellidoTRP : "",
    tipoDeDocumentoTRP:
      values && values.tipoDeDocumentoTRP ? values.tipoDeDocumentoTRP : "CUIT",
    numeroDeDocumentoTRP:
      values && values.numeroDeDocumentoTRP ? values.numeroDeDocumentoTRP : "",
    domicilioRealProponente:
      values && values.domicilioRealProponente
        ? values.domicilioRealProponente
        : "",
    domicilioLegalProponente:
      values && values.domicilioLegalProponente
        ? values.domicilioLegalProponente
        : "",
    domicilioProyecto:
      values && values.domicilioProyecto ? values.domicilioProyecto : "",
    numeroDeCatastro:
      values && values.numeroDeCatastro ? values.numeroDeCatastro : "",
    constanciaDeCUITProponente:
      values && values.constanciaDeCUITProponente
        ? values.constanciaDeCUITProponente
        : null,
    constanciaDeMatriculaTRP:
      values && values.constanciaDeMatriculaTRP
        ? values.constanciaDeMatriculaTRP
        : null,
    planoDeMensura:
      values && values.planoDeMensura ? values.planoDeMensura : null,
  };
}

const RequisitosJuridicos = ({ procedureId, readOnly, onCompleted }) => {
  const classes = useStyles();
  const [terminosYCondiciones, setTerminosYCondiciones] = React.useState(false);
  React.useEffect(() => {
    ValidatorForm.addValidationRule("isTruthy", (value) => value);
  }, []);

  const [getProcedure] = useLazyQuery(GET, {
    onCompleted(data) {
      const values = data.procedures.procedures[0];
      const formData = new FormData(values);
      setValues(formData);
    },
  });

  React.useEffect(() => {
    if (procedureId) {
      getProcedure({ variables: { id: procedureId } });
    }
  }, [procedureId]);

  const initialValues = new FormData();

  const [createOrUpdateProcedure, { loading, data }] = useMutation(
    CREATE_OR_UPDATE_PROCEDURE,
    {
      onCompleted(data) {
        if (onCompleted instanceof Function) {
          onCompleted(data.createOrUpdateProcedure);
        }
      },
      refetchQueries: [
        {
          query: GET,
          // variables: { id: procedureId }
        },
      ],
    }
  );

  const handleSubmit = () => {
    const input = {
      ...values,
      constanciaDeCUITProponente:
        typeof values.constanciaDeCUITProponente == "string"
          ? null
          : values.constanciaDeCUITProponente,
      constanciaDeMatriculaTRP:
        typeof values.constanciaDeMatriculaTRP == "string"
          ? null
          : values.constanciaDeMatriculaTRP,
      planoDeMensura:
        typeof values.planoDeMensura == "string" ? null : values.planoDeMensura,
    };
    createOrUpdateProcedure({ variables: { input } });
  };

  const { onChange, onSubmit, values, setValues } = useForm(
    handleSubmit,
    initialValues
  );

  return (
    <ValidatorForm onSubmit={onSubmit}>
      <Grid
        container
        justify="flex-end"
        spacing={2}
        className={classes.container}
      >
        <Grid item xs={12}>
          <Typography variant="h6" align="center" color="textPrimary">
            REQUISITOS JURIDICOS
          </Typography>
        </Grid>

        <Grid item xs={12} sm={12}>
          <SelectValidator
            select
            disabled={readOnly}
            label="Calidad del solicitante"
            name="calidadDelProponente"
            fullWidth
            value={
              values.calidadDelProponente
                ? values.calidadDelProponente
                : "PERSONA HUMANA"
            }
            validators={["required"]}
            errorMessages={["Este campo es requerido"]}
            onChange={(e) => onChange(e)}
            variant="outlined"
          >
            <MenuItem value="PERSONA HUMANA">PERSONA HUMANA</MenuItem>
            <MenuItem value="PERSONA JURIDICA">PERSONA JURIDICA</MenuItem>
            <MenuItem value="COMUNIDAD INDIGENA">COMUNIDAD INDIGENA</MenuItem>
          </SelectValidator>
        </Grid>

        <Grid item xs={12} sm={12}>
          <SelectValidator
            select
            disabled={readOnly}
            label="Condicion juridica del inmueble"
            name="condicionJuridicaDelInmueble"
            fullWidth
            value={
              values.condicionJuridicaDelInmueble
                ? values.condicionJuridicaDelInmueble
                : "TITULAR"
            }
            validators={["required"]}
            errorMessages={["Este campo es requerido"]}
            onChange={(e) => onChange(e)}
            variant="outlined"
          >
            <MenuItem value="TITULAR">TITULAR</MenuItem>
            <MenuItem value="HEREDERO O CESIONARIO DE DERECHOS">
              HEREDERO O CESIONARIO DE DERECHOS
            </MenuItem>
            <MenuItem value="CONDOMINIO">CONDOMINIO</MenuItem>
            <MenuItem value="USUFRUCTO VITALICIO">USUFRUCTO VITALICIO</MenuItem>
          </SelectValidator>
        </Grid>

        <Grid item xs={12}>
          <TextValidator
            fullWidth
            variant="outlined"
            disabled={readOnly}
            name="numeroDeExpediente"
            label="Número de expediente"
            value={values.numeroDeExpediente ? values.numeroDeExpediente : ""}
            onChange={onChange}
            helperText="Será asignado cuando presente los requisitos fisicos. Puede dejar este campo en blanco hasta entonces."
          />
        </Grid>

        <Grid item xs={12}>
          <Typography variant="subtitle2" color="textSecondary" align="left">
            DATOS DEL PROPONENTE:
          </Typography>
        </Grid>
        {values.calidadDelProponente === "PERSONA HUMANA" && (
          <>
            <Grid item xs={12} sm={6}>
              <TextValidator
                fullWidth
                variant="outlined"
                disabled={readOnly}
                name="nombreProponente"
                label="Nombre"
                value={values.nombreProponente ? values.nombreProponente : ""}
                onChange={onChange}
                validators={["required"]}
                errorMessages={["Este campo es requerido"]}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextValidator
                fullWidth
                variant="outlined"
                disabled={readOnly}
                name="apellidoProponente"
                label="Apellido"
                value={
                  values.apellidoProponente ? values.apellidoProponente : ""
                }
                onChange={onChange}
                validators={["required"]}
                errorMessages={["Este campo es requerido"]}
              />
            </Grid>
            <Grid item xs={12} sm={12}>
              <DragAndDrop
                readOnly={readOnly}
                url={values.constanciaDeCUITProponente}
                fileName="Constancia de CUIT"
                dropzoneText="Constancia de cuit - Arrastrar y soltar constancia o click para buscar (pdf)."
                filesLimit={1}
                onChange={(files) =>
                  onChange(null, { constanciaDeCUITProponente: files })
                }
                acceptedFiles={["application/pdf"]}
                // 2MB
                maxFileSize={2000000}
              />
            </Grid>
          </>
        )}
        {values.calidadDelProponente === "PERSONA JURIDICA" && (
          <>
            <Grid item xs={12} sm={12}>
              <TextValidator
                fullWidth
                variant="outlined"
                disabled={readOnly}
                name="razonSocial"
                label="Razon social"
                value={values.razonSocial ? values.razonSocial : ""}
                onChange={onChange}
                validators={["required"]}
                errorMessages={["Este campo es requerido"]}
              />
            </Grid>
          </>
        )}
        {values.calidadDelProponente === "COMUNIDAD INDIGENA" && (
          <>
            <Grid item xs={12} sm={12}>
              <TextValidator
                fullWidth
                variant="outlined"
                disabled={readOnly}
                name="denominacion"
                label="Denominacion de la comunidad"
                value={values.denominacion ? values.denominacion : ""}
                onChange={onChange}
                validators={["required"]}
                errorMessages={["Este campo es requerido"]}
              />
            </Grid>
          </>
        )}
        <Grid item xs={12} sm={6}>
          <SelectValidator
            select
            disabled={readOnly}
            label="Tipo de documento"
            name="tipoDeDocumentoProponente"
            fullWidth
            value={
              values.tipoDeDocumentoProponente
                ? values.tipoDeDocumentoProponente
                : "CUIT"
            }
            validators={["required"]}
            errorMessages={["Este campo es requerido"]}
            onChange={(e) => onChange(e)}
            variant="outlined"
          >
            <MenuItem value="DNI">DNI</MenuItem>
            <MenuItem value="CUIT">CUIT</MenuItem>
            <MenuItem value="CUIL">CUIL</MenuItem>
          </SelectValidator>
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextValidator
            fullWidth
            variant="outlined"
            disabled={readOnly}
            name="numeroDeDocumentoProponente"
            label="Numero de documento"
            value={
              values.numeroDeDocumentoProponente
                ? values.numeroDeDocumentoProponente
                : ""
            }
            onChange={onChange}
            validators={["required"]}
            errorMessages={["Este campo es requerido"]}
            type="number"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextValidator
            fullWidth
            variant="outlined"
            disabled={readOnly}
            name="domicilioRealProponente"
            label="Domicilio real"
            value={
              values.domicilioRealProponente
                ? values.domicilioRealProponente
                : ""
            }
            onChange={onChange}
            validators={["required"]}
            errorMessages={["Este campo es requerido"]}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextValidator
            fullWidth
            variant="outlined"
            disabled={readOnly}
            name="domicilioLegalProponente"
            label="Domicilio legal"
            value={
              values.domicilioLegalProponente
                ? values.domicilioLegalProponente
                : ""
            }
            onChange={onChange}
            validators={["required"]}
            errorMessages={["Este campo es requerido"]}
          />
        </Grid>
        <Grid item xs={12}>
          <Typography variant="subtitle2" color="textSecondary" align="left">
            DATOS DEL TÉCNICO RESPONSABLE DEL PROYECTO:
          </Typography>
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextValidator
            fullWidth
            variant="outlined"
            disabled={readOnly}
            name="nombreTRP"
            label="Nombre"
            value={values.nombreTRP ? values.nombreTRP : ""}
            onChange={onChange}
            validators={["required"]}
            errorMessages={["Este campo es requerido"]}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextValidator
            fullWidth
            variant="outlined"
            disabled={readOnly}
            name="apellidoTRP"
            label="Apellido"
            value={values.apellidoTRP ? values.apellidoTRP : ""}
            onChange={onChange}
            validators={["required"]}
            errorMessages={["Este campo es requerido"]}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <SelectValidator
            select
            disabled={readOnly}
            label="Tipo de documento"
            name="tipoDeDocumentoTRP"
            fullWidth
            value={
              values.tipoDeDocumentoTRP ? values.tipoDeDocumentoTRP : "CUIT"
            }
            validators={["required"]}
            errorMessages={["Este campo es requerido"]}
            onChange={(e) => onChange(e)}
            variant="outlined"
          >
            <MenuItem value="DNI">DNI</MenuItem>
            <MenuItem value="CUIT">CUIT</MenuItem>
            <MenuItem value="CUIL">CUIL</MenuItem>
          </SelectValidator>
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextValidator
            fullWidth
            variant="outlined"
            disabled={readOnly}
            name="numeroDeDocumentoTRP"
            label="Numero de documento"
            value={
              values.numeroDeDocumentoTRP ? values.numeroDeDocumentoTRP : ""
            }
            onChange={onChange}
            validators={["required"]}
            errorMessages={["Este campo es requerido"]}
            type="number"
          />
        </Grid>
        <Grid item xs={12}>
          <DragAndDrop
            readOnly={readOnly}
            url={values.constanciaDeMatriculaTRP}
            fileName="Constancia de matricula"
            dropzoneText="Constancia de matricula - Arrastrar y soltar constancia o click para buscar (pdf o jpg)."
            filesLimit={1}
            onChange={(files) =>
              onChange(null, { constanciaDeMatriculaTRP: files })
            }
            acceptedFiles={["application/pdf", "image/jpg", "image/jpeg"]}
            // 4MB
            maxFileSize={4000000}
            // showAlerts={false}
          />
        </Grid>
        <Grid item xs={12}>
          <Typography variant="subtitle2" color="textSecondary" align="left">
            DATOS PROPIOS DEL PROYECTO:
          </Typography>
        </Grid>
        <Grid item xs={12} sm={12}>
          <TextValidator
            fullWidth
            variant="outlined"
            disabled={readOnly}
            name="domicilioProyecto"
            label="Domicilio"
            value={values.domicilioProyecto ? values.domicilioProyecto : ""}
            onChange={onChange}
            validators={["required"]}
            errorMessages={["Este campo es requerido"]}
          />
        </Grid>
        <Grid item xs={12} sm={12}>
          <TextValidator
            fullWidth
            variant="outlined"
            disabled={readOnly}
            name="numeroDeCatastro"
            label="Numero de catastro"
            value={values.numeroDeCatastro ? values.numeroDeCatastro : ""}
            onChange={onChange}
            validators={["required"]}
            errorMessages={["Este campo es requerido"]}
          />
        </Grid>
        <Grid item xs={12}>
          <DragAndDrop
            readOnly={readOnly}
            url={values.planoDeMensura}
            fileName="Plano de mensura"
            dropzoneText="Plano de mensura o informe y croquis- Arrastrar y soltar o click para buscar (pdf o zip)."
            filesLimit={1}
            onChange={(files) => onChange(null, { planoDeMensura: files })}
            url={values.planoDeMensura}
            acceptedFiles={[
              "zip",
              "application/pdf",
              "application/zip",
              "application/x-zip",
              "application/x-zip-compressed",
              "application/octet-stream",
            ]}
            // 10MB
            maxFileSize={10000000}
            // showAlerts={false}
          />
        </Grid>
        {!readOnly && (
          <Grid item xs={12}>
            <CheckboxValidatorElement
              validators={["isTruthy"]}
              errorMessages={["Debe aceptar las condiciones."]}
              checked={terminosYCondiciones}
              onChange={(e) => setTerminosYCondiciones(e.target.checked)}
              name="aceptacionDeDeclaracionJurada"
              value={terminosYCondiciones}
              label="DECLARO BAJO JURAMENTO QUE LOS DATOS CONSIGNADOS EN LA PRESENTE DECLARACIÓN JURADA SON VERIDICOS, HACIENDOME RESPONSABLE CIVIL Y PENALMENTE PARA EL CASO DE RESULTAR FALSOS LOS DATOS CONSIGNADAS EN LA MISMA."
            />
          </Grid>
        )}
        {!readOnly && (
          <Grid item>
            <div style={{ display: "flex", alignItems: "center" }}>
              {loading && (
                <CircularProgress style={{ marginRight: 8 }} size={24} />
              )}
              <Button
                variant="contained"
                color="primary"
                type="submit"
                disabled={loading}
              >
                CONFIRMAR
              </Button>
            </div>
          </Grid>
        )}
      </Grid>
    </ValidatorForm>
  );
};

RequisitosJuridicos.propTypes = {
  readOnly: PropTypes.bool,
};

RequisitosJuridicos.defaultProps = {
  readOnly: true,
};

export default RequisitosJuridicos;
