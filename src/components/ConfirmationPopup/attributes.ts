import { images } from "@utils/Images";
import { Theme } from "@utils/Theme";
import { ImageSourcePropType } from "react-native/types";

interface attributeProps {
  [key: string]: {
    title: string;
    color: keyof Theme["colors"];
    body?: string;
    image: { source: ImageSourcePropType; aspectRatio: number };
  };
}

const attributes: attributeProps = {
  Delete: {
    title: "SURE WANT TO DELETE",
    color: "textColor01",
    image: images.delete,
  },
  Success: {
    title: "SUCCESS",
    color: "boxColor15",
    body: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    image: images.successGreen,
  },
  Error: {
    title: "ERROR",
    color: "boxColor14",
    body: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    image: images.error,
  },
};

export default attributes;
