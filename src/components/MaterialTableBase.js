import React from 'react'
import MaterialTable from "material-table"

export default function MaterialTableBase(props) {
  const baseLocalization = {
          toolbar: {
            searchPlaceholder: "Buscar"
          },
          header: {
            actions: ""
          },
          body: {
            addTooltip: "Agregar",
            emptyDataSourceMessage: "No hay datos que mostrar",
            editRow: {
              deleteText:
                "Al eliminar un proveedor tambien se eliminan los productos asociados. ¿Está seguro que desea eliminar?",
              saveTooltip: "confirmar",
              cancelTooltip: "cancelar",
            }
          },
          pagination: {
            firstTooltip: "Primera",
            lastTooltip: "Ultima",
            nextTooltip: "Siguiente",
            previousTooltip: "Anterior",
            labelRowsSelect: "filas",
            labelDisplayedRows: "{from}-{to} de {count}"
          }
        }
    return (
      <MaterialTable
        options={{
          actionsColumnIndex: -1
        }}
        style={{ marginTop: 18, boxShadow: "none" }}
        {...props}
        localization={{...baseLocalization, ...props.localization}}

      />
    );
}
