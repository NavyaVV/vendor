import { useAppDispatch, useAppSelector } from "@hooks/redux";
import { useIsFocused } from "@react-navigation/native";
import { paymentSplitupDetails } from "@store/reducers/payment";
import { getPaymentBreakupDetails } from "@store/selector/payment";
import { IconBold } from "@utils/IconRegular";
import { Box, Text, TouchableBox, TrText } from "@utils/Theme";
import React, { useEffect } from "react";
import { Modal } from "react-native";
import PopupRenderFunction from "./PopupRenderFunction";
interface PaymentPopupProp {
  close(): void;
  onPress(value: number): void;
  visible: boolean;
}
export default ({ close, onPress, visible }: PaymentPopupProp) => {
  const dispatch = useAppDispatch();
  const focussed = useIsFocused();
  const paymentBreakup = useAppSelector(getPaymentBreakupDetails);

  useEffect(() => {
    if (focussed) dispatch(paymentSplitupDetails());
  }, [dispatch, focussed]);

  const toPay =
    paymentBreakup.listing_price +
    paymentBreakup.vendor_fees +
    paymentBreakup.location_charge +
    paymentBreakup.taxable_value +
    paymentBreakup.igst -
    paymentBreakup.coupon;

  return (
    <Modal transparent={true} visible={visible}>
      <Box flex={1}>
        <Box flex={1} />
        <Box
          flex={1.3}
          backgroundColor="secondary"
          borderTopLeftRadius="xxl"
          borderTopRightRadius="xxl"
          paddingVertical="x2l"
          elevation={10}
        >
          <Box flex={1}>
            <Box
              flex={1}
              flexDirection="row"
              justifyContent="space-between"
              alignItems="center"
              marginHorizontal="xxl"
            >
              <TrText variant="medium15" color="primary">
                PAYMENT DETAILS
              </TrText>
              <TouchableBox
                onPress={close}
                width={29}
                height={29}
                justifyContent="center"
                alignItems="center"
                borderRadius="xl"
                backgroundColor="headerColor"
              >
                <IconBold name="close" size={12} color="primary" />
              </TouchableBox>
            </Box>
            <Box
              borderTopWidth={1}
              marginVertical="xxl"
              borderColor="borderColor01"
            />
            <Box justifyContent="flex-end">
              <PopupRenderFunction
                title="Listing Price"
                price={paymentBreakup.listing_price}
              />
              <PopupRenderFunction
                title="Vendor Fees"
                price={paymentBreakup.vendor_fees}
              />
              <PopupRenderFunction
                title="Location Charge"
                price={paymentBreakup.location_charge}
              />
              <PopupRenderFunction
                title="Taxable value"
                price={paymentBreakup.taxable_value}
              />
              <PopupRenderFunction title="IGST" price={paymentBreakup.igst} />
              <PopupRenderFunction
                title="Coupons"
                price={paymentBreakup.coupon}
                coupon={true}
              />
            </Box>
          </Box>
          <Box
            borderTopWidth={1}
            marginVertical="xxl"
            borderColor="borderColor01"
          />
          <Box
            height={53}
            flexDirection="row"
            justifyContent="space-between"
            marginHorizontal="xxl"
          >
            <Box height={53} alignItems="center" justifyContent="center">
              <TrText variant="medium15" color="textColor01">
                TO PAY
              </TrText>
            </Box>
            <TouchableBox
              onPress={() => onPress(toPay)}
              width={123}
              height={53}
              borderRadius="l"
              alignItems="center"
              justifyContent="center"
              backgroundColor="headerColor"
            >
              <Text variant="semibold15" color="primary">
                ₹ {toPay}
              </Text>
            </TouchableBox>
          </Box>
        </Box>
      </Box>
    </Modal>
  );
};
