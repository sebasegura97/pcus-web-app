import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";
import React, { Fragment } from "react";
import { hot } from "react-hot-loader";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import "./App.css";
import Theme from "./components/Theme";
import { IS_LOGGED_IN } from "./gql/queries/auth";
import { GET_CURRENT_USER } from "./gql/queries/users";
import { useQuery, useLazyQuery } from "@apollo/react-hooks";
import LoginPage from "./pages/Login";
import RegisterPage from "./pages/Register";
import ResetPasswordPage from "./pages/ResetPassword";
import ForgotPasswordPage from "./pages/ForgotPassword";
import UserProcedures from "./components/Procedures/UserProcedures";
import BeginProcedure from "./components/Procedures/BeginProcedure";
import UpdateProcedure from "./components/Procedures/UpdateProcedure";
import StarterGuide from "./components/Procedures/StarterGuide";
import ProcedureList from "./components/Procedures/ProcedureList";
import ReviewProcedure from "./components/Procedures/ReviewProcedure";
import Notifications from "./components/Notifications";
import UsersList from "./components/UsersList";
import Statistics from "./components/Statistics";

const theme = createMuiTheme({
  palette: {
    type: "light",
    primary: {
      main: "#00796B",
      contrastText: "#fff",
    },
    secondary: {
      main: "#FF5722",
    },
  },
});

// Disable form submit on enter key press
window.addEventListener(
  "keydown",
  function (e) {
    if (
      e.keyIdentifier === "U+000A" ||
      e.keyIdentifier === "Enter" ||
      e.keyCode === 13
    ) {
      if (e.target.nodeName === "INPUT" && e.target.type === "text") {
        e.preventDefault();
        return false;
      }
    }
  },
  true
);

function Content({ isLoggedIn, role }) {
  if (isLoggedIn) {
    return (
      <Theme>
        <Switch>
          {role === "PROPONENTE" ? (
            <>
              <Redirect exact from="/" to="/user/procedures" />
              <Redirect exact from="/login" to="/user/procedures" />
              <Route path="/procedures/new" component={BeginProcedure} />
              <Route path="/procedure/:id" component={UpdateProcedure} />
              <Route path="/user/procedures" component={UserProcedures} />
              <Route path="/user/notifications" component={Notifications} />
              <Route path="/guia" component={StarterGuide} />
            </>
          ) : (
            <>
              <Redirect exact from="/" to="/admin/procedures" />
              <Redirect exact from="/login" to="/admin/procedures" />
              <Route path="/admin/procedures" component={ProcedureList} />
              <Route path="/admin/statistics" component={Statistics} />
              <Route path="/admin/procedure/:id" component={ReviewProcedure} />
              <Route path="/admin/users" component={UsersList} />
            </>
          )}
        </Switch>
      </Theme>
    );
  } else {
    return (
      <MuiThemeProvider theme={theme}>
        <Fragment>
          <Switch>
            <Route path="/login" component={LoginPage} />
            <Route path="/register" component={RegisterPage} />
            <Route path="/forgot-password" component={ForgotPasswordPage} />
            <Route
              path="/reset-password/:userId/:token"
              component={ResetPasswordPage}
            />
            <Redirect from="/" to="/login" exact strict />
          </Switch>
        </Fragment>
      </MuiThemeProvider>
    );
  }
}

function App() {
  const { data: login } = useQuery(IS_LOGGED_IN);
  const [getUser, { data: user }] = useLazyQuery(GET_CURRENT_USER);

  React.useEffect(() => {
    if (login && login.isLoggedIn) {
      getUser();
    }
  }, [login]);

  return (
    <BrowserRouter>
      <Content
        isLoggedIn={login ? login.isLoggedIn : false}
        role={user ? user.me.role : "PROPONENTE"}
      />
    </BrowserRouter>
  );
}

export default hot(module)(App);
