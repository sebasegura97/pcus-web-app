import {
  Collapse,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  CircularProgress,
} from "@material-ui/core/";
import { makeStyles } from "@material-ui/core/styles";
import AddBoxIcon from "@material-ui/icons/AddBox";
import AssignmentIcon from "@material-ui/icons/Assignment";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import ListAltIcon from "@material-ui/icons/ListAlt";
import PeopleAltIcon from '@material-ui/icons/PeopleAlt';
import BarChartIcon from '@material-ui/icons/BarChart';
import React from "react";
import { Link, withRouter } from "react-router-dom";
import { useQuery } from "@apollo/react-hooks";
import { GET_CURRENT_USER } from "../gql/queries/users";

const menuProponente = [
  {
    path: "/user/procedures",
    label: "Mis procedimientos",
    icon: (color) => <AssignmentIcon color={color} />,
  },
  {
    path: "/procedures/new",
    label: "Iniciar procedimiento",
    icon: (color) => <AddBoxIcon color={color} />,
  },
  {
    path: "/guia",
    label: "Guía",
    icon: (color) => <ListAltIcon color={color} />,
  },
];

const menuControlJuridico = [
  {
    path: "/admin/procedures",
    label: "Procedimientos",
    icon: (color) => <AssignmentIcon color={color} />,
  },
];

const menuControlTecnico = [
  {
    path: "/admin/procedures",
    label: "Procedimientos",
    icon: (color) => <AssignmentIcon color={color} />,
  }
];

const menuAdministrador = [
  {
    path: "/admin/procedures",
    label: "Procedimientos",
    icon: (color) => <AssignmentIcon color={color} />,
  },
  {
    path: "/admin/users",
    label: "Usuarios",
    icon: (color) =>
     <PeopleAltIcon color={color} />,
  },
  {
    path: "/admin/statistics",
    label: "Estadísticas",
    icon: (color) =>
     <BarChartIcon color={color} />,
  },
];

const useStyles = makeStyles((theme) => ({
  nested: {
    paddingLeft: theme.spacing(4),
  },
  link: {
    color: theme.palette.text.secondary,
    textDecoration: "none",
  },
  linkSelected: {
    color: "#0EABEF",
    textDecoration: "none",
  },
}));

const Menu = ({ history }) => {
  const classes = useStyles();
  const { data, loading } = useQuery(GET_CURRENT_USER);
  const [subMenu, setSubMenu] = React.useState("");
  const handleSubMenu = (path) => {
    subMenu === path ? setSubMenu("") : setSubMenu(path);
  };

  const getMenuRoleBased = () => {
    switch (data.me.role) {
      case "CONTROL_TECNICO":
        return menuControlTecnico
      case "CONTROL_JURIDICO":
        return menuControlJuridico
      case "PROPONENTE":
        return menuProponente
      case "ADMINISTRADOR":
        return menuAdministrador
      default:
        break;
    }
  }

  if (data) {
    const menu = getMenuRoleBased();
    return menu.map((item, index) => {
      if (item.subitems) {
        return (
          <React.Fragment key={index}>
            <ListItem
              className={
                history.location.pathname.includes(item.path)
                  ? classes.linkSelected
                  : classes.link
              }
              button
              onClick={() => handleSubMenu(item.path)}
            >
              <ListItemIcon>
                {item.icon(
                  history.location.pathname.includes(item.path)
                    ? "secondary"
                    : "inherit"
                )}
              </ListItemIcon>
              <ListItemText primary={item.label} />
              {subMenu === item.path ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
            <Collapse in={subMenu === item.path} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                {item.subitems.map((subitem, index) => {
                  return (
                    <Link
                      to={subitem.path}
                      key={index}
                      className={
                        history.location.pathname.includes(subitem.path)
                          ? classes.linkSelected
                          : classes.link
                      }
                    >
                      <ListItem button className={classes.nested}>
                        <ListItemIcon>
                          {subitem.icon(
                            history.location.pathname.includes(subitem.path)
                              ? "secondary"
                              : "inherit"
                          )}
                        </ListItemIcon>
                        <ListItemText primary={subitem.label} />
                      </ListItem>
                    </Link>
                  );
                })}
              </List>
            </Collapse>
          </React.Fragment>
        );
      } else {
        return (
          <Link
            to={item.path}
            className={
              history.location.pathname.includes(item.path)
                ? classes.linkSelected
                : classes.link
            }
            key={index}
          >
            <ListItem button>
              <ListItemIcon>
                {item.icon(
                  history.location.pathname.includes(item.path)
                    ? "primary"
                    : "inherit"
                )}
              </ListItemIcon>
              <ListItemText primary={item.label} />
            </ListItem>
          </Link>
        );
      }
    });
  } else {
    return <CircularProgress />
  }
};

export default withRouter(Menu);
