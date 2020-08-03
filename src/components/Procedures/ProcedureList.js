import React from "react";
import MaterialTableBase from "../MaterialTableBase";
import { useQuery } from "@apollo/react-hooks";
import { GET as GET_PROCEDURES } from "../../gql/queries/procedure";
import FormFeedback from "../FormFeedback";
import { CircularProgress, Typography } from "@material-ui/core";
import formatDate from "../../utilities/formatDate";
import { Visibility as VisibilityIcon } from "@material-ui/icons";
import { useHistory } from "react-router";

export default function ProcedureList() {
  const history = useHistory();
  const { data, loading, error } = useQuery(GET_PROCEDURES);

  if (error) {
    return (
      <FormFeedback ok={false} message="Ha ocurrido un error inesperado" />
    );
  } else if (data && data.procedures.ok) {
    const procedures = data.procedures.procedures;
    return (
      <MaterialTableBase
        title="Listado de proedimientos iniciados"
        isLoading={loading}
        data={procedures}
        columns={[
          {
            title: "Nro.",
            field: "id",
          },
          {
            title: "Proponente",
            render: (row) => (
              <Typography variant="body2">
                {row.razonSocial
                  ? row.razonSocial
                  : row.denominacion
                  ? row.denominacion
                  : `${row.nombreProponente} ${row.apellidoProponente}`}
              </Typography>
            ),
          },
          {
            title: "TRP",
            render: (row) => (
              <Typography variant="body2">
                {`${row.nombreTRP} ${row.apellidoTRP}`}
              </Typography>
            ),
          },
          {
            title: "Estado",
            field: "estado",
            render: (row) => (
              <Typography variant="body2">{row.estado}</Typography>
            ),
          },
          {
            title: "Inicio",
            field: "createdAt",
            render: (row) => (
              <Typography variant="body2">
                {formatDate(row.createdAt, "DD/MM/YYYY")}
              </Typography>
            ),
          },
          {
            title: "Ultima act.",
            field: "updatedAt",
            render: (row) => (
              <Typography variant="body2">
                {formatDate(row.updatedAt, "DD/MM/YYYY")}
              </Typography>
            ),
          },
        ]}
        actions={[
          {
            icon: () => <VisibilityIcon />,
            tooltip: "Ver",
            onClick: (e, row) => history.push(`/admin/procedure/${row.id}`),
          },
        ]}
        options={{
          actionsColumnIndex: -1,
          pageSize: 10,
          tableLayout: "auto",
        }}
      />
    );
  } else {
    return <CircularProgress />;
  }
}
