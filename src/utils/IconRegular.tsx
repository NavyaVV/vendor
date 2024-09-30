import React, { FC } from "react";
import { ViewStyle } from "react-native";
import { IconTypes } from "../typings/IconTypes";
import SvgIcon from "./SvgIcon";
import { Theme, useTheme } from "./Theme";

interface Props {
  height?: string | number;
  width?: string | number;
  color?: keyof Theme["colors"];
  fill?: string;
  fillRule?: string;
  size?: number | string;
  name?: IconTypes;
  stroke?: string;
  strokeWidth?: number | string;
  style?: ViewStyle;
  viewBox?: string;
  focused?: boolean;
}

const Icon: FC<Props> = (props) => {
  const { colors } = useTheme();
  return (
    <SvgIcon
      {...props}
      stroke={props.color ? colors[props.color] : props.fill}
      fill={props.color ? colors[props.color] : props.fill}
      height={props.size ?? props.height ?? 50}
      width={props.size ?? props.width ?? 50}
    />
  );
};

export const IconBold: FC<Props & { name: string }> = ({ name, ...props }) => (
  <Icon {...props} name={name} viewBox="0 0 512 512" />
);

export const IconLight: FC<Props & { name: string }> = ({ name, ...props }) => (
  <Icon {...props} name={name} viewBox="0 0 24 24" />
);

export const IconCustom: FC<Props & { name: string; viewBox: string }> = ({
  name,
  viewBox,
  ...props
}) => <Icon {...props} name={name} viewBox={viewBox} />;
