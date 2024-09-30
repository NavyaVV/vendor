import uuid from "react-native-uuid";
import CustomButton from "@components/CustomButton";
import { WIDTH } from "@utils/dimensions";
import { Box } from "@utils/Theme";
import React, { useCallback, useEffect, useRef, useState } from "react";
import CounterButton from "./CounterButton";
import ImageUpload, { imageState } from "./ImageUpload";
import ImportantNote from "./ImportantNote";
import TextArea from "@components/TextArea";
import CustomTextInput from "@components/CustomTextInput";
import Dropdown from "@components/Dropdown";
import { useAppDispatch, useAppSelector } from "@hooks/redux";
import {
  getErrors,
  getLoading,
  getProductCategoryInfo,
} from "@store/selector/product";
import {
  addProductErrorState,
  addProductParams,
  productState,
} from "@typings/product";
import { getUserReferenceId } from "@store/selector/auth";
import { Keyboard } from "react-native";
import { addProduct, editProduct, setError } from "@store/reducers/product";
import { clearAssets } from "@store/reducers/common";
import { getAssets } from "@store/selector/common";
import { createAssets } from "@store/reducers/common";
import { addProductValidation } from "@helpers/product";
import AlertPopup from "@components/AlertPopup";
import { useNavigation } from "@react-navigation/native";
import FileInput from "@components/FileInput";
import { isArray } from "lodash";

interface productProps {
  product?: productState | null;
}

// document_ref: "https://picsum.photos/id/1/200/300",
export default ({ product }: productProps) => {
  const productAssetsData = useAppSelector(getAssets);
  const clientId = useAppSelector(getUserReferenceId);
  const imageRef = useRef<{ getImages: () => imageState }>(null);
  const errors = useAppSelector(getErrors);
  let loading = useAppSelector(getLoading);
  const productCategoryInfo = useAppSelector(getProductCategoryInfo);
  const [showPopup, setShowPopup] = useState(false);
  const [formData, setFormData] = useState<addProductParams>({
    product: { type: "product", is_active: true, vendor: clientId },
  });
  const [loader, setLoader] = useState(loading === "pending" || false);

  const { goBack } = useNavigation();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (product?.product?.id) {
      const productImages = product?.product_images?.filter(
        ({ image_ref }) => image_ref
      );
      setFormData({
        product: { ...product?.product },
        product_images: productImages || [],
      });
    }
  }, [product?.product]);
  console.log("productAssetsData :", productAssetsData);
  useEffect(() => {
    setLoader(false);
    if (productAssetsData && isArray(productAssetsData)) {
      addEditProduct(productAssetsData);
    }
  }, [productAssetsData]);

  const addEditProduct = (assetsData) => {
    setLoader(false);
    const callback = () => goBack();
    const product_images = assetsData.map(({ reference_number }) => {
      return { image_ref: reference_number };
    });
    const arg = { ...formData, product_images };
    if (product?.product.id)
      dispatch(editProduct({ id: product?.product.id, arg, callback }));
    else dispatch(addProduct({ arg, callback }));
    dispatch(clearAssets(null));
  };

  // const getImageBase64 = async (url: string) => {
  //   return await downloadImage(url);
  // }

  const handleSubmit = () => {
    loading = "pending";
    Keyboard.dismiss();
    const validation = addProductValidation(formData);
    dispatch(setError(validation.errorMsg));

    if (!validation.status) {
      const callback = () => {};
      const product_images = imageRef.current?.getImages();
      if (product_images && product_images.length) {
        setLoader(true);
        const imageParams = product_images?.map((images) => {
          let imageData = images.image_ref?.split("/");
          return {
            reference_number: images.image_ref,
            file_name: imageData[imageData?.length - 1],
            file_description: "Product Image",
            file_type: images.mime,
            base64: images.base64,
          };
        });
        dispatch(createAssets({ imageParams, callback }));
      } else if (product?.product.id) {
        setLoader(true);
        addEditProduct([]);
      }
    }
  };

  const handleTextChange = (
    key: keyof addProductErrorState,
    text: string | number
  ) => {
    dispatch(setError({ ...errors, [key]: null }));
    setFormData({ ...formData, product: { ...formData.product, [key]: text } });
  };

  return (
    <>
      <CustomTextInput
        mandatory
        label="PRODUCT NAME"
        placeHolder="Product Name"
        value={formData.product.product_name}
        onChangeText={(text) => handleTextChange("product_name", text)}
        errorMessage={errors?.product_name}
      />
      <Dropdown
        mandatory
        label="CATEGORY"
        value={formData.product.product_category}
        labelField="category_name"
        valueField="id"
        dropdownData={productCategoryInfo}
        errorMessage={errors?.product_category}
        setCategory={(text) => handleTextChange("product_category", text)}
      />
      <Box
        flexDirection="row"
        justifyContent="space-between"
        alignItems="center"
        // marginBottom="s"
      >
        <Box style={{ marginTop: -13 }}>
          <CounterButton
            count={formData.product.quantity ?? 0}
            onChange={(count) => handleTextChange("quantity", count)}
          />
        </Box>
        <Dropdown
          label="UNIT"
          labelField="data"
          valueField="id"
          boxWidth={WIDTH / 2.5}
          value={formData.product.unit}
          setCategory={(selected) => handleTextChange("unit", selected)}
          dropdownData={[
            { data: "Kg", id: "kg" },
            { data: "Gram", id: "g" },
            { data: "Metre", id: "metre" },
            { data: "Box", id: "box" },
            { data: "Dozen", id: "dozen" },
            { data: "Units", id: "units" },
            { data: "Piece", id: "piece" },
            { data: "Pack", id: "pack" },
          ]}
        />
      </Box>
      <CustomTextInput
        mandatory
        label="MAXIMUM RETAIL PRICE"
        value={formData.product.max_retail_price?.toString()}
        onChangeText={(text) => handleTextChange("max_retail_price", text)}
        errorMessage={errors?.max_retail_price}
        keyboardType="number-pad"
        iconLeftName="inrCurrency"
      />
      <CustomTextInput
        mandatory
        label="WHOLE SALE PRICE"
        value={formData.product.wholesale_price?.toString()}
        onChangeText={(text) => handleTextChange("wholesale_price", text)}
        errorMessage={errors?.wholesale_price as string}
        keyboardType="number-pad"
        iconLeftName="inrCurrency"
      />
      <CustomTextInput
        label="OFFER PRICE"
        value={formData.product.offer_price?.toString()}
        onChangeText={(text) => handleTextChange("offer_price", text)}
        keyboardType="number-pad"
        iconLeftName="inrCurrency"
      />
      {/* <FileInput
        label="DOCUMENT"
        fileName={formData.product.document_ref}
        onChooseFile={(file) => handleTextChange("document_ref", file)}
      /> */}
      <TextArea
        mTop="xxl"
        mBottom="xx3l"
        mHeight={150}
        maxLength={200}
        placeHolder="Desc"
        label="DESCRIPTION"
        value={formData.product.description}
        onChangeText={(text) => handleTextChange("description", text)}
      />
      <ImportantNote
        Title="INFO"
        Message="INFO IMAGE"
        action="CLICK"
        mBottom="xx3l"
      />
      <ImageUpload ref={imageRef} formData={formData?.product_images || []} />
      <CustomButton
        label={product?.product.id ? "SAVE CHANGES" : "ADD PRODUCT"}
        onPress={!loader ? handleSubmit : () => {}}
        loading={loader || loading === "pending"}
      />
      <AlertPopup
        type="Success"
        onConfirm={() => {
          goBack();
        }}
        visible={showPopup}
        onClose={() => setShowPopup(false)}
      />
    </>
  );
};
