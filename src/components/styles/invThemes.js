import { componentsTheme as base } from "./baseTheme";
import { createTheme } from "@mui/material/styles";

// Tema principal
export const themePrimary = createTheme({
  components: {
    MuiTextField: {
      defaultProps: {
        variant: "standard",
      },
    },
    MuiLinearProgress: {
      styleOverrides: {
        root: {
          height: "8px",
          borderRadius: "4px",
          "-webkit-backface-visibility": "hidden",
          "-moz-backface-visibility": "hidden",
          "-webkit-transform": "translate3d(0, 0, 0)",
          "-moz-transform": "translate3d(0, 0, 0)",
          willChange: "transform",
        },
        bar: {
          borderRadius: "4px",
          "-webkit-backface-visibility": "hidden",
          "-moz-backface-visibility": "hidden",
          "-webkit-transform": "translate3d(0, 0, 0)",
          "-moz-transform": "translate3d(0, 0, 0)",
          willChange: "transform",
        },
      },
    },
    MuiSelect: {
      styleOverrides: {
        select: {
          paddingLeft: "12px",
        },
        selectMenu: {
          display: "flex",
          alignItems: "center",
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        notchedOutline: {
          borderRadius: "30px",
        },
      },
    },
    MuiMobileStepper: {
      styleOverrides: {
        root: {
          padding: "8px 0",
          background: "none",
        },
      },
    },
    MuiAvatar: {
      styleOverrides: {
        colorDefault: {
          backgroundColor: base.colors.secondary.light,
          color: base.colors.secondary.contrastText,
        },
      },
    },
    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          backgroundColor: base.colors.secondary.dark,
          color: base.colors.secondary.light,
          borderRadius: "8px",
          boxShadow: base.shadows[3],
        },
        arrow: { color: base.colors.secondary.dark },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        head: {
          fontWeight: 600,
        },
      },
    },
    MuiTableRow: {
      styleOverrides: {
        root: {
          "hover:hover": {
            backgroundColor: "red",
          },
        },
      },
    },
    MuiAccordionDetails: {
      styleOverrides: {
        root: {
          display: "block",
          padding: "8px 16px 16px",
        },
      },
    },
    MuiAccordionSummary: {
      styleOverrides: {
        root: {
          padding: "0 16px",
        },
      },
    },
    MuiAccordion: {
      styleOverrides: {
        rounded: {
          "&:last-child": {
            borderBottomLeftRadius: "10px",
            borderBottomRightRadius: "10px",
          },
          "&:first-child": {
            borderTopLeftRadius: "10px",
            borderTopRightRadius: "10px",
          },
        },
      },
    },
    MuiPickersToolbar: {
      styleOverrides: {
        toolbar: {
          borderTopLeftRadius: "10px",
          borderTopRightRadius: "10px",
          paddingLeft: "16px",
          paddingRight: "16px",
        },
      },
    },
    MuiPickersToolbarText: {
      styleOverrides: {
        toolbarTxt: {
          color: base.colors.primary.main,
        },
      },
    },
    MuiSwitch: {
      styleOverrides: {
        root: {
          height: "48px",
        },
        switchBase: {
          top: "5px",
          left: "5px",
          color: base.colors.secondary.light,
          "&$checked": {
            transform: "translateX(26%)",
          },
        },
        track: {
          backgroundColor: base.colors.background.light,
          height: "24px",
          borderRadius: "12px",
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          fontWeight: base.typo.fontWeightSemiBold,
        },
        colorSecondary: {
          color: base.colors.secondary.main,
          backgroundColor: base.colors.background.light,
        },
        clickableColorSecondary: {
          "&:hover": {
            color: base.colors.primary.contrastText,
            backgroundColor: base.colors.primary.main,
          },
          "&:focus": {
            color: base.colors.primary.contrastText,
            backgroundColor: base.colors.primary.main,
          },
        },
      },
    },
    MuiInputAdornment: {
      styleOverrides: {
        root: {
          whiteSpace: "nowrap",
        },
      },
    },
    MuiPrivateTabIndicator: {
      styleOverrides: {
        root: {
          boxShadow: `0 0 8px ${base.colors.primary.main}`,
        },
      },
    },
    MuiDialog: {
      styleOverrides: {
        paper: {
          margin: 24,
        },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          background: base.colors.background.dark,
        },
      },
    },
    MuiDialogTitle: {
      styleOverrides: {
        root: {
          padding: "24px 16px",
        },
      },
    },
    MuiDialogContent: {
      styleOverrides: {
        root: {
          padding: "8px 16px",
        },
      },
    },
    MuiDialogActions: {},
    MuiButton: {
      styleOverrides: {
        contained: {
          borderRadius: base.spacing.unit * 4,
        },
        outlined: { borderRadius: base.spacing.unit * 4 },
      },
    },
    MuiSnackbarContent: {
      styleOverrides: {
        root: {
          backgroundColor: base.colors.secondary.dark,
          color: base.colors.common.white,
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: base.colors.background.dark,
        },
        colorPrimary: {
          backgroundColor: base.colors.background.dark,
          color: base.colors.common.white,
        },
      },
    },
    MuiToolbar: {
      styleOverrides: {
        regular: {
          minHeight: 44,
        },
        gutters: {
          paddingLeft: 0,
          paddingRight: 0,
        },
      },
    },
    MuiFormLabel: {
      styleOverrides: {
        root: {
          "&$disabled": {
            color: base.colors.text.disabled,
          },
        },
      },
    },
    MuiInputBase: {
      styleOverrides: {
        root: {
          "&$disabled": {
            color: base.colors.text.disabled,
          },
        },
        input: {
          caretColor: "#00dfa8",
        },
      },
    },
    MuiInput: {
      styleOverrides: {
        underline: {
          "&:before": {
            borderBottom: "1px solid rgba(255, 255, 255, 0.87)",
          },
          "&$disabled": {
            color: base.colors.text.disabled,
            "&:before": {
              borderBottom: `1px solid ${base.colors.text.disabled}`,
            },
          },
        },
        input: {
          "&:-webkit-autofill": {
            WebkitTextFillColor: "rgb(255,255,255)",
          },
          caretColor: "#00dfa8",
        },
      },
    },
    MuiBottomNavigation: {
      styleOverrides: {
        root: {
          backgroundColor: "transparent",
        },
      },
    },
    MuiBottomNavigationAction: {
      styleOverrides: {
        root: {
          color: base.colors.common.white,
          "&$selected": {
            paddingTop: base.spacing.unit,
          },
        },
        label: {
          "&$selected": {
            fontSize: "0.75rem",
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        rounded: {
          borderRadius: "8px",
        },
      },
    },
    MuiAlert: {
      styleOverrides: {
        root: {
          borderRadius: "8px",
        },
      },
    },
    MuiTypography: {
      styleOverrides: {
        gutterBottom: {
          marginBottom: "0.65em",
        },
      },
    },
    MuiRadio: {
      styleOverrides: {
        root: {
          color: base.colors.primary.main,
        },
        colorSecondary: {
          "&$checked": {
            color: base.colors.primary.main,
          },
        },
      },
    },
    MuiFormControl: {
      styleOverrides: {
        marginNormal: {
          marginTop: base.spacing.unit,
        },
      },
    },
    MuiSwitchBase: {
      styleOverrides: {
        root: {
          padding: base.spacing.unit / 2,
          margin: base.spacing.unit,
        },
      },
    },
  },
  palette: {
    mode: "light",
    ...base.colors.common,
    background: {
      paper: base.colors.background.main,
      default: base.colors.background.dark,
    },
    primary: {
      ...base.colors.primary,
    },
    secondary: {
      ...base.colors.secondary,
    },
    info: {
      ...base.colors.info,
    },
    error: {
      ...base.colors.error,
    },
    warn: {
      ...base.colors.warn,
    },
    text: {
      ...base.colors.text,
    },
  },
  typography: {
    useNextVariants: true,
    fontFamily: ["Montserrat", "sans-serif"].join(","),
    fontSize: base.typo.fontSize,
  },
  shape: {
    borderRadius: 0,
    borderRadiusTopLeft: 5,
    borderRadiusBottomRight: 5,
  },
});

// TODO: Alinhar com themePrimary assim que finalizado
// Tema utilizado ao mudar para a visualização como um amigo/cliente
export const themeSecondary = createTheme({
  components: {
    styleOverrides: {
      MuiAvatar: {
        colorDefault: {
          backgroundColor: base.colors.secondary.light,
          color: base.colors.secondary.contrastText,
        },
      },
    },
    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          backgroundColor: base.colors.secondary.light,
          color: base.colors.secondary.dark,
          borderRadius: "8px",
          boxShadow: base.shadows[2],
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        head: {
          fontWeight: 600,
        },
      },
    },
    MuiTableRow: {
      styleOverrides: {
        root: {
          "hover:hover": {
            backgroundColor: "red",
          },
        },
      },
    },
    MuiAccordionDetails: {
      styleOverrides: {
        root: {
          display: "block",
          padding: "8px 16px 16px",
        },
      },
    },
    MuiAccordionSummary: {
      styleOverrides: {
        root: {
          padding: "0 16px",
        },
      },
    },
    MuiAccordion: {
      styleOverrides: {
        rounded: {
          "&:last-child": {
            borderBottomLeftRadius: "10px",
            borderBottomRightRadius: "10px",
          },
          "&:first-child": {
            borderTopLeftRadius: "10px",
            borderTopRightRadius: "10px",
          },
        },
      },
    },
    MuiPickersToolbar: {
      styleOverrides: {
        toolbar: {
          borderTopLeftRadius: "10px",
          borderTopRightRadius: "10px",
          paddingLeft: "16px",
          paddingRight: "16px",
        },
      },
    },
    MuiPickersToolbarText: {
      styleOverrides: {
        toolbarTxt: {
          color: base.colors.primary.main,
        },
      },
    },
    MuiSwitch: {
      styleOverrides: {
        root: {
          height: "48px",
        },
        switchBase: {
          top: "5px",
          left: "5px",
          color: base.colors.primary.light,
          "&$checked": {
            transform: "translateX(26%)",
          },
        },
        track: {
          backgroundColor: base.colors.background.light,
          height: "24px",
          borderRadius: "12px",
        },
        colorPrimary: {
          color: base.colors.primary.main,
          "&$checked": {
            color: base.colors.primary.light,
          },
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          fontWeight: base.typo.fontWeightSemiBold,
        },
        colorSecondary: {
          color: base.colors.secondary.main,
          backgroundColor: base.colors.background.light,
        },
        clickableColorSecondary: {
          "&:hover": {
            color: base.colors.primary.contrastText,
            backgroundColor: base.colors.primary.main,
          },
          "&:focus": {
            color: base.colors.primary.contrastText,
            backgroundColor: base.colors.primary.main,
          },
        },
      },
    },
    MuiInputAdornment: {
      styleOverrides: {
        root: {
          whiteSpace: "nowrap",
        },
      },
    },
    MuiPrivateTabIndicator: {
      styleOverrides: {
        root: {
          boxShadow: `0 0 8px ${base.colors.primary.main}`,
        },
      },
    },
    MuiDialog: {
      styleOverrides: {
        paper: {
          margin: 24,
        },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          "-webkit-overflow-scrolling": "auto",
          background: `linear-gradient(to bottom, ${base.colors.background_theme_secondary.dark} 0%, ${base.colors.background_theme_secondary.dark} 100%)`,
        },
      },
    },
    MuiDialogTitle: {
      styleOverrides: {
        root: {
          padding: 16,
        },
      },
    },
    MuiDialogContent: {
      styleOverrides: {
        root: {
          padding: "0 16px 16px",
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          color: "#fff",
        },
        outlined: { borderRadius: base.spacing.unit * 4 },
        containedPrimary: {
          color: base.colors.primary.contrastText,
        },
      },
    },
    MuiSnackbarContent: {
      styleOverrides: {
        root: {
          backgroundColor: base.colors.secondary.dark,
          color: base.colors.common.white,
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: base.colors.common.transparent,
          boxShadow: "none",
        },
        colorPrimary: {
          backgroundColor: base.colors.common.transparent,
          boxShadow: "none",
        },
      },
    },
    MuiToolbar: {
      styleOverrides: {
        regular: {
          minHeight: 44,
        },
        gutters: {
          paddingLeft: 0,
          paddingRight: 0,
        },
      },
    },
    MuiFormLabel: {
      styleOverrides: {
        root: {
          "&$disabled": {
            color: base.colors.text.disabled,
          },
        },
      },
    },
    MuiInputBase: {
      styleOverrides: {
        root: {
          "&$disabled": {
            color: base.colors.text.disabled,
          },
        },
      },
    },
    MuiInput: {
      styleOverrides: {
        underline: {
          "&:before": {
            borderBottom: "1px solid rgba(255, 255, 255, 0.87)",
          },
          "&$disabled": {
            color: base.colors.text.disabled,
            "&:before": {
              borderBottom: `1px solid ${base.colors.text.disabled}`,
            },
          },
        },
        input: {
          "&:-webkit-autofill": {
            "-webkit-text-fill-color": "rgb(255,255,255)",
          },
        },
      },
    },
    MuiBottomNavigation: {
      styleOverrides: {
        root: {
          backgroundColor: "transparent",
        },
      },
    },
    MuiBottomNavigationAction: {
      styleOverrides: {
        root: {
          color: base.colors.common.white,
          "&$selected": {
            paddingTop: base.spacing.unit,
          },
        },
        label: {
          "&$selected": {
            fontSize: "0.75rem",
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        rounded: {
          borderRadius: "8px",
        },
      },
    },
    MuiAlert: {
      styleOverrides: {
        root: {
          borderRadius: "8px",
        },
      },
    },
    MuiTypography: {
      styleOverrides: {
        h6: {
          fontWeight: 600,
        },
      },
    },
    MuiRadio: {
      styleOverrides: {
        root: {
          color: base.colors.primary.main,
        },
        colorSecondary: {
          "&$checked": {
            color: base.colors.primary.main,
          },
        },
      },
    },
    MuiFormControl: {
      styleOverrides: {
        marginNormal: {
          marginTop: base.spacing.unit,
        },
      },
    },
    MuiSwitchBase: {
      styleOverrides: {
        root: {
          padding: base.spacing.unit / 2,
          margin: base.spacing.unit,
        },
      },
    },
  },
  palette: {
    mode: "dark",
    common: {
      black: "#000",
      white: "#fff",
    },
    background: {
      paper: "rgba(25, 27, 42, 1)",
      default: "rgba(2, 6, 16, 1)",
    },
    primary: {
      light: "#64eeff",
      main: "#0bbbd0",
      dark: "#008b9f",
      contrastText: "rgba(0, 0, 0, 1)",
    },
    secondary: {
      light: "#585771",
      main: "#2e2e46",
      dark: "#07031f",
      contrastText: "rgba(255, 255, 255, .87)",
    },
    error: {
      light: "#ff7957",
      main: "#ed442c",
      dark: "#b30000",
      contrastText: "rgba(255, 255, 255, .87)",
    },
    text: {
      primary: "rgba(255, 255, 255, .87)",
      secondary: "rgba(148, 158, 216, 1)",
      disabled: "rgba(122, 129, 171, 1)",
      disabledInvert: "rgba(255, 255, 255, 0.48)",
      hint: "rgba(155, 155, 155, 1)",
    },
  },
  typography: {
    useNextVariants: true,
    fontFamily: ["Montserrat", "sans-serif"].join(","),
    fontSize: base.typo.fontSize,
  },
  shape: {
    borderRadius: 0,
    borderRadiusTopLeft: 5,
    borderRadiusBottomRight: 5,
  },
});
