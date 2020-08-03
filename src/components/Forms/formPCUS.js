import {
  Grid,
  Typography,
  MenuItem,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
} from "@material-ui/core";
import PropTypes from "prop-types";
import React from "react";
import {
  TextValidator,
  SelectValidator,
} from "react-material-ui-form-validator";

const FormPCUS = ({ readOnly, onChange, values }) => {
  return (
    <>
      {/* DATOS DEL APODERADO: */}
      <Grid item xs={12}>
        <Typography variant="subtitle2" color="textSecondary" align="left">
          DATOS DEL APODERADO (opcional):
        </Typography>
      </Grid>
      <Grid item xs={6}>
        <SelectValidator
          disabled={readOnly}
          select
          label="Calidad del apoderado"
          fullWidth
          name="calidadDelApoderado"
          value={
            values.calidadDelApoderado
              ? values.calidadDelApoderado
              : "PERSONA HUMANA"
          }
          onChange={onChange}
          variant="outlined"
        >
          <MenuItem value="PERSONA HUMANA">PERSONA HUMANA</MenuItem>
          <MenuItem value="PERSONA JURIDICA">PERSONA JURIDICA</MenuItem>
          <MenuItem value="COMUNIDAD INDIGENA">COMUNIDAD INDIGENA</MenuItem>
        </SelectValidator>
      </Grid>
      <Grid item xs={6}>
        <TextValidator
          disabled={readOnly}
          fullWidth
          variant="outlined"
          onChange={onChange}
          value={values.CUITApoderado ? values.CUITApoderado : ""}
          name="CUITApoderado"
          label="Nro. CUIT"
        />
      </Grid>
      <Grid item xs={6}>
        <TextValidator
          disabled={readOnly}
          fullWidth
          variant="outlined"
          onChange={onChange}
          value={
            values.domicilioLegalApoderado ? values.domicilioLegalApoderado : ""
          }
          name="domicilioLegalApoderado"
          label="Domicilio legal"
        />
      </Grid>
      <Grid item xs={6}>
        <TextValidator
          disabled={readOnly}
          fullWidth
          variant="outlined"
          onChange={onChange}
          value={values.emailApoderado ? values.emailApoderado : ""}
          name="emailApoderado"
          label="Email"
        />
      </Grid>

      {/* DATOS DEL ARRENDATARIO: */}
      <Grid item xs={12}>
        <Typography variant="subtitle2" color="textSecondary" align="left">
          DATOS DEL ARRENDATARIO (opcional):
        </Typography>
      </Grid>
      <Grid item xs={6}>
        <SelectValidator
          disabled={readOnly}
          select
          label="Calidad del arrendatario"
          fullWidth
          name="calidadDelArrendatario"
          value={
            values.calidadDelArrendatario
              ? values.calidadDelArrendatario
              : "PERSONA HUMANA"
          }
          onChange={onChange}
          variant="outlined"
        >
          <MenuItem value="PERSONA HUMANA">PERSONA HUMANA</MenuItem>
          <MenuItem value="PERSONA JURIDICA">PERSONA JURIDICA</MenuItem>
          <MenuItem value="COMUNIDAD INDIGENA">COMUNIDAD INDIGENA</MenuItem>
        </SelectValidator>
      </Grid>
      <Grid item xs={6}>
        <TextValidator
          disabled={readOnly}
          fullWidth
          variant="outlined"
          onChange={onChange}
          value={values.CUITArrendatario ? values.CUITArrendatario : ""}
          name="CUITArrendatario"
          label="Nro. CUIT"
        />
      </Grid>
      <Grid item xs={6}>
        <TextValidator
          disabled={readOnly}
          fullWidth
          variant="outlined"
          onChange={onChange}
          value={
            values.domicilioLegalArrendatario
              ? values.domicilioLegalArrendatario
              : ""
          }
          name="domicilioLegalArrendatario"
          label="Domicilio legal"
        />
      </Grid>
      <Grid item xs={6}>
        <TextValidator
          disabled={readOnly}
          fullWidth
          variant="outlined"
          onChange={onChange}
          value={values.emailArrendatario ? values.emailArrendatario : ""}
          name="emailArrendatario"
          label="Email"
        />
      </Grid>
      <Grid item xs={12}>
        <TextValidator
          disabled={readOnly}
          fullWidth
          variant="outlined"
          onChange={onChange}
          value={
            values.vencimientoContratoArrendatario
              ? values.vencimientoContratoArrendatario
              : ""
          }
          name="vencimientoContratoArrendatario"
          label="Vencimiento del contrato (DD/MM/AAAA)"
        />
      </Grid>
      {/* DATOS DE LA PROPIEDAD: */}
      <Grid item xs={12}>
        <Typography variant="subtitle2" color="textSecondary" align="left">
          DATOS DE LA PROPIEDAD:
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <TextValidator
          disabled={readOnly}
          validators={["required"]}
          errorMessages={["Este campo es requerido"]}
          fullWidth
          variant="outlined"
          onChange={onChange}
          value={values.titularDelDominio ? values.titularDelDominio : ""}
          name="titularDelDominio"
          label="Titular del dominio"
        />
      </Grid>
      <Grid item xs={6}>
        <TextValidator
          disabled={readOnly}
          validators={["required"]}
          errorMessages={["Este campo es requerido"]}
          fullWidth
          variant="outlined"
          onChange={onChange}
          value={values.departamento ? values.departamento : ""}
          name="departamento"
          label="Departamento"
        />
      </Grid>
      <Grid item xs={6}>
        <TextValidator
          disabled={readOnly}
          validators={["required"]}
          errorMessages={["Este campo es requerido"]}
          fullWidth
          variant="outlined"
          onChange={onChange}
          value={values.nombreDelInmueble ? values.nombreDelInmueble : ""}
          name="nombreDelInmueble"
          label="Nombre del inmueble"
        />
      </Grid>
      <Grid item xs={6}>
        <TextValidator
          disabled={readOnly}
          validators={["required"]}
          errorMessages={["Este campo es requerido"]}
          fullWidth
          variant="outlined"
          onChange={onChange}
          value={values.matricula ? values.matricula : ""}
          name="matricula"
          label="Matricula"
        />
      </Grid>
      <Grid item xs={6}>
        <TextValidator
          disabled={readOnly}
          validators={["required"]}
          errorMessages={["Este campo es requerido"]}
          type="number"
          fullWidth
          variant="outlined"
          onChange={onChange}
          value={values.superficieTotal ? values.superficieTotal : ""}
          name="superficieTotal"
          label="Superficie total (hectareas)"
        />
      </Grid>
      <Grid item xs={6}>
        <TextValidator
          disabled={readOnly}
          fullWidth
          variant="outlined"
          onChange={onChange}
          value={values.categoriasOTBNFinca ? values.categoriasOTBNFinca : ""}
          name="categoriasOTBNFinca"
          label="Categoria/s OTBN (finca)"
        />
      </Grid>
      <Grid item xs={6}>
        <TextValidator
          disabled={readOnly}
          fullWidth
          variant="outlined"
          onChange={onChange}
          value={
            values.categoriasOTBNProyecto ? values.categoriasOTBNProyecto : ""
          }
          name="categoriasOTBNProyecto"
          label="Categoria/s OTBN (proyecto)"
        />
      </Grid>

      {/* DATOS DE LA SUPERFICIE: */}
      <Grid item xs={12}>
        <Typography variant="subtitle2" color="textSecondary" align="left">
          DATOS DE LA SUPERFICIE (En hectareas):
        </Typography>
      </Grid>
      <Grid item xs={4}>
        <TextValidator
          disabled={readOnly}
          type="number"
          validators={["required"]}
          errorMessages={["Requerido"]}
          fullWidth
          variant="outlined"
          onChange={onChange}
          value={values.total ? values.total : ""}
          name="total"
          label="Total"
        />
      </Grid>
      <Grid item xs={4}>
        <TextValidator
          disabled={readOnly}
          type="number"
          validators={["required"]}
          errorMessages={["Requerido"]}
          fullWidth
          variant="outlined"
          onChange={onChange}
          value={values.cultivada ? values.cultivada : ""}
          name="cultivada"
          label="Cultivada"
        />
      </Grid>
      <Grid item xs={4}>
        <TextValidator
          disabled={readOnly}
          type="number"
          validators={["required"]}
          errorMessages={["Requerido"]}
          fullWidth
          variant="outlined"
          onChange={onChange}
          value={values.desmontada ? values.desmontada : ""}
          name="desmontada"
          label="Desmontada"
        />
      </Grid>
      <Grid item xs={4}>
        <TextValidator
          disabled={readOnly}
          type="number"
          validators={["required"]}
          errorMessages={["Requerido"]}
          fullWidth
          variant="outlined"
          onChange={onChange}
          value={values.aDesmontar ? values.aDesmontar : ""}
          name="aDesmontar"
          label="A desmontar"
        />
      </Grid>
      <Grid item xs={4}>
        <TextValidator
          disabled={readOnly}
          type="number"
          validators={["required"]}
          errorMessages={["Requerido"]}
          fullWidth
          variant="outlined"
          onChange={onChange}
          value={values.aprovechada ? values.aprovechada : ""}
          name="aprovechada"
          label="Aprovechada"
        />
      </Grid>
      <Grid item xs={4}>
        <TextValidator
          disabled={readOnly}
          type="number"
          validators={["required"]}
          errorMessages={["Requerido"]}
          fullWidth
          variant="outlined"
          onChange={onChange}
          value={values.aAprovechar ? values.aAprovechar : ""}
          name="aAprovechar"
          label="A aprovechar"
        />
      </Grid>
      <Grid item xs={4}>
        <TextValidator
          disabled={readOnly}
          type="number"
          validators={["required"]}
          errorMessages={["Requerido"]}
          fullWidth
          variant="outlined"
          onChange={onChange}
          value={values.forestada ? values.forestada : ""}
          name="forestada"
          label="Forestada"
        />
      </Grid>
      <Grid item xs={4}>
        <TextValidator
          disabled={readOnly}
          type="number"
          validators={["required"]}
          errorMessages={["Requerido"]}
          fullWidth
          variant="outlined"
          onChange={onChange}
          value={values.aForestar ? values.aForestar : ""}
          name="aForestar"
          label="A forestar"
        />
      </Grid>

      {/* DATOS DE LA UBICACION: */}
      <Grid item xs={12}>
        <Typography variant="subtitle2" color="textSecondary" align="left">
          DATOS DE LA UBICACION:
        </Typography>
      </Grid>
      <Grid item xs={6}>
        <TextValidator
          disabled={readOnly}
          validators={["required"]}
          errorMessages={["Requerido"]}
          fullWidth
          variant="outlined"
          onChange={onChange}
          value={values.localidad ? values.localidad : ""}
          name="localidad"
          label="Localidad"
        />
      </Grid>
      <Grid item xs={6}>
        <TextValidator
          disabled={readOnly}
          validators={["required"]}
          errorMessages={["Requerido"]}
          fullWidth
          variant="outlined"
          onChange={onChange}
          value={values.paraje ? values.paraje : ""}
          name="paraje"
          label="Paraje"
        />
      </Grid>
      <Grid item xs={12}>
        <TextValidator
          disabled={readOnly}
          validators={["required"]}
          errorMessages={["Requerido"]}
          fullWidth
          variant="outlined"
          onChange={onChange}
          value={values.accesoDesde ? values.accesoDesde : ""}
          name="accesoDesde"
          label="Acceso desde"
        />
      </Grid>
      <Grid item xs={12}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell style={{ width: "20%" }}>
                {" "}
                Pto. de referencia{" "}
              </TableCell>
              <TableCell style={{ width: "30%" }}>
                {" "}
                Coordenadas (x, y){" "}
              </TableCell>
              <TableCell> Detalle de la ubicacion </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell>PR1</TableCell>
              <TableCell>
                <TextValidator
                  disabled={readOnly}
                  validators={["required"]}
                  errorMessages={["Requerido"]}
                  fullWidth
                  variant="outlined"
                  size="small"
                  onChange={onChange}
                  value={values.pr1Coordenadas ? values.pr1Coordenadas : ""}
                  name="pr1Coordenadas"
                />
              </TableCell>
              <TableCell>
                <TextValidator
                  disabled={readOnly}
                  validators={["required"]}
                  errorMessages={["Requerido"]}
                  fullWidth
                  variant="outlined"
                  size="small"
                  onChange={onChange}
                  value={
                    values.pr1DetalleUbicacion ? values.pr1DetalleUbicacion : ""
                  }
                  name="pr1DetalleUbicacion"
                />
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>PR2</TableCell>
              <TableCell>
                <TextValidator
                  disabled={readOnly}
                  fullWidth
                  variant="outlined"
                  size="small"
                  onChange={onChange}
                  value={values.pr2Coordenadas ? values.pr2Coordenadas : ""}
                  name="pr2Coordenadas"
                />
              </TableCell>
              <TableCell>
                <TextValidator
                  disabled={readOnly}
                  fullWidth
                  variant="outlined"
                  size="small"
                  onChange={onChange}
                  value={
                    values.pr2DetalleUbicacion ? values.pr2DetalleUbicacion : ""
                  }
                  name="pr2DetalleUbicacion"
                />
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>PR3</TableCell>
              <TableCell>
                <TextValidator
                  disabled={readOnly}
                  fullWidth
                  variant="outlined"
                  size="small"
                  onChange={onChange}
                  value={values.pr3Coordenadas ? values.pr3Coordenadas : ""}
                  name="pr3Coordenadas"
                />
              </TableCell>
              <TableCell>
                <TextValidator
                  disabled={readOnly}
                  fullWidth
                  variant="outlined"
                  size="small"
                  onChange={onChange}
                  value={
                    values.pr3DetalleUbicacion ? values.pr3DetalleUbicacion : ""
                  }
                  name="pr3DetalleUbicacion"
                />
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </Grid>

      {/* CARACTERISTICAS DEL BOSQUE: */}
      <Grid item xs={12}>
        <Typography variant="subtitle2" color="textSecondary" align="left">
          CARACTERISTICAS DEL BOSQUE
        </Typography>
      </Grid>
      <Grid item xs={4}>
        <SelectValidator
          disabled={readOnly}
          select
          fullWidth
          label="Tipo de bosque"
          name="tipoDeBosque"
          value={values.tipoDeBosque ? values.tipoDeBosque : "SELVA TUCUMANO"}
          onChange={onChange}
          variant="outlined"
        >
          <MenuItem value="SELVA TUCUMANO">SELVA TUCUMANO</MenuItem>
          <MenuItem value="SELVA DE TRANSICION">SELVA DE TRANSICION</MenuItem>
          <MenuItem value="PARQUE CHAQUEÑO">PARQUE CHAQUEÑO</MenuItem>
          <MenuItem value="CHACO SERRANO">CHACO SERRANO</MenuItem>
        </SelectValidator>
      </Grid>
      <Grid item xs={4}>
        <SelectValidator
          disabled={readOnly}
          select
          fullWidth
          label="Densidad"
          name="densidadBosque"
          value={values.densidadBosque ? values.densidadBosque : "MUY DENSO"}
          onChange={onChange}
          variant="outlined"
        >
          <MenuItem value="MUY DENSO">MUY DENSO</MenuItem>
          <MenuItem value="DENSO">DENSO</MenuItem>
          <MenuItem value="MEDIO">MEDIO</MenuItem>
          <MenuItem value="RALO">RALO</MenuItem>
        </SelectValidator>
      </Grid>
      <Grid item xs={4}>
        <SelectValidator
          disabled={readOnly}
          select
          fullWidth
          label="Explotacion"
          name="gradoExplotacionBosque"
          value={
            values.gradoExplotacionBosque
              ? values.gradoExplotacionBosque
              : "VIRGEN"
          }
          onChange={onChange}
          variant="outlined"
        >
          <MenuItem value="VIRGEN">VIRGEN</MenuItem>
          <MenuItem value="SEMIEXPLOTADO">SEMIEXPLOTADO</MenuItem>
          <MenuItem value="EXPLOTADO">EXPLOTADO</MenuItem>
          <MenuItem value="DEGRADADO">DEGRADADO</MenuItem>
        </SelectValidator>
      </Grid>
      <Grid item xs={12}>
        <TextValidator
          disabled={readOnly}
          validators={["required"]}
          errorMessages={["Requerido"]}
          fullWidth
          variant="outlined"
          onChange={onChange}
          value={
            values.especiesArboreasConMayorAltura
              ? values.especiesArboreasConMayorAltura
              : ""
          }
          name="especiesArboreasConMayorAltura"
          label="Especies arbóreas con mayor altura"
        />
      </Grid>
      <Grid item xs={12}>
        <TextValidator
          disabled={readOnly}
          validators={["required"]}
          errorMessages={["Requerido"]}
          fullWidth
          variant="outlined"
          onChange={onChange}
          value={
            values.especiesArboreasMasAbundantes
              ? values.especiesArboreasMasAbundantes
              : ""
          }
          name="especiesArboreasMasAbundantes"
          label="Especies arboreas mas abundantes"
        />
      </Grid>
      <Grid item xs={12}>
        <TextValidator
          disabled={readOnly}
          validators={["required"]}
          errorMessages={["Requerido"]}
          fullWidth
          variant="outlined"
          onChange={onChange}
          value={values.diametrosMaximos ? values.diametrosMaximos : ""}
          name="diametrosMaximos"
          label="Diametros máximos (detallar especie)"
        />
      </Grid>
      <Grid item xs={12}>
        <TextValidator
          disabled={readOnly}
          validators={["required"]}
          errorMessages={["Requerido"]}
          fullWidth
          variant="outlined"
          onChange={onChange}
          value={
            values.promedioToconesPorHectarea
              ? values.promedioToconesPorHectarea
              : ""
          }
          name="promedioToconesPorHectarea"
          label="Promedio de toconoes/hectarea"
        />
      </Grid>
      <Grid item xs={12}>
        <TextValidator
          disabled={readOnly}
          validators={["required"]}
          errorMessages={["Requerido"]}
          fullWidth
          variant="outlined"
          onChange={onChange}
          value={
            values.especiesDominanteEnSotoBosque
              ? values.especiesDominanteEnSotoBosque
              : ""
          }
          name="especiesDominanteEnSotoBosque"
          label="Especies dominantes en sotobosque"
        />
      </Grid>
      <Grid item xs={12}>
        <Typography variant="subtitle2" color="textSecondary" align="left">
          CANTIDAD ESTIMADA DE PRODUCTOS A ELABORAR:
        </Typography>
      </Grid>
      <Grid item xs={4}>
        <TextValidator
          disabled={readOnly}
          validators={["required"]}
          errorMessages={["Requerido"]}
          type="number"
          fullWidth
          variant="outlined"
          onChange={onChange}
          value={values.rollos ? values.rollos : ""}
          name="rollos"
          label="Rollos (m3)"
        />
      </Grid>
      <Grid item xs={4}>
        <TextValidator
          disabled={readOnly}
          validators={["required"]}
          errorMessages={["Requerido"]}
          type="number"
          fullWidth
          variant="outlined"
          onChange={onChange}
          value={values.postes ? values.postes : ""}
          name="postes"
          label="Postes (Unidades)"
        />
      </Grid>
      <Grid item xs={4}>
        <TextValidator
          disabled={readOnly}
          validators={["required"]}
          errorMessages={["Requerido"]}
          type="number"
          fullWidth
          variant="outlined"
          onChange={onChange}
          value={values.lena ? values.lena : ""}
          name="lena"
          label="Leña (Tn)"
        />
      </Grid>
      <Grid item xs={4}>
        <TextValidator
          disabled={readOnly}
          validators={["required"]}
          errorMessages={["Requerido"]}
          type="number"
          fullWidth
          variant="outlined"
          onChange={onChange}
          value={values.durmientes ? values.durmientes : ""}
          name="durmientes"
          label="Durmientes (unidades)"
        />
      </Grid>
      <Grid item xs={4}>
        <TextValidator
          disabled={readOnly}
          validators={["required"]}
          errorMessages={["Requerido"]}
          type="number"
          fullWidth
          variant="outlined"
          onChange={onChange}
          value={values.trabillas ? values.trabillas : ""}
          name="trabillas"
          label="Trabillas (unidades)"
        />
      </Grid>
      <Grid item xs={4}>
        <TextValidator
          disabled={readOnly}
          validators={["required"]}
          errorMessages={["Requerido"]}
          type="number"
          fullWidth
          variant="outlined"
          onChange={onChange}
          value={values.carbon ? values.carbon : ""}
          name="carbon"
          label="Carbón (Tn)"
        />
      </Grid>
      <Grid item xs={12}>
        <TextValidator
          disabled={readOnly}
          validators={["required"]}
          errorMessages={["Requerido"]}
          type="text"
          fullWidth
          variant="outlined"
          onChange={onChange}
          value={
            values.destinoComercialDeLosProductos
              ? values.destinoComercialDeLosProductos
              : ""
          }
          name="destinoComercialDeLosProductos"
          label="Destino comercial de los productos"
        />
      </Grid>
      {/* <Grid item xs={12}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Especie</TableCell>
              <TableCell>Metros cúbicos</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {values.detalleMadera.map((detalle, i) => (
              <TableRow>
              {console.log(detalle)}
                <TableCell>
                  <TextValidator
                    validators={["required"]}
                    errorMessages={["Requerido"]}
                    type="number"
                    fullWidth
                    variant="outlined"
                    onChange={onChange}
                    value={detalle.especie ? detalle.especie : ""}
                    name={`detalleMadera[${i}].especie`}
                    label="Carbón (Tn)"
                  />
                </TableCell>
                <TableCell>
                  <TextValidator
                    validators={["required"]}
                    errorMessages={["Requerido"]}
                    type="number"
                    fullWidth
                    variant="outlined"
                    onChange={onChange}
                    value={detalle.metrosCubicos ? detalle.metrosCubicos : ""}
                    name={`detalleMadera[${i}].metrosCubicos`}
                    label="Carbón (Tn)"
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Grid> */}
    </>
  );
};

FormPCUS.propTypes = {
  editable: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
  values: PropTypes.object,
};

FormPCUS.defaultProps = {
  editable: true,
  onChange: null,
  // values: fields,
};

export default FormPCUS;
