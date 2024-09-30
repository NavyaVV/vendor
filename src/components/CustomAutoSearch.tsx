import { useRef, useEffect } from "react";
import { locationParams } from "@typings/service";
import { Box, Text, TrText, useTheme } from "@utils/Theme";
import React, { useMemo } from "react";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";

const errorBoxHeight = 15;

interface OptionProps {
  label: string;
  mandatory?: boolean;
  placeHolder?: string;
  errorMessage?: Array<string> | string | null;
  onSelect: (params: locationParams) => void;
}

export default ({
  label,
  mandatory,
  placeHolder,
  errorMessage,
  onSelect,
}: OptionProps) => {
  const ref = useRef();
  const { spacing, borderRadii, colors } = useTheme();
  const googlePlaceStyle = {
    row: {
      width: "100%",
      borderWidth: 0.5,
      borderColor: colors.borderColor01,
      backgroundColor: colors.boxColor22,
      zIndex: 400,
    },
    textInputContainer: {
      backgroundColor: "transparent",
      height: 52,
      borderWidth: 1,
      paddingHorizontal: spacing.m,
      borderRadius: borderRadii.m,
      borderColor: colors.borderColor01,
    },
    textInput: { color: "#5d5d5d", paddingTop: 10 },
  };

  useEffect(() => {
    if (placeHolder) ref.current.setAddressText(placeHolder);
  }, [placeHolder]);

  const error = useMemo(() => {
    if (typeof errorMessage === "string") return errorMessage;
    if (errorMessage?.length) return errorMessage[0];
    return "";
  }, [errorMessage]);

  return (
    <Box marginTop="xxl" marginBottom="_s" zIndex={400}>
      <Box flexDirection="row">
        <TrText variant="regular12" marginBottom="s" color="textColor05">
          {label}
        </TrText>
        {mandatory === true && <Text color="textColor03"> *</Text>}
      </Box>
      <GooglePlacesAutocomplete
        ref={ref}
        fetchDetails={true}
        listViewDisplayed="auto"
        styles={googlePlaceStyle}
        placeholder={placeHolder ?? "Search"}
        onPress={(_data, details = null) => {
          const service_location = {
            area: details?.address_components[0].long_name,
            city: details?.address_components.find(
              ({ types }) => types[0] === "locality"
            )?.long_name,
            district: details?.address_components.find(
              ({ types }) => types[0] === "administrative_area_level_3"
            )?.long_name,
            state: details?.address_components.find(
              ({ types }) => types[0] === "administrative_area_level_1"
            )?.long_name,
            country: details?.address_components.find(
              ({ types }) => types[0] === "country"
            )?.long_name,
            latitude: details?.geometry.location.lat.toString(),
            longitude: details?.geometry.location.lng.toString(),
          };
          onSelect(service_location);
        }}
        query={{
          key: "AIzaSyDnavALGb_bxJH3Lexs4-APi6_Az1tLt54",
          language: "en",
        }}
      />
      <Box height={errorBoxHeight} marginTop="_s">
        <Text variant="regular12" color="textColorRed2" paddingHorizontal="m">
          {error}
        </Text>
      </Box>
    </Box>
  );
};
