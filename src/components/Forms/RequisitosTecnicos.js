import { useMutation, useLazyQuery } from "@apollo/react-hooks";
import {
  Button,
  Grid,
  makeStyles,
  Typography,
  CircularProgress,
  InputAdornment,
  Tooltip,
  Divider,
} from "@material-ui/core";
import React from "react";
import PropTypes from "prop-types";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import { CREATE_OR_UPDATE as CREATE_OR_UPDATE_PROCEDURE } from "../../gql/mutations/procedure";
import { GET } from "../../gql/queries/procedure";
import { useForm } from "../../utilities/useForm";
import { DragAndDrop } from "../DragAndDrop";
import HelpIcon from "@material-ui/icons/Help";
import FormPCUS from "./formPCUS";

const useStyles = makeStyles({
  container: {
    maxWidth: 600,
    margin: "auto"
  },
  checkIcon: {
    fontSize: 72,
  },
});

function FormData(values) {
  if (values) {
    return {
      id: values.id ? values.id : null,
      superficiePCUS: values.superficiePCUS ? values.superficiePCUS : "",
      PCUS: values.PCUS ? values.PCUS : null,
      formPCUS: values.formPCUS ? values.formPCUS : null,
      declaracionJuradaAptitudAmbiental: values.declaracionJuradaAptitudAmbiental
        ? values.declaracionJuradaAptitudAmbiental
        : null,
      cartografia: values.cartografia ? values.cartografia : null,
      estudioDeImpactoSocioAmbiental: values.estudioDeImpactoSocioAmbiental
        ? values.estudioDeImpactoSocioAmbiental
        : null,
    };
  } else {
    return {
      id: null,
      superficiePCUS: "",
      PCUS: null,
      formPCUS: null,
      declaracionJuradaAptitudAmbiental: null,
      cartografia: null,
      estudioDeImpactoSocioAmbiental: null,
    };
  }
}

const RequisitosTecnicos = ({ procedureId, readOnly, onCompleted }) => {
  const classes = useStyles();
  const [getProcedure] = useLazyQuery(GET, {
    onCompleted(data) {
      const values = data.procedures.procedures[0];
      const formData = new FormData(values);
      if (values.formPCUS) {
        delete values.formPCUS.__typename;
      }
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
          // variables: { id: procedureId },
        },
      ],
    }
  );

  const handleSubmit = () => {
    const input = {
      ...values,
      PCUS: typeof values.PCUS === "string" ? null : values.PCUS,
      declaracionJuradaAptitudAmbiental:
        typeof values.declaracionJuradaAptitudAmbiental === "string"
          ? null
          : values.declaracionJuradaAptitudAmbiental,
      cartografia:
        typeof values.cartografia === "string" ? null : values.cartografia,
      estudioDeImpactoSocioAmbiental:
        typeof values.estudioDeImpactoSocioAmbiental === "string"
          ? null
          : values.estudioDeImpactoSocioAmbiental,
    };
    createOrUpdateProcedure({
      variables: {
        input,
      },
    });
  };

  const { onChange, onSubmit, values, setValues } = useForm(
    handleSubmit,
    initialValues
  );

  const handleChangeFormPCUS = (e) => {
    setValues({
      ...values,
      formPCUS: {
        ...values.formPCUS,
        [e.target.name]: e.target.value,
      },
    });
  };

  return (
    <ValidatorForm onSubmit={onSubmit}>
      <Grid container spacing={2} className={classes.container}>
        <Grid item xs={12}>
          <Typography variant="h6" align="center" color="textPrimary">
            REQUISITOS TECNICOS
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <TextValidator
            fullWidth
            disabled={readOnly}
            variant="outlined"
            name="superficiePCUS"
            label="Superficie PCUS (en hectareas)"
            value={values.superficiePCUS ? values.superficiePCUS : ""}
            onChange={(e) =>
              onChange(null, { [e.target.name]: parseFloat(e.target.value) })
            }
            validators={["required"]}
            errorMessages={["Este campo es requerido"]}
            type="number"
            InputProps={{
              endAdornment: (
                <InputAdornment position="start">
                  <Tooltip
                    title="Segun la superficie declarada cambiaran los requerimientos. Por favor sea muy cuidadoso al completar este campo."
                    arrow
                  >
                    <HelpIcon />
                  </Tooltip>
                </InputAdornment>
              ),
            }}
          />
        </Grid>
        {values.superficiePCUS < 10 && (
          <>
            <Grid item xs={12}>
              <Divider />
            </Grid>
            <Grid item xs={12}>
              <Typography
                variant="subtitle1"
                color="textSecondary"
                align="left"
              >
                FORMULARIO PCUS
              </Typography>
              <Typography>
                Este formulario debe llenarse en caso de superficies menores a
                10 hectareas.
              </Typography>
            </Grid>
            <FormPCUS
              onChange={handleChangeFormPCUS}
              readOnly={readOnly}
              values={values.formPCUS ? values.formPCUS : formPCUS}
            />
            <Grid item xs={12}>
              <Divider />
            </Grid>
          </>
        )}
        {values.superficiePCUS > 10 && (
          <>
            <Grid item xs={12}>
              <DragAndDrop
                readOnly={readOnly}
                dropzoneText="Plan de cambio de uso de suelo (pdf o comprimido max. 5mb)."
                filesLimit={1}
                fileName="Plan de cambio de uso de suelo"
                onChange={(files) => onChange(null, { PCUS: files })}
                url={typeof values.PCUS === "string" ? values.PCUS : null}
                acceptedFiles={[
                  "zip",
                  "application/pdf",
                  "application/zip",
                  "application/x-zip",
                  "application/x-zip-compressed",
                  "application/octet-stream",
                ]}
                // 5MB
                maxFileSize={5000000}
              />
            </Grid>

            <Grid item xs={12}>
              <DragAndDrop
                readOnly={readOnly}
                dropzoneText="Cartografia, se debe incluir: Plano limite de la propiedad, plano de ubicacion, plano de diseño del PCUS y el sistema de referencias. La cartografia debe estar en un formato shapefile (subir un archivo comprimido con todos los planos: .zip max 10mb)."
                filesLimit={1}
                fileName="Cartografia"
                url={
                  typeof values.cartografia === "string"
                    ? values.cartografia
                    : null
                }
                onChange={(files) => onChange(null, { cartografia: files })}
                acceptedFiles={[
                  "zip",
                  "application/zip",
                  "application/x-zip",
                  "application/x-zip-compressed",
                  "application/octet-stream",
                ]}
                // 10MB
                maxFileSize={10000000}
              />
            </Grid>
          </>
        )}

        {values.superficiePCUS > 300 && (
          <Grid item xs={12}>
            <DragAndDrop
              readOnly={readOnly}
              dropzoneText="Estudio de impacto ambiental y social (pdf o zip max. 5mb)"
              url={
                typeof values.estudioDeImpactoSocioAmbiental === "string"
                  ? values.estudioDeImpactoSocioAmbiental
                  : null
              }
              fileName="Estudio de impactio socio ambiental"
              filesLimit={1}
              onChange={(files) =>
                onChange(null, { estudioDeImpactoSocioAmbiental: files })
              }
              acceptedFiles={[
                "zip",
                "application/pdf",
                "application/zip",
                "application/x-zip",
                "application/x-zip-compressed",
                "application/octet-stream",
              ]}
              // 5MB
              maxFileSize={5000000}
            />
          </Grid>
        )}

        {/* La declaracion jurada de aptitud ambiental se solicita en todos los casos */}
        <Grid item xs={12}>
          <DragAndDrop
            readOnly={readOnly}
            dropzoneText="Declaracion jurada de aptitud ambiental (pdf o comprimido max. 5mb)."
            filesLimit={1}
            fileName="Declaracion jurada de aptitud ambiental"
            url={
              typeof values.declaracionJuradaAptitudAmbiental === "string"
                ? values.declaracionJuradaAptitudAmbiental
                : null
            }
            onChange={(files) =>
              onChange(null, { declaracionJuradaAptitudAmbiental: files })
            }
            acceptedFiles={[
              "zip",
              "application/pdf",
              "application/zip",
              "application/x-zip",
              "application/x-zip-compressed",
              "application/octet-stream",
            ]}
            // 5MB
            maxFileSize={5000000}
          />
        </Grid>
        {!readOnly && (
          <Grid item xs={12}>
            <div style={{ display: "flex", alignItems: "center" }}>
              {loading && (
                <CircularProgress style={{ marginRight: 8 }} size={24} />
              )}
              <Button
                variant="contained"
                color="primary"
                type="submit"
                disabled={loading}
                style={{ marginLeft: "auto" }}
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

const formPCUS = {
  // 1.1 Estado Legal
  // DATOS DEL PROPONENTE:
  // calidadDelApoderado: "",
  // CUITApoderado: "",
  // domicilioLegalApoderado: "",
  // emailApoderado: "",

  // DATOS DEL APODERADO:
  calidadDelApoderado: "",
  CUITApoderado: "",
  domicilioLegalApoderado: "",
  emailApoderado: "",

  // DATOS DEL ARRENDATARIO
  calidadDelArrendatario: "",
  CUITArrendatario: "",
  domicilioLegalArrendatario: "",
  emailArrendatario: "",
  vencimientoContratoArrendatario: "",

  // DATOS DE LA PROPIEDAD
  titularDelDominio: "",
  departamento: "",
  nombreDelInmueble: "",
  matricula: "",
  superficieTotal: "",
  categoriasOTBNFinca: "",
  categoriasOTBNProyecto: "",

  // SUPERFICIE (hectareas)
  total: "",
  cultivada: "",
  desmontada: "",
  aDesmontar: "",
  aprovechada: "",
  aAprovechar: "",
  forestada: "",
  aForestar: "",

  // UBICACION
  localidad: "",
  paraje: "",
  accesoDesde: "",
  pr1Coordenadas: "",
  pr2Coordenadas: "",
  pr3Coordenadas: "",
  pr1DetalleUbicacion: "",
  pr2DetalleUbicacion: "",
  pr3DetalleUbicacion: "",

  // CARACTERISTICAS DEL BOSQUE
  tipoDeBosque: "",
  densidadBosque: "",
  gradoExplotacionBosque: "",
  especiesArboreasConMayorAltura: "",
  especiesArboreasMasAbundantes: "",
  diametrosMaximos: "",
  promedioToconesPorHectarea: "",
  especiesDominanteEnSotoBosque: "",

  // CANTIDAD ESTIMADA DE PRODUCTOS A ELABORAR
  rollos: "",
  postes: "",
  lena: "",
  durmientes: "",
  trabillas: "",
  carbon: "",

  // DETALLE VOLUMEN DE MADERA EN ROLLOS:
  detalleMadera: [
    {
      especie: "",
      metrosCubicos: "",
    },
  ],
  destinoComercialDeLosProductos: "",
};

RequisitosTecnicos.propTypes = {
  editable: PropTypes.bool,
};

RequisitosTecnicos.defaultProps = {
  editable: true,
};

export default RequisitosTecnicos;
