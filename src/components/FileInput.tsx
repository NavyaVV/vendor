import { Box, Text, TouchableBox, TrText } from "@utils/Theme";
import React from "react";
import DocumentPicker from "react-native-document-picker";
import ErrorMessage from "./ErrorMessage";

interface fileInputProps {
  label: string;
  fileName?: string;
  mandatory?: boolean;
  onChooseFile: (doc: string) => void;
  errorMessage?: Array<string> | string | null;
}

export default ({
  label,
  fileName,
  mandatory,
  onChooseFile,
  errorMessage,
}: fileInputProps) => {
  const handleSelect = async () => {
    try {
      const doc = await DocumentPicker.pick();
      if (doc[0].name) onChooseFile(doc[0].name);
    } catch (error) {
      if (DocumentPicker.isCancel(error)) console.log("[Cancel]");
    }
  };

  return (
    <Box marginTop="xxl" marginBottom="_s">
      <Box flexDirection="row">
        <TrText variant="regular12" color="textColor05" marginBottom="m">
          {label}
        </TrText>
        {mandatory === true && <Text color="textColor03"> *</Text>}
      </Box>
      <Box
        borderWidth={1}
        height={52}
        flexDirection="row"
        padding="m"
        alignItems="center"
        borderColor="borderColor01"
        borderRadius="m"
      >
        <TouchableBox
          onPress={handleSelect}
          paddingHorizontal="x3l"
          paddingVertical="m"
          marginRight="l"
          borderRadius="m"
          height={35}
          backgroundColor="boxColor16"
        >
          <TrText>BROWSE</TrText>
        </TouchableBox>
        <Text style={{ maxWidth: "60%" }}>{fileName}</Text>
      </Box>
      <ErrorMessage errorMessage={errorMessage} />
    </Box>
  );
};
