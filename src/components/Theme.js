import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";
import React from "react";
import DrawerNavigation from "./Drawer";

const theme = createMuiTheme({
  palette: {
    type: "light",
    primary: {
      main: "#00796B",
      contrastText: "#fff"
    },
    secondary: {
      main: "#FF5722"
    }
  }
});

export default function Theme(props) {
  return (
    <MuiThemeProvider theme={theme}>
      <DrawerNavigation>
        {props.children}
      </DrawerNavigation>
    </MuiThemeProvider>
  );
}
