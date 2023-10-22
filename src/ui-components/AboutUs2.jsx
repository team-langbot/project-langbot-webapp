/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

/* eslint-disable */
import * as React from "react";
import { getOverrideProps } from "@aws-amplify/ui-react/internal";
import Conversationallyheader from "./Conversationallyheader";
import Teammembers from "./Teammembers";
import Letstalkandhomerouter from "./Letstalkandhomerouter";
import { Flex } from "@aws-amplify/ui-react";
export default function AboutUs2(props) {
  const { overrides, ...rest } = props;
  return (
    <Flex
      gap="16px"
      direction="column"
      width="1440px"
      height="1024px"
      justifyContent="flex-start"
      alignItems="flex-start"
      overflow="hidden"
      position="relative"
      padding="0px 0px 0px 0px"
      backgroundColor="rgba(245,233,227,1)"
      {...getOverrideProps(overrides, "AboutUs2")}
      {...rest}
    >
      <Conversationallyheader
        display="flex"
        gap="10px"
        direction="column"
        width="unset"
        height="unset"
        justifyContent="center"
        alignItems="center"
        shrink="0"
        alignSelf="stretch"
        position="relative"
        padding="10px 10px 10px 10px"
        {...getOverrideProps(overrides, "conversationally header")}
      ></Conversationallyheader>
      <Teammembers
        display="flex"
        gap="10px"
        direction="row"
        width="1440px"
        height="unset"
        justifyContent="flex-start"
        alignItems="flex-start"
        overflow="hidden"
        shrink="0"
        position="relative"
        padding="25px 54px 25px 54px"
        backgroundColor="rgba(245,233,227,1)"
        {...getOverrideProps(overrides, "team members")}
      ></Teammembers>
      <Letstalkandhomerouter
        display="flex"
        gap="36px"
        direction="row"
        width="unset"
        height="unset"
        justifyContent="flex-end"
        alignItems="flex-start"
        shrink="0"
        position="relative"
        padding="0px 20px 0px 20px"
        backgroundColor="rgba(245,233,227,1)"
        {...getOverrideProps(overrides, "let's talk and home router")}
      ></Letstalkandhomerouter>
    </Flex>
  );
}
