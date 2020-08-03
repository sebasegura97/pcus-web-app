import {
  AppBar,
  CssBaseline,
  Divider,
  Drawer,
  Hidden,
  IconButton,
  Toolbar,
  Typography,
  Grid,
  Avatar,
  CircularProgress,
  Button,
  Popper,
  Menu as MaterialMenu,
  MenuItem,
  Badge,
} from "@material-ui/core";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import MenuIcon from "@material-ui/icons/Menu";
import PropTypes from "prop-types";
import React from "react";
import { withRouter, useHistory } from "react-router-dom";
import Main from "./Main";
import Menu from "./Menu";
import { useQuery, useApolloClient } from "@apollo/react-hooks";
import { GET_CURRENT_USER, GET_NOTIFICATIONS } from "../gql/queries/users";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import NotificationsIcon from "@material-ui/icons/Notifications";
// import { useQuery } from "@apollo/react-hooks";
// import { GET_CURRENT_USER } from "../graphql/queries/users";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  drawer: {
    [theme.breakpoints.up("lg")]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  appBar: {
    marginLeft: drawerWidth,
    [theme.breakpoints.up("lg")]: {
      width: `calc(100% - ${drawerWidth}px)`,
    },
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up("lg")]: {
      display: "none",
    },
  },
  toolbar: {
    ...theme.mixins.toolbar,
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1),
  },
  drawerPaper: {
    width: drawerWidth,
  },
  content: {
    flexGrow: 1,
    background: "white",
    height: `calc(100vh - 80px)`,
    padding: theme.spacing(3),
    marginTop: theme.spacing(10),
    marginRight: theme.spacing(2),
    marginLeft: theme.spacing(2),
    overflow: "auto",
  },
  link: {
    color: theme.palette.text.hint,
    textDecoration: "none",
  },
  linkSelected: {
    color: "#0EABEF",
    textDecoration: "none",
  },
  logo: {
    width: 150,
  },
  username: {
    marginLeft: theme.spacing(2),
    lineHeight: "normal",
  },
  role: {
    display: "block",
    lineHeight: "normal",
  },
  notificationsIcon: {
    marginLeft: "auto",
  },
}));

function DrawerNavigation(props) {
  const { container } = props;
  const classes = useStyles();
  const theme = useTheme();
  const client = useApolloClient();
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const history = useHistory();

  const { data, loading, error } = useQuery(GET_CURRENT_USER);
  const { data: notifications } = useQuery(GET_NOTIFICATIONS, {
    variables: { readed: false },
    pollInterval: 60000,
    onCompleted(data) {
      console.log("notifications", data);
    },
  });

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleNotificationClick = () => {
    history.push("/user/notifications");
  };

  const handleLogout = () => {
    try {
      localStorage.removeItem("token");
      localStorage.removeItem("refreshToken");
      client.clearStore();
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };
  const drawer = (
    <div>
      {/* Aqui va la info del usuario logueado: */}
      <Grid
        container
        alignContent="center"
        alignItems="center"
        justify="flex-start"
        className={classes.toolbar}
      >
        {loading && <CircularProgress />}
        {error && (
          <Typography variant="caption" color="error">
            {" "}
            Ha ocurrido un error buscando el usuario{" "}
          </Typography>
        )}
        {data && data.me && (
          <>
            <Avatar className={classes.avatar}>
              {" "}
              {data.me.name.slice(0, 1)}{" "}
            </Avatar>
            <Typography className={classes.username}>
              {" "}
              {data.me.name}{" "}
              <Typography className={classes.role} variant="overline">
                {" "}
                {data.me.role}{" "}
              </Typography>
            </Typography>
          </>
        )}
      </Grid>
      <Divider />
      <Menu />
      <Divider />
      <Button
        endIcon={<ExitToAppIcon />}
        variant="text"
        onClick={handleLogout}
        color="secondary"
        style={{ position: "absolute", bottom: 0, right: 8 }}
      >
        CERRAR SESION
      </Button>
    </div>
  );

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <IconButton
            aria-label="open drawer"
            edge="start"
            color="inherit"
            onClick={handleDrawerToggle}
            className={classes.menuButton}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h5">PCUS - Tramites</Typography>
          <IconButton
            onClick={handleNotificationClick}
            aria-describedby="notifications"
            className={classes.notificationsIcon}
            color="inherit"
          >
            <Badge
              color="secondary"
              badgeContent={
                notifications && notifications.getNotifications
                  ? notifications.getNotifications.totalCount
                  : 0
              }
            >
              <NotificationsIcon />
            </Badge>
          </IconButton>
        </Toolbar>
      </AppBar>
      <nav className={classes.drawer} aria-label="mailbox folders">
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Hidden lgUp implementation="css">
          <Drawer
            container={container}
            variant="temporary"
            anchor={theme.direction === "rtl" ? "right" : "left"}
            open={mobileOpen}
            onClose={handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper,
            }}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
          >
            {drawer}
          </Drawer>
        </Hidden>
        <Hidden mdDown implementation="css">
          <Drawer
            classes={{
              paper: classes.drawerPaper,
            }}
            variant="permanent"
            open
          >
            {drawer}
          </Drawer>
        </Hidden>
      </nav>
      <div className={classes.content}>
        <Main>{props.children}</Main>
      </div>
    </div>
  );
}

DrawerNavigation.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  container: PropTypes.instanceOf(
    typeof Element === "undefined" ? Object : Element
  ),
};

export default withRouter(DrawerNavigation);
