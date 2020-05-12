import React from "react";
import { ThemeProvider } from "styled-components";
import {
  StylesProvider,
  ThemeProvider as MuiThemeProvider,
  createMuiTheme,
} from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import { addDecorator } from "@storybook/react";

const theme = createMuiTheme();

addDecorator((story) => (
  <StylesProvider injectFirst>
    <MuiThemeProvider theme={theme}>
      <ThemeProvider theme={theme}>
        <>
          <CssBaseline />
          {story()}
        </>
      </ThemeProvider>
    </MuiThemeProvider>
  </StylesProvider>
));
