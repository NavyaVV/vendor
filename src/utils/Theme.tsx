import React, { ReactNode } from "react";
import TranslatedText, { translatedProps } from "@components/TranslatedText";
import {
  createBox,
  createText,
  createTheme,
  ThemeProvider,
  useTheme as useThemeHook,
} from "@shopify/restyle";
import {
  ImageProps,
  Text as RNText,
  Image as RNImage,
  TextInput as RNTextInput,
  TextInputProps,
  TouchableOpacity,
  TouchableOpacityProps,
  TouchableWithoutFeedbackProps,
  TouchableWithoutFeedback,
  Dimensions,
  ImageBackgroundProps,
  ImageBackground,
  KeyboardAvoidingView,
  KeyboardAvoidingViewProps,
  View,
  ViewProps,
} from "react-native";
import LinearGradient, {
  LinearGradientProps,
} from "react-native-linear-gradient";
import Animated from "react-native-reanimated";

export const palette = {
  BLACK01: "#000000",
  BLACK02: "#1F2125",
  BLACK03: "#2E2E2E",

  ASH01: "#717171",
  ASH02: "#777777",
  ASH03: "#9A9A9A",
  ASH04: "#E3E3E3",
  ASH05: "#E0E0E0",

  GREY01: "#313233",
  GREY02: "#3C3C3C",
  GREY03: "#4B4B4B",
  GREY04: "#2F2F2F",

  BROWN01: "#330B1A",
  BROWN02: "#411424",
  BROWN03: "#50192E",
  BROWN04: "#53300F",
  BROWN05: "#5D1539",

  GREEN01: "#23BE29",
  GREEN02: "#3CB220",
  GREEN03: "#E1FFCE",
  GREEN04: "#144343",
  GREEN05: "#19310A",

  VIOLET01: "#EDDEFF",
  VIOLET02: "#DBE6F0",
  VIOLET03: "#CED0D9",
  VIOLET04: "#381C5A",

  BLUE01: "#1A2ADF",
  BLUE02: "#1DBCBC",
  BLUE03: "#23BEAC",
  BLUE04: "#D1FFFF",

  WHITE01: "#FFFFFF",
  WHITE02: "#FFFCFD",
  WHITE03: "#FFFAFC",

  TRANSPARENT: "#19071150",

  ROSE01: "#D93573",
  ROSE02: "#CB497A",
  ROSE03: "#CA3C74",
  ROSE04: "#FD3774",
  ROSE05: "#F75491",
  ROSE06: "#C1205D",
  ROSE07: "#E54C86",
  PINK01: "#FA97BC",
  PINK02: "#FFE8F1",
  PINK03: "#F0C7D6",
  PINK04: "#FFEBEB",
  PINK05: "#FFF4F8",
  PINK06: "#FFEFEF",
  PINK07: "#FFEBF3",
  PINK08: "#F8DFE9",
  PINK09: "#FFE3EF",
  PINK10: "#F4D4E1",
  PINK11: "#FFC1D9",

  RED01: "#FF0303",
  RED02: "#FF3D3D",
  RED03: "#FF5757",

  YELLOW01: "#FFBA00",

  ORANGE01: "#F27E1A",
  ORANGE02: "#FFF0E5",
  ORANGE03: "#FFF9F0",

  PURPLE01: "#975DF5",

  TRANS: "rgba(255, 255, 255,0)",
};

const theme = createTheme({
  colors: {
    primary: palette.ROSE01,
    secondary: palette.WHITE01,
    ternary: palette.ROSE02,

    glass: palette.TRANS,
    tabIconInactive: palette.PINK01,

    textColor01: palette.BLACK01,
    textColor02: palette.BROWN02,
    textColor03: palette.RED01,
    textColor04: palette.PINK03,
    textColor05: palette.GREY03,
    textColor06: palette.ASH01,
    textColor07: palette.BROWN01,
    textColor08: palette.ROSE01,
    textColor09: palette.WHITE01,
    textColor10: palette.ASH02,
    textColor11: palette.GREY04,
    textColor13: palette.BLACK03,
    textColor14: palette.BROWN01,
    textColor15: palette.ROSE01,
    textColor12: palette.WHITE01,
    textColor16: palette.BLACK02,
    textColorRed2: palette.RED02,
    textColorAsh01: palette.ASH05,
    textColorAsh03: palette.ASH03,
    textColorGrey: palette.GREY01,

    headerColor: palette.PINK05,

    boxColor01: palette.WHITE01,
    boxColor02: palette.GREEN01,
    boxColor03: palette.YELLOW01,
    boxColor04: palette.BLUE01,
    boxColor05: palette.GREEN01,
    boxColor06: palette.VIOLET03,
    boxColor07: palette.BLUE04,
    boxColor08: palette.VIOLET01,
    boxColor09: palette.GREEN03,
    boxColor10: palette.ORANGE02,
    boxColor11: palette.BLUE02,
    boxColor12: palette.PURPLE01,
    boxColor13: palette.GREEN02,
    boxColor14: palette.ORANGE01,
    boxColor15: palette.ROSE04,
    boxColor16: palette.ASH04,
    boxColor17: palette.PINK04,
    boxColor18: palette.PINK06,
    boxColor19: palette.PINK07,
    boxColor20: palette.PINK04,
    boxColor21: palette.PINK04,
    boxColor22: palette.WHITE02,
    boxColor23: palette.BLUE03,
    boxColor24: palette.ROSE05,
    boxColor25: palette.ROSE01,
    boxColor26: palette.WHITE01,
    boxColor27: palette.PINK05,
    boxColor28: palette.PINK01,
    boxColor29: palette.BLACK02,
    boxColor30: palette.ROSE06,
    boxColor31: palette.WHITE01,
    boxColor32: palette.PINK08,
    boxColor33: palette.PINK02,
    boxColor34: palette.WHITE03,
    boxColor35: palette.PINK09,
    boxColor36: palette.PINK11,
    boxColor37: palette.ROSE01,
    boxColor38: palette.ROSE06,
    boxColorTransparent: palette.TRANSPARENT,
    boxColorOrange3: palette.ORANGE03,
    borderColor01: palette.PINK10,
    borderColor02: palette.PINK03,
    drawerActiveColor: palette.ROSE07,

    iconRose: palette.ROSE03,
  },
  spacing: {
    o: 0,
    xs: 2,
    xss: 3,
    s: 5,
    m: 7,
    ml: 10,
    l: 15,
    xl: 18,
    xxl: 22,
    xxxl: 28,
    x2l: 32,
    x3l: 34,
    xx3l: 37,
    xxxx3l: 42,
    _xx3l: 50,
    xxx3l: 52,
    x4l: 58,
    xx4l: 65,
    xxx4l: 80,
    x5l: 100,
    x6l: 120,
    __m: -25,
    _xs: Dimensions.get("window").height * 0.001,
    _s: Dimensions.get("window").height * 0.005,
    _mm: Dimensions.get("window").height * 0.01,
    _ml: Dimensions.get("window").height * 0.015,
    _l: Dimensions.get("window").height * 0.02,
    _xl: Dimensions.get("window").height * 0.03,
    _xxxl: Dimensions.get("window").height * 0.04,
    _x3l: Dimensions.get("window").height * 0.05,
    _x4l: Dimensions.get("window").height * 0.065,
    _x5l: Dimensions.get("window").height * 0.08,
  },
  borderRadii: {
    vvs: 0.5,
    vs: 1,
    s: 3,
    m: 6,
    l: 11,
    xl: 18,
    xxl: 22,
    x3l: 25,
    x4l: 44,
    xx4l: 52,
    x5l: 60,
  },
  iconSize: {
    s: 3,
    m: 6,
    l: 11,
    xml: 15,
    xl: 18,
    xxl: 22,
    x3l: 25,
    x4l: 27,
    x5l: 44,
    xx4l: 52,
    xx5l: 60,
  },

  textVariants: {
    defaults: {
      fontSize: 13,
      fontFamily: "SFProDisplay-Regular",
      color: "textColor01",
    },
    light9: {
      fontSize: 9,
      lineHeight: 18,
      fontFamily: "SFProDisplay-Light",
      color: "textColorAsh03",
    },
    light11: {
      fontSize: 11,
      lineHeight: 18,
      fontFamily: "SFProDisplay-Light",
      color: "textColorAsh03",
    },
    light13: {
      fontSize: 13,
      lineHeight: 15,
      color: "secondary",
      fontFamily: "SFProDisplay-Light",
    },
    light14: {
      fontSize: 14,
      lineHeight: 18,
      fontFamily: "SFProDisplay-Light",
      color: "textColorAsh03",
    },
    regular7: {
      fontSize: 7,
      lineHeight: 9,
      fontFamily: "SFProDisplay-Regular",
      color: "textColorAsh03",
    },
    medium8: {
      fontSize: 8,
      color: "secondary",
      lineHeight: 10,
      fontFamily: "SFProDisplay-Medium",
    },
    medium10: {
      fontSize: 10,
      lineHeight: 12,
      fontFamily: "SFProDisplay-Medium",
      color: "textColorAsh03",
    },
    medium12: {
      fontSize: 12,
      lineHeight: 14,
      fontFamily: "SFProDisplay-Medium",
      color: "textColorAsh03",
    },
    medium13: {
      fontSize: 13,
      lineHeight: 15,
      color: "secondary",
      fontFamily: "SFProDisplay-Medium",
    },
    medium15: {
      fontSize: 15,
      lineHeight: 18,
      fontFamily: "SFProDisplay-Medium",
      color: "textColorAsh03",
    },
    medium18: {
      fontSize: 18,
      lineHeight: 21,
      fontFamily: "SFProDisplay-Medium",
      color: "textColorAsh03",
    },
    regular10: {
      fontSize: 10,
      lineHeight: 12,
      fontFamily: "SFProDisplay-Regular",
      color: "textColorAsh03",
    },
    regular12: {
      fontSize: 12,
      lineHeight: 14,
      fontFamily: "SFProDisplay-Regular",
      color: "textColorAsh03",
    },
    regular13: {
      fontSize: 13,
      lineHeight: 15,
      fontFamily: "SFProDisplay-Regular",
      color: "textColorAsh03",
    },
    regular14: {
      fontSize: 14,
      fontFamily: "SFProDisplay-Regular",
      color: "textColorAsh03",
    },
    regular16: {
      fontSize: 16,
      lineHeight: 19,
      fontFamily: "SFProDisplay-Regular",
      color: "textColorAsh03",
    },
    regular17: {
      fontSize: 17,
      fontFamily: "SFProDisplay-Regular",
      color: "textColorAsh03",
    },
    regular19: {
      fontSize: 19,
      fontFamily: "SFProDisplay-Regular",
      color: "textColorAsh03",
    },

    semibold12: {
      fontSize: 12,
      lineHeight: 14,
      fontFamily: "SFProDisplay-Semibold",
      color: "textColorAsh03",
    },
    semibold14: {
      fontSize: 14,
      lineHeight: 17,
      fontFamily: "SFProDisplay-Semibold",
      color: "textColorAsh03",
    },
    semibold15: {
      fontSize: 15,
      lineHeight: 18,
      fontFamily: "SFProDisplay-Semibold",
      color: "textColorAsh03",
    },
    semibold20: {
      fontSize: 20,
      fontFamily: "SFProDisplay-Semibold",
      color: "textColorAsh03",
    },
    semibold25: {
      fontSize: 25,
      lineHeight: 30,
      fontFamily: "SFProDisplay-Semibold",
      color: "textColorAsh03",
    },
    bold13: {
      fontSize: 13,
      lineHeight: 18,
      fontFamily: "SFProDisplay-Bold",
      color: "textColorAsh03",
    },
    bold21: {
      fontSize: 21,
      lineHeight: 25,
      fontFamily: "SFProDisplay-Bold",
      color: "textColorAsh03",
    },
    bold27: {
      fontSize: 27,
      lineHeight: 32,
      fontFamily: "SFProDisplay-Bold",
      color: "textColorAsh03",
    },
    heavy28: {
      fontSize: 28,
      lineHeight: 34,
      fontFamily: "SFProDisplay-Heavy",
      color: "textColorAsh03",
    },
  },
  breakpoints: {
    phone: 0,
    tablet: 768,
  },
});

export type Theme = typeof theme;

export const darkTheme: Theme = {
  ...theme,
  colors: {
    ...theme.colors,
    primary: palette.ROSE01,
    secondary: palette.BLACK01,

    textColor01: palette.WHITE01,
    textColor02: palette.WHITE01,
    textColor06: palette.ASH05,
    textColor07: palette.WHITE01,
    textColor05: palette.WHITE01,
    textColor08: palette.WHITE01,
    textColor14: palette.ROSE01,
    textColor11: palette.WHITE01,
    textColor12: palette.ROSE01,
    textColor16: palette.ASH05,
    boxColor17: palette.BROWN03,
    boxColor06: palette.GREY02,
    boxColor07: palette.GREEN04,
    boxColor08: palette.VIOLET04,
    boxColor09: palette.GREEN05,
    boxColor10: palette.BROWN04,
    boxColor18: palette.BROWN05,
    boxColor19: palette.BROWN03,
    boxColor20: palette.BROWN05,
    boxColor21: palette.BLACK02,
    boxColor22: palette.BLACK02,
    boxColor25: palette.BLACK01,
    boxColor26: palette.ROSE01,
    boxColor27: palette.BLACK02,
    boxColor28: palette.GREY04,
    boxColor31: palette.BLACK02,
    boxColor37: palette.BROWN03,
    boxColor38: palette.BROWN05,

    borderColor01: palette.GREY04,
    borderColor02: palette.GREY01,

    headerColor: palette.BLACK01,
  },
};

const AnimatedView = Animated.createAnimatedComponent(View);
export const Box = createBox<Theme>();
export const Image = createBox<Theme, ImageProps>(RNImage);
export const ImageBox = createBox<Theme, ImageBackgroundProps>(ImageBackground);
export const AnimatedBox = createBox<Theme, Animated.AnimateProps<ViewProps>>(
  AnimatedView
);
export const TouchableBox = createBox<Theme, TouchableOpacityProps>(
  TouchableOpacity
);
export const TouchableWithoutFeedbackBox = createBox<
  Theme,
  TouchableWithoutFeedbackProps
>(TouchableWithoutFeedback);
export const GradiantBox = createBox<Theme, LinearGradientProps>(
  LinearGradient
);
export const KeyboardAvoidingBox = createBox<Theme, KeyboardAvoidingViewProps>(
  KeyboardAvoidingView
);
export const Text = createText<Theme>(RNText);
export const TrText = createText<Theme, translatedProps>(TranslatedText);
export const TextInput = createText<Theme, TextInputProps>(RNTextInput);
export const useTheme = () => useThemeHook<Theme>();
export default React.memo(
  ({ children, darkMode }: { children: ReactNode; darkMode: boolean }) => (
    // <ThemeProvider {...{theme}}>{children}</ThemeProvider>
    <ThemeProvider theme={ darkMode ? darkTheme : theme }>
      { children }
    </ThemeProvider>
  )
);
