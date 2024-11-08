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
import { clearAssets, createAssets } from "@store/reducers/common";
import { getAssets } from "@store/selector/common";
import { addProductValidation } from "@helpers/product";
import AlertPopup from "@components/AlertPopup";
import { useNavigation } from "@react-navigation/native";
import FileInput from "@components/FileInput";
import { isArray } from "lodash";

interface productProps {
  product?: productState | null;
}

export default ({ product }: productProps) => {
  const productAssetsData = useAppSelector(getAssets);
  const clientId = useAppSelector(getUserReferenceId);
  console.log(clientId, 'vendor');
  
  const imageRef = useRef<{ getImages: () => imageState }>(null);
  const errors = useAppSelector(getErrors);
  const loading = useAppSelector(getLoading);
  const productCategoryInfo = useAppSelector(getProductCategoryInfo);
  const [showPopup, setShowPopup] = useState(false);
  const [formData, setFormData] = useState<addProductParams>({
    product: { type: "product", is_active: true, vendor: clientId },
  });
  const [loader, setLoader] = useState(false);

  const { goBack } = useNavigation();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (product?.product?.id) {
      const productImages = product?.product_images?.filter(
        ({ image_ref }) => image_ref
      );
      setFormData({
        product: { ...product.product },
        product_images: productImages || [],
      });
    }
  }, [product?.product]);

  useEffect(() => {
    if (isArray(productAssetsData) && productAssetsData.length > 0) {
      addEditProduct(productAssetsData);
    }
  }, [productAssetsData]);

  const addEditProduct = async (assetsData) => {
    const callback = () => {
      goBack();
    };
    const product_images = assetsData.map(({ reference_number }) => ({
      image_ref: reference_number,
    }));
    const arg = { 
      ...formData, 
      product: { 
        ...formData.product,
        vendor: clientId // Use full clientId
      }, 
      product_images 
    };
    
    setLoader(false);
  
    // Log the payload before making the API call
    console.log("Payload:", arg);  // <-- Add the console log here
  
    try {
      let result;
      if (product?.product.id) {
        result = await dispatch(editProduct({ id: product?.product.id, arg, callback }));
      } else {
        result = await dispatch(addProduct({ arg, callback }));
      }
  
      dispatch(clearAssets(null));
  
      if (addProduct.fulfilled.match(result)) {
        console.log('Product submit response:', result);
      } else {
        const errorMessage = result.payload?.error || "An error occurred during submission";
        dispatch(setError({ general: errorMessage }));
        console.error('Error during product submission:', errorMessage);
      }
    } catch (error) {
      console.error('Unexpected error:', error);
    }
  };
  

  const handleSubmit = async () => {
    console.log("Submit button pressed", formData);
  
    // Validate the form data
    const validation = addProductValidation(formData);
    if (!validation.status) {
      if (!clientId) {
        dispatch(setError({ vendor: "Vendor ID is required" }));
      }
      return;
    }
    
    console.log("Validation result:", validation);
  
    // If validation fails, show the errors and return
    if (!validation.status) {
      console.log("Validation failed:", validation.errorMsg);
      dispatch(setError(validation.errorMsg));
      return;
    }
  
    // Add vendor validation
    if (!clientId) {
      console.log("No valid vendor selected");
      dispatch(setError({ general: "Please select a valid vendor." }));
      return;
    }
  
    // Construct the payload for the product
    const payload = {
      product: {
        product_name: formData?.product?.product_name,
        product_category: formData?.product?.product_category,
        max_retail_price: formData?.product?.max_retail_price,
        wholesale_price: formData?.product?.wholesale_price,
        offer_price: formData?.product?.offer_price,
        description: formData?.product?.description,
        quantity: formData?.product?.quantity,
        unit: formData?.product?.unit,
        type: formData?.product?.type,
        vendor: clientId,
        is_active: formData?.product?.is_active,
      },
      product_images: imageRef.current?.getImages(), // Handle product images
    };
  
    // Create the params for the API call
    const callback = goBack; // Navigate back on success
    const params = {
      id: product?.product.id, // Assuming you have the product ID for editing
      arg: payload,
      callback,
    };
  
    try {
      // Dispatch the action to add or edit the product
      const response = product?.product.id // Check if we are editing or adding
        ? await dispatch(editProduct(params)).unwrap()
        : await dispatch(addProduct(params)).unwrap();
  
      // Handle the response from the API call
      if (response?.statusCode === 201 && response?.status) {
        console.log("Product data submitted successfully");
        goBack(); // Navigate back on successful submission
      } else {
        // Handle unexpected response structure or status
        const errorMsg = response?.message || "An unexpected error occurred";
        console.log("Unexpected response:", errorMsg);
        dispatch(setError(errorMsg));
      }
    } catch (error) {
      // Handle API error
      const errorMsg = error?.response?.data?.message || "An unexpected error occurred";
      const statusCode = error?.response?.status;
      console.log("API error:", errorMsg, "Status Code:", statusCode);
      dispatch(setError(errorMsg));
    }
  };
  
  
  
  const handleTextChange = (
    key: keyof addProductErrorState,
    text: string | number
  ) => {
    dispatch(setError({ ...errors, [key]: null }));
    setFormData((prevFormData) => ({
      ...prevFormData,
      product: { ...prevFormData.product, [key]: text },
    }));
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
      <Box flexDirection="row" justifyContent="space-between" alignItems="center">
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
        errorMessage={errors?.wholesale_price}
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
      <TextArea
        mTop="xxl"
        mBottom="xx3l"
        mHeight={150}
        maxLength={200}
        placeHolder="Description"
        label="DESCRIPTION"
        value={formData.product.description}
        onChangeText={(text) => handleTextChange("description", text)}
      />
      <ImportantNote Title="INFO" Message="INFO IMAGE" action="CLICK" mBottom="xx3l" />
      <ImageUpload ref={imageRef} formData={formData?.product_images || []} />
      <CustomButton
        label={product?.product.id ? "SAVE CHANGES" : "ADD PRODUCT"}
        onPress={!loader ? handleSubmit : undefined}
        loading={loader || loading === "pending"}
      />
      <AlertPopup
        type="Success"
        onConfirm={() => goBack()}
        visible={showPopup}
        onClose={() => setShowPopup(false)}
      />
    </>
  );
};


// import uuid from "react-native-uuid";
// import CustomButton from "@components/CustomButton";
// import { WIDTH } from "@utils/dimensions";
// import { Box } from "@utils/Theme";
// import React, { useCallback, useEffect, useRef, useState } from "react";
// import CounterButton from "./CounterButton";
// import ImageUpload, { imageState } from "./ImageUpload";
// import ImportantNote from "./ImportantNote";
// import TextArea from "@components/TextArea";
// import CustomTextInput from "@components/CustomTextInput";
// import Dropdown from "@components/Dropdown";
// import { useAppDispatch, useAppSelector } from "@hooks/redux";
// import {
//   getErrors,
//   getLoading,
//   getProductCategoryInfo,
// } from "@store/selector/product";
// import {
//   addProductErrorState,
//   addProductParams,
//   productState,
// } from "@typings/product";
// import { getUserReferenceId } from "@store/selector/auth";
// import { Keyboard } from "react-native";
// import { addProduct, editProduct, setError } from "@store/reducers/product";
// import { clearAssets } from "@store/reducers/common";
// import { getAssets } from "@store/selector/common";
// import { createAssets } from "@store/reducers/common";
// import { addProductValidation } from "@helpers/product";
// import AlertPopup from "@components/AlertPopup";
// import { useNavigation } from "@react-navigation/native";
// import FileInput from "@components/FileInput";
// import { isArray } from "lodash";

// interface productProps {
//   product?: productState | null;
// }

// export default ({ product }: productProps) => {
//   const productAssetsData = useAppSelector(getAssets);
//   const clientId = useAppSelector(getUserReferenceId);
//   console.log(clientId, 'clientidddd');
  
//   const imageRef = useRef<{ getImages: () => imageState }>(null);
//   const errors = useAppSelector(getErrors);
//   const loading = useAppSelector(getLoading); // Remove local state for loading
//   const productCategoryInfo = useAppSelector(getProductCategoryInfo);
//   const [showPopup, setShowPopup] = useState(false);
//   const [formData, setFormData] = useState<addProductParams>({
//     product: { type: "product", is_active: true, vendor: clientId },
//   });
//   const [loader, setLoader] = useState(false); // Local loader state
//   const { goBack } = useNavigation();
//   const dispatch = useAppDispatch();

//   useEffect(() => {
//     if (product?.product?.id) {
//       const productImages = product?.product_images?.filter(({ image_ref }) => image_ref);
//       setFormData({
//         product: { ...product?.product },
//         product_images: productImages || [],
//       });
//     }
// }, [product]);

// useEffect(() => {
//   if (productAssetsData && isArray(productAssetsData)) {
//     addEditProduct(productAssetsData);
//   }
// }, [productAssetsData]);
// console.log('Form Data:', formData);
// console.log('Errors:', errors);
// console.log('Loading State:', loading);


// const addEditProduct = (assetsData) => {
//   const product_images = assetsData.map(({ reference_number }) => ({
//     image_ref: reference_number,
//   }));

//   const arg = { ...formData, product_images };
//   console.log('Submitting Product Data:', arg); // Debugging

//   const callback = () => goBack();

//   if (product?.product.id) {
//     dispatch(editProduct({ id: product?.product.id, arg, callback }));
//   } else {
//     dispatch(addProduct({ arg, callback }));
//   }
//   dispatch(clearAssets(null));
// };


//   const handleSubmit = useCallback(() => {
//     Keyboard.dismiss();
//     const validation = addProductValidation(formData);
//     dispatch(setError(validation.errorMsg));
  
//     if (!validation.status) {
//       setLoader(true);
//       const product_images = imageRef.current?.getImages();
  
//       if (product_images?.length) {
//         const imageParams = product_images.map(({ image_ref, mime, base64 }) => ({
//           reference_number: image_ref,
//           file_name: image_ref.split("/").pop(),
//           file_description: "Product Image",
//           file_type: mime,
//           base64,
//         }));
  
//         dispatch(createAssets({ imageParams, callback: () => addEditProduct([]) }));
//       } else {
//         addEditProduct([]); // Call for empty product images
//       }
//     }
//   }, [formData, dispatch]);
  

//   const handleTextChange = (key: keyof addProductErrorState, text: string | number) => {
//     dispatch(setError({ ...errors, [key]: null }));
//     setFormData({ ...formData, product: { ...formData.product, [key]: text } });
//   };

  
//   return (
//     <>
//       <CustomTextInput
//         mandatory
//         label="PRODUCT NAME"
//         placeHolder="Product Name"
//         value={formData.product.product_name}
//         onChangeText={(text) => handleTextChange("product_name", text)}
//         errorMessage={errors?.product_name}
//       />
//       <Dropdown
//         mandatory
//         label="CATEGORY"
//         value={formData.product.product_category}
//         labelField="category_name"
//         valueField="id"
//         dropdownData={productCategoryInfo}
//         errorMessage={errors?.product_category}
//         setCategory={(text) => handleTextChange("product_category", text)}
//       />
//       <Box flexDirection="row" justifyContent="space-between" alignItems="center">
//         <Box style={{ marginTop: -13 }}>
//           <CounterButton
//             count={formData.product.quantity ?? 0}
//             onChange={(count) => handleTextChange("quantity", count)}
//           />
//         </Box>
//         <Dropdown
//           label="UNIT"
//           labelField="data"
//           valueField="id"
//           boxWidth={WIDTH / 2.5}
//           value={formData.product.unit}
//           setCategory={(selected) => handleTextChange("unit", selected)}
//           dropdownData={[
//             { data: "Kg", id: "kg" },
//             { data: "Gram", id: "g" },
//             { data: "Metre", id: "metre" },
//             { data: "Box", id: "box" },
//             { data: "Dozen", id: "dozen" },
//             { data: "Units", id: "units" },
//             { data: "Piece", id: "piece" },
//             { data: "Pack", id: "pack" },
//           ]}
//         />
//       </Box>
//       <CustomTextInput
//         mandatory
//         label="MAXIMUM RETAIL PRICE"
//         value={formData.product.max_retail_price?.toString()}
//         onChangeText={(text) => handleTextChange("max_retail_price", text)}
//         errorMessage={errors?.max_retail_price}
//         keyboardType="number-pad"
//         iconLeftName="inrCurrency"
//       />
//       <CustomTextInput
//         mandatory
//         label="WHOLE SALE PRICE"
//         value={formData.product.wholesale_price?.toString()}
//         onChangeText={(text) => handleTextChange("wholesale_price", text)}
//         errorMessage={errors?.wholesale_price as string}
//         keyboardType="number-pad"
//         iconLeftName="inrCurrency"
//       />
//       <CustomTextInput
//         label="OFFER PRICE"
//         value={formData.product.offer_price?.toString()}
//         onChangeText={(text) => handleTextChange("offer_price", text)}
//         keyboardType="number-pad"
//         iconLeftName="inrCurrency"
//       />
//       <TextArea
//         mTop="xxl"
//         mBottom="xx3l"
//         mHeight={150}
//         maxLength={200}
//         placeHolder="Desc"
//         label="DESCRIPTION"
//         value={formData.product.description}
//         onChangeText={(text) => handleTextChange("description", text)}
//       />
//       <ImportantNote
//         Title="INFO"
//         Message="INFO IMAGE"
//         action="CLICK"
//         mBottom="xx3l"
//       />
//       <ImageUpload ref={imageRef} formData={formData?.product_images || []} />
//       <CustomButton
//         label={product?.product.id ? "SAVE CHANGES" : "ADD PRODUCT"}
//         onPress={!loader ? handleSubmit : () => {}}
//         loading={loader || loading === "pending"}
//       />
//       <AlertPopup
//         type="Success"
//         onConfirm={() => {
//           setShowPopup(false);
//           goBack(); // Close popup and navigate back
//         }}
//         visible={showPopup}
//         onClose={() => setShowPopup(false)}
//       />
//     </>
//   );
// };
