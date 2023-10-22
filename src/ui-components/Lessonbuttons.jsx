/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

/* eslint-disable */
import * as React from "react";
import { getOverrideProps } from "@aws-amplify/ui-react/internal";
import Lessononebutton from "./Lessononebutton";
import Lessontwobutton from "./Lessontwobutton";
import { Flex } from "@aws-amplify/ui-react";
export default function Lessonbuttons(props) {
  const { overrides, ...rest } = props;
  return (
    <Flex
      gap="35px"
      direction="column"
      width="unset"
      height="unset"
      justifyContent="flex-start"
      alignItems="flex-start"
      position="relative"
      padding="0px 0px 0px 0px"
      {...getOverrideProps(overrides, "Lessonbuttons")}
      {...rest}
    >
      <Lessononebutton
        display="flex"
        gap="10px"
        direction="row"
        width="unset"
        height="unset"
        justifyContent="center"
        alignItems="center"
        shrink="0"
        position="relative"
        padding="10px 10px 10px 10px"
        backgroundColor="rgba(245,233,227,1)"
        {...getOverrideProps(overrides, "lesson one button")}
      ></Lessononebutton>
      <Lessontwobutton
        display="flex"
        gap="10px"
        direction="row"
        width="unset"
        height="unset"
        justifyContent="center"
        alignItems="center"
        shrink="0"
        position="relative"
        padding="10px 10px 10px 10px"
        backgroundColor="rgba(245,233,227,1)"
        {...getOverrideProps(overrides, "lesson two button")}
      ></Lessontwobutton>
    </Flex>
  );
}
