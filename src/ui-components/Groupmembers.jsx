/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

/* eslint-disable */
import * as React from "react";
import { getOverrideProps } from "@aws-amplify/ui-react/internal";
import Aastha from "./Aastha";
import Isabel from "./Isabel";
import Jess from "./Jess";
import Mon from "./Mon";
import Ram from "./Ram";
import { Flex } from "@aws-amplify/ui-react";
export default function Groupmembers(props) {
  const { overrides, ...rest } = props;
  return (
    <Flex
      gap="96px"
      direction="row"
      width="unset"
      height="unset"
      justifyContent="center"
      alignItems="flex-start"
      position="relative"
      padding="20px 20px 20px 20px"
      {...getOverrideProps(overrides, "Groupmembers")}
      {...rest}
    >
      <Aastha
        display="flex"
        gap="32px"
        direction="column"
        width="unset"
        height="unset"
        justifyContent="flex-start"
        alignItems="center"
        shrink="0"
        position="relative"
        padding="0px 0px 0px 0px"
        {...getOverrideProps(overrides, "Aastha")}
      ></Aastha>
      <Isabel
        display="flex"
        gap="32px"
        direction="column"
        width="unset"
        height="unset"
        justifyContent="flex-start"
        alignItems="center"
        shrink="0"
        position="relative"
        padding="0px 0px 0px 0px"
        {...getOverrideProps(overrides, "Isabel")}
      ></Isabel>
      <Jess
        display="flex"
        gap="32px"
        direction="column"
        width="unset"
        height="unset"
        justifyContent="flex-start"
        alignItems="center"
        shrink="0"
        position="relative"
        padding="0px 0px 0px 0px"
        {...getOverrideProps(overrides, "Jess")}
      ></Jess>
      <Mon
        display="flex"
        gap="0"
        direction="column"
        width="unset"
        height="unset"
        justifyContent="flex-start"
        alignItems="flex-start"
        shrink="0"
        position="relative"
        padding="0px 0px 0px 0px"
        {...getOverrideProps(overrides, "Mon")}
      ></Mon>
      <Ram
        display="flex"
        gap="0"
        direction="column"
        width="unset"
        height="unset"
        justifyContent="flex-start"
        alignItems="flex-start"
        shrink="0"
        position="relative"
        padding="0px 0px 0px 0px"
        {...getOverrideProps(overrides, "Ram")}
      ></Ram>
    </Flex>
  );
}
