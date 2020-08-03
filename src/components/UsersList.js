import { useQuery, useMutation } from "@apollo/react-hooks";
import { CircularProgress, Typography } from "@material-ui/core";
import { Edit as EditIcon } from "@material-ui/icons";
import React from "react";
import { useHistory } from "react-router";
import { GET_ALL_USERS } from "../gql/queries/users";
import { UPDATE_ROLE } from "../gql/mutations/users";
import formatDate from "../utilities/formatDate";
import FormFeedback from "./FormFeedback";
import MaterialTableBase from "./MaterialTableBase";

export default function UsersList() {
  const history = useHistory();
  const { data, loading, error } = useQuery(GET_ALL_USERS, {
    onCompleted(data) {
      console.log("all users", data);
    },
  });

  const [changeRole] = useMutation(UPDATE_ROLE, {
    onCompleted(data) {
      console.log(data);
    },
  });

  const handleUpdateUser = async (newData, oldData) => {
    console.log("newData", newData, "oldData", oldData);
    changeRole({
      variables: { userId: oldData.id, newRole: newData.role },
    });
  };

  if (error) {
    return (
      <FormFeedback ok={false} message="Ha ocurrido un error inesperado" />
    );
  } else if (data && data.allUsers.length) {
    const allUsers = data.allUsers;
    return (
      <MaterialTableBase
        title="Listado de usuarios registrados en el sistema"
        isLoading={loading}
        data={allUsers}
        columns={[
          {
            title: "Id.",
            field: "id",
            editable: "never"
          },
          {
            title: "Nombre",
            editable: "never",
            render: (row) => (
              <Typography variant="body2">
                {`${row.name} ${row.lastname}`}
              </Typography>
            ),
          },
          {
            title: "Email",
            editable: "never",
            field: "email",
          },
          {
            title: "Rol",
            field: "role",
            lookup: {
              PROPONENTE: "PROPONENTE",
              ADMINISTRADOR: "ADMINISTRADOR",
              CONTROL_JURIDICO: "CONTROL JURIDICO",
              CONTROL_TECNICO: "CONTROL TECNICO",
            },
          },
          {
            title: "Fecha de registro",
            editable: "never",
            field: "createdAt",
            render: (row) => (
              <Typography variant="body2">
                {formatDate(row.createdAt, "DD/MM/YYYY")}
              </Typography>
            ),
          },
        ]}
        editable={{
          isEditable: (row) => row.role !== "ADMINISTRADOR",
          onRowUpdate: handleUpdateUser,
        }}
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
