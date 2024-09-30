import { useAppDispatch } from "@hooks/redux";
import { setAlert } from "@store/reducers/common";
import { WIDTH } from "@utils/dimensions";
import { ImageBox, TouchableBox, TrText } from "@utils/Theme";
import React from "react";
import { ImageSourcePropType } from "react-native";

export interface caroselCardProps {
  image: ImageSourcePropType;
  title: string;
  subtitle: string;
  button: string;
}

export default (props: caroselCardProps) => {
  const dispatch = useAppDispatch();
  return (
    <ImageBox
      width={WIDTH - 44}
      height={128}
      source={props.image}
      justifyContent="center"
      paddingHorizontal="xxl"
    >
      <TrText variant="bold13" color="secondary">
        {props.title}
      </TrText>
      <TrText variant="light9" color="secondary">
        {props.subtitle}
      </TrText>
      <TouchableBox
        width={74}
        height={22}
        justifyContent="center"
        alignItems="center"
        borderWidth={0.5}
        marginVertical="s"
        borderRadius="l"
        backgroundColor="tabIconInactive"
        borderColor="borderColor01"
        onPress={() => dispatch(setAlert({ alert: true }))}
      >
        <TrText variant="regular10" color="secondary">
          {props.button}
        </TrText>
      </TouchableBox>
    </ImageBox>
  );
};
