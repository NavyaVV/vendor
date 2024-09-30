import CustomDoubleButton from "@components/CustomDoubleButton";
import Header from "@components/Header";
import { addCheckListValidation } from "@helpers/campaigns";
import { Box, useTheme } from "@utils/Theme";
import React, { useState, useEffect } from "react";
import { Keyboard, ScrollView } from "react-native";
import CampaignForm from "./CampaignForm";
import NewField from "./NewField";
import ProgressIndicator from "./ProgressIndicator";
import Checkbox from "@components/Checkbox";
import { getCampaignChecklistLookup } from "@store/selector/campaigns";
import { useAppSelector } from "@hooks/redux";

export interface optionProps {
  // campaignDetailsInfo: campaignDetailState | null | undefined;
  campaignDatas: any;
  onPressPrimeButton: (params: Array<any>, next: boolean) => void;
  onPressSecondButton: () => void;
}

interface errorProps {
  name: string;
  fieldType: string;
}

const checklist = { field_name: "", field_type: "", is_required: true };

export default ({
  onPressPrimeButton,
  onPressSecondButton,
  // campaignDetailsInfo,
  campaignDatas,
}: optionProps) => {
  const campaignChecklist = useAppSelector(getCampaignChecklistLookup);
  const { spacing } = useTheme();
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<errorProps[]>([]);
  const [checkListArray, setCheckListArray] = useState([...campaignChecklist]);
  const [newChecklist, setNewChecklist] = useState<any[]>([]);

  useEffect(() => {
    if (checkListArray.length) onPressPrimeButton(checkListArray, false);
  }, [checkListArray]);

  useEffect(() => {
    const { fields = [] } = campaignDatas;
    if (fields.length) {
      const newFields = fields.map((item: any) => {
        const isDefault =
          campaignChecklist.findIndex(
            ({ field_name }: { field_name: any }) => field_name === item.name
          ) !== -1;

        return {
          field_name: item.field_name || item.name,
          field_type: item.field_type || item.fieldType,
          is_required: item.is_required || item.isRequired,
          is_default: item.is_default || isDefault,
          id: item.id,
        };
      });
      setCheckListArray([...newFields]);
    }
  }, [campaignDatas]);

  const handleAddNewField = () => {
    setNewChecklist([checklist]);
  };
  const cancelChecklist = () => {
    setNewChecklist([]);
  };

  const addChecklist = (newList: {
    field_name: string;
    field_type: string;
    is_required: boolean;
    is_default: boolean;
  }) => {
    setCheckListArray([...checkListArray, newList]);
    setNewChecklist([{ ...checklist }]);
  };

  const handleDelete = (index: number) => {
    setCheckListArray([
      ...checkListArray.slice(0, index),
      ...checkListArray.slice(index + 1, checkListArray.length),
    ]);
  };

  const handleSubmit = () => {
    setLoading(true);
    Keyboard.dismiss();
    const validation = addCheckListValidation(checkListArray);
    setErrorMsg(validation.errorMsg);
    setLoading(false);
    // if (!validation.status)
    onPressPrimeButton(checkListArray, true);
  };

  // const handleTextChange = (value: string, text: string, index: number) => {
  //   setErrorMsg(errorMsg.filter((_, i) => i !== index));
  //   const changingArray = checkListArray;
  //   changingArray[index] = { ...changingArray[index], [value]: text };

  //   setCheckListArray(changingArray);
  // };

  const onToggleField = (index: number) => {
    const changingArray = [...checkListArray];
    changingArray[index] = {
      ...changingArray[index],
      is_required: !changingArray[index].is_required,
    };
    setCheckListArray(changingArray);
  };

  const name = campaignDatas?.name || "";
  return (
    <Box flex={1} backgroundColor="secondary">
      <Header prefix={name} headerText="CHECKLIST" iconName="menu" />
      <ScrollView
        style={{ marginHorizontal: spacing.l }}
        showsVerticalScrollIndicator={false}
      >
        <ProgressIndicator
          serialNo1={1}
          serialNo2={2}
          serialNo3={3}
          serialNo4={4}
          setBg={3}
        />
        <Checkbox
          label="CHECKLISTLABEL"
          data={checkListArray}
          onSelect={onToggleField}
          onDelete={handleDelete}
        />
        {newChecklist.map((item, index) => (
          <CampaignForm
            key={index.toString()}
            cancelChecklist={cancelChecklist}
            addChecklist={addChecklist}
            field={item.field_type}
            isRequired={item?.isRequired}
            errorField={errorMsg[index]?.fieldType}
            errorName={errorMsg[index]?.name}
          />
        ))}
        <NewField onPressAddNewField={handleAddNewField} />
        <CustomDoubleButton
          primaryButton="NEXT"
          secondaryButton="BACK"
          onPressPrimary={handleSubmit}
          onPressSecondary={onPressSecondButton}
          loading={loading}
        />
      </ScrollView>
    </Box>
  );
};
