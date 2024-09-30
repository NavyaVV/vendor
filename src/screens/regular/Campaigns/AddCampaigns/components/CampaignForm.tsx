import CustomTextInput from "@components/CustomTextInput";
import Dropdown from "@components/Dropdown";
import ToggleButton from "@components/ToggleButton";
import { fieldData } from "@utils/FilterDummyData";
import { Box } from "@utils/Theme";
import React, { useState } from "react";
import CustomDoubleButton from "@components/CustomDoubleButton";

interface optionProps {
  placeholder?: string;
  field: string;
  errorName: string;
  errorField: string;
  isRequired: boolean;
  cancelChecklist: () => void;
  addChecklist: (checkList: any) => void;
}

export default ({
  errorName,
  field,
  errorField,
  isRequired,
  cancelChecklist,
  addChecklist,
}: optionProps) => {
  const [checkList, setCheckList] = useState<{
    field_name: string;
    field_type: string;
    is_required: boolean;
    is_default: boolean;
  }>({ is_default: false, is_required: true, field_name: "", field_type: "" });

  const handleFieldChange = (field: string, value: string | boolean) => {
    setCheckList({ ...checkList, [field]: value });
  };

  return (
    <Box
      height={380}
      borderWidth={1}
      marginTop="xl"
      paddingHorizontal="xxl"
      paddingVertical="x2l"
      borderRadius="l"
      borderColor="borderColor01"
      justifyContent="space-between"
    >
      <CustomTextInput
        value={checkList?.field_name}
        label="NAME"
        placeHolder={"Enter Field Name"}
        onChangeText={(text) => handleFieldChange("field_name", text)}
        errorMessage={errorName}
      />
      <Dropdown
        value={checkList?.field_type || null}
        setCategory={(item: string) => handleFieldChange("field_type", item)}
        label="FIELD TYPE"
        dropdownData={fieldData}
        labelField="data"
        valueField="value"
        errorMessage={errorField}
      />
      <Box
        flexDirection="row"
        justifyContent="space-between"
        alignItems="center"
      >
        <ToggleButton
          setValue={(value) =>
            handleFieldChange("is_required", !checkList?.is_required)
          }
          value={checkList?.is_required}
        />
        {/* <TouchableBox
          height={36}
          width={36}
          backgroundColor="boxColor22"
          justifyContent="center"
          alignItems="center"
          borderRadius="xl"
          onPress={onDelete}
        >
          <IconBold name="trash" size={12} color="tabIconInactive" />
        </TouchableBox> */}
      </Box>
      <CustomDoubleButton
        primaryButton="ADD"
        secondaryButton="CANCEL"
        onPressPrimary={() => {
          addChecklist(checkList);
          setCheckList({});
        }}
        onPressSecondary={() => {
          setCheckList({});
          cancelChecklist();
        }}
        loading={false}
      />
    </Box>
  );
};
