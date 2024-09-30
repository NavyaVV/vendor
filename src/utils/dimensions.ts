import { Dimensions, PixelRatio, Platform, StatusBar } from "react-native";

const StatusBarHeight = StatusBar.currentHeight ?? 0;
export const { height: WHEIGHT } = Dimensions.get("window");
export const { width: WIDTH, height: SHEIGHT } = Dimensions.get("screen");
const navBarHeight = SHEIGHT - WHEIGHT - StatusBarHeight;
export const HEIGHT = SHEIGHT - navBarHeight;

export const SEARCHBAR_HEIGHT = 40;
export const BOTTOM_TAB = 65;
export const MAX_WIDTH = 700;

const scale = WIDTH / 360;

export const normalize = (size: number): number => {
  const newSize = size * scale;

  if (Platform.OS === "ios")
    return Math.round(PixelRatio.roundToNearestPixel(newSize));
  else return Math.round(PixelRatio.roundToNearestPixel(newSize)) - 2;
};
