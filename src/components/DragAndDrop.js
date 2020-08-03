import React from "react";
import PropTypes from "prop-types";
import { makeStyles, Typography, Button } from "@material-ui/core";
import { DropzoneArea } from "material-ui-dropzone";
import CloudOffIcon from "@material-ui/icons/CloudOff";
import CloudDownloadIcon from "@material-ui/icons/CloudDownload";

const useStyles = makeStyles((theme) => ({
  dropzone: {
    backgroundColor: "white",
    border: "1px dashed rgba(0,0,0,0.40)",
    borderRadius: 4,
    minHeight: 56,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    padding: "18.5px 14px",
  },
  dropzoneParagraphClass: {
    margin: 0,
    fontSize: 16,
    color: "rgba(0,0,0,0.6)",
  },
  feedbackIcon: {
    fontSize: 36,
  },
  spanButton: {
    color: "#00796B",
    textDecoration: "underline",
    "&:hover": {
      cursor: "pointer",
    },
  },
}));

export const DragAndDrop = (props) => {
  const classes = useStyles();
  const [preview, setPreview] = React.useState();

  React.useEffect(() => {
    const { url, readOnly } = props;
    if (url || readOnly) {
      setPreview(true);
    }
  }, [props.readOnly, props.url]);

  if (preview) {
    if (props.url) {
      return (
        // Agregar: boton para cambiar imagen si readOnly = false;
        <div className={classes.dropzone}>
          <Typography variant="subtitle2" color="textSecondary">
            {props.fileName}
          </Typography>
          <a href={props.url} download target="_blank">
            <CloudDownloadIcon
              color="primary"
              className={classes.feedbackIcon}
            />
          </a>
          {!props.readOnly && (
            <Typography variant="caption" color="textSecondary">
              Para cambiar el archivo haga{" "}
              <span
                className={classes.spanButton}
                onClick={() => setPreview(false)}
              >
                click aqui
              </span>
            </Typography>
          )}
        </div>
      );
    } else {
      return (
        // Agregar: Boton para subir archivos si readOnly = false;
        <div className={classes.dropzone}>
          <Typography variant="subtitle2" color="textSecondary">
            {props.fileName}
          </Typography>
          <CloudOffIcon color="disabled" className={classes.feedbackIcon} />
          <Typography variant="caption" color="textSecondary">
            No se han subido archivos
          </Typography>
          {!props.readOnly && (
            <Typography variant="caption" color="textSecondary">
              Para subir un archivo haga{" "}
              <span
                className={classes.spanButton}
                onClick={() => setPreview(false)}
              >
                click aqui
              </span>
            </Typography>
          )}
        </div>
      );
    }
  } else {
    return (
      <DropzoneArea
        dropzoneClass={classes.dropzone}
        dropzoneParagraphClass={classes.dropzoneParagraphClass}
        useChipsForPreview={true}
        showPreviewsInDropzone={true}
        showAlerts={true}
        {...props}
      />
    );
  }
};

DragAndDrop.propTypes = {
  fileName: PropTypes.string,
  url: PropTypes.string,
  readOnly: PropTypes.bool,
};

DragAndDrop.defaultProps = {
  readOnly: false,
};

export default DragAndDrop;
