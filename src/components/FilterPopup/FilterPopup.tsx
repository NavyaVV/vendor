import CustomDoubleButton from "@components/CustomDoubleButton";
import Dropdown from "@components/Dropdown";
import { data1, data2, data3 } from "@utils/FilterDummyData";
import { IconBold } from "@utils/IconRegular";
import { Box, Text, TouchableBox, TrText } from "@utils/Theme";
import moment from "moment";
import React, { useState } from "react";
import { Modal } from "react-native";
import DatePicker from "react-native-date-picker";
import Sort from "./Sort";
import { filterParamsState } from "@typings/campaigns";

export interface optionProps {
  visible: boolean;
  onClose: () => void;
  onSubmit: (params: filterParamsState | null) => void;
}

export default ({ onClose, visible, onSubmit }: optionProps) => {
  const [sort, setSort] = useState(false);
  const [price, setPrice] = useState("");
  const [status, setStatus] = useState("");
  const [state, setState] = useState("");
  const [date, setDate] = useState(new Date());
  const [chooseDate, setChooseDate] = useState(false);

  const handleSubmitFilter = () => {
    const priceNew = price?.length ? price.split("₹ ")[1].split(" - ") : [];
    const params = {
      ascending: sort,
      price,
      status,
      state,
      date,
    };
    if (priceNew?.length) {
      params.startPrice = priceNew[0];
      params.endPrice = priceNew[0];
    }
    onSubmit(params);
  };

  return (
    <Modal
      onRequestClose={onClose}
      transparent={true}
      visible={visible}
      statusBarTranslucent
    >
      <Box
        flex={1}
        backgroundColor="boxColorTransparent"
        justifyContent="center"
      >
        <Box
          marginHorizontal="xxl"
          borderRadius="l"
          elevation={5}
          backgroundColor="secondary"
        >
          <Box
            height={74}
            borderTopRightRadius="l"
            borderTopLeftRadius="l"
            backgroundColor="headerColor"
            flexDirection="row"
            justifyContent="space-between"
            padding="xxl"
            alignItems="center"
          >
            <TrText variant="regular16" color="primary">
              FILTER
            </TrText>
            <TouchableBox
              height={27}
              width={27}
              onPress={onClose}
              padding="s"
              backgroundColor="boxColor32"
              justifyContent="center"
              alignItems="center"
              borderRadius="xl"
            >
              <IconBold size={8} name="close" color="primary" />
            </TouchableBox>
          </Box>
          <Box marginHorizontal="xxl">
            <Sort
              onPressAscending={() => setSort(true)}
              onPressDescending={() => setSort(false)}
              backgroundAscending={sort === true ? "primary" : "secondary"}
              backgroundDescending={sort === false ? "primary" : "secondary"}
            />
            <Dropdown
              value={price}
              setCategory={setPrice}
              label="PRICE"
              dropdownData={data1}
              valueField="data"
              labelField="data"
            />

            <TrText variant="regular12" marginBottom="m" color="textColor01">
              DATE CREATED
            </TrText>
            <Box
              flexDirection="row"
              alignItems="center"
              height={52}
              padding="m"
              borderRadius="m"
              borderWidth={1}
              borderColor="borderColor01"
              paddingVertical="s"
              justifyContent="space-between"
            >
              <Text variant="regular12" color="textColor01">
                {moment(date).format("DD-MM-YYYY")}
              </Text>
              <TouchableBox onPress={() => setChooseDate(!chooseDate)}>
                <IconBold name="calender" size={15} color="primary" />
              </TouchableBox>
            </Box>
            <Dropdown
              value={status}
              setCategory={setStatus}
              label="STATUS"
              dropdownData={data2}
              valueField="value"
              labelField="data"
            />
            <Dropdown
              value={state}
              setCategory={setState}
              label="STATE"
              dropdownData={data3}
              valueField="data"
              labelField="data"
            />
          </Box>
          <Box paddingHorizontal="xxl">
            <CustomDoubleButton
              primaryButton="SEARCH"
              secondaryButton="CLEAR ALL"
              onPressPrimary={handleSubmitFilter}
              onPressSecondary={() => onSubmit(null)}
            />
          </Box>
          <DatePicker
            modal
            date={date}
            mode="date"
            open={chooseDate}
            onConfirm={(selected) => {
              setDate(selected);
              setChooseDate(false);
            }}
            onCancel={() => setChooseDate(false)}
          />
        </Box>
      </Box>
    </Modal>
  );
};
