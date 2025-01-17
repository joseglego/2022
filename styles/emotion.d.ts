import "@emotion/react";
import * as CSS from "csstype";

type ButtonVariantStyles = {
  backgroundColor: string;
  textColor: string;
  backgroundFallbackColor: string;
  borderColor: string;
  borderWidth: number;
  borderTopRightRadius?: number;
  borderStyle: CSS.Properties["borderStyle"];
  onHoverColor: string;
  minWidth?: number;
};

type Colors = {
  jsconfYellow: string;
  jsconfBlack: string;
  jsconfRed: string;
  violetBlue: string;
  white: string;
  black: string;
  transparent: string;
};

declare module "@emotion/react" {
  export interface Theme {
    colors: Colors;
    breakpoints: {
      desktopOnly: string;
      tabletLandscapeOnly: string;
      phoneOnly: string;
    };
    fonts: {
      Barlow: {
        name: string;
        weights: {
          normal: number;
          medium: number;
          semiBold: number;
          bold: number;
          extraBold: number;
        };
      };
      Koulen: {
        name: string;
        weights: {
          normal: number;
        };
      };
    };
    elements: {
      buttons: {
        variants: {
          primary: ButtonVariantStyles;
          secondary: ButtonVariantStyles;
          tertiary: ButtonVariantStyles;
        };
      };
      global: {
        backgroundColor: string;
        fontFamily: string;
        headingsFontFamily: string;
        headingsFontWeight: number;
        color: string;
      };
    };
  }
}
