import CustomTextInput from "@components/CustomTextInput";
import Dropdown from "@components/Dropdown";
import { navigate } from "@config/NavigationHelper";
import { ROUTES } from "@config/routes";
import { data5 } from "@utils/FilterDummyData";
import { Box, TrText } from "@utils/Theme";
import React, { useEffect, useState } from "react";
import CardDetails from "./CardDetails";
import Checkbox from "./Checkbox";
import Coupon from "./Coupon";
import CustomSearch from "./CustomSearch";
import RedeemCoupon from "./RedeemCoupon";
import CustomDoubleButton from "@components/CustomDoubleButton";
import { useAppSelector } from "@hooks/redux";
import { getCardDetails } from "@store/selector/payment";

interface ButtonProp {
  onPressPrimeButton(): void;
  onPressSecondButton(): void;
  couponDetails: object;
}

export default ({
  onPressPrimeButton,
  onPressSecondButton,
  couponDetails,
}: ButtonProp) => {
  const cardInfo = useAppSelector(getCardDetails);
  const [saveCard, setSaveCard] = useState(false);
  const [useWallet, setUseWallet] = useState(false);
  const [drop, setDrop] = useState({ data: "Credit/Debit Card", _index: 0 });
  const [addCoupon, setAddCoupon] = useState(couponDetails);

  useEffect(() => {
    setAddCoupon(couponDetails);
  }, [couponDetails]);

  return (
    <Box marginHorizontal="xxl">
      <TrText
        variant="medium15"
        marginTop="xxl"
        marginBottom="xxxl"
        color="textColor01"
      >
        PAYMENT METHODS
      </TrText>
      <Dropdown
        value={drop.data}
        setCategory={setDrop}
        label="MODE OF PAYMENT"
        dropdownData={data5}
        labelField="data"
        valueField="data"
      />
      {drop._index === 0 ? (
        <Box>
          <CustomTextInput
            label="NAME ON CARD"
            value={cardInfo?.card_details[0].name_on_card}
            variant="regular12"
            color="textColor05"
          />

          <CardDetails />
          <Checkbox
            label={"Save my card for future"}
            value={saveCard}
            onPress={() => setSaveCard(!saveCard)}
          />
        </Box>
      ) : (
        <Box>
          <CustomSearch label="VERIFY" placeholder="UPI Id" title="UPI ID" />
        </Box>
      )}
      {addCoupon === undefined ? (
        <Coupon onPress={() => navigate(ROUTES.COUPONS)} />
      ) : (
        <RedeemCoupon
          onPress={() => setAddCoupon(undefined)}
          couponCode={addCoupon}
        />
      )}
      <Checkbox
        label={"Use Wallet Balance: "}
        valueOfLabel={cardInfo?.wallet_balance}
        value={useWallet}
        onPress={() => setUseWallet(!useWallet)}
      />
      <CustomDoubleButton
        primaryButton="PAY BALANCE"
        secondaryButton="VIEW BREAKUP"
        onPressPrimary={onPressPrimeButton}
        onPressSecondary={onPressSecondButton}
      />
    </Box>
  );
};
