/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

/* eslint-disable */
import * as React from "react";
import { getOverrideProps } from "@aws-amplify/ui-react/internal";
import Routerbutton from "./Routerbutton";
import Conversationallyheader from "./Conversationallyheader";
import Lobbymainframe from "./Lobbymainframe";
import Triangle from "./Triangle";
import { Flex } from "@aws-amplify/ui-react";
export default function Lessonlobbycontents(props) {
  const { overrides, ...rest } = props;
  return (
    <Flex
      gap="10px"
      direction="column"
      width="unset"
      height="1703px"
      justifyContent="center"
      alignItems="center"
      position="relative"
      padding="10px 10px 10px 10px"
      backgroundColor="rgba(245,233,227,1)"
      {...getOverrideProps(overrides, "Lessonlobbycontents")}
      {...rest}
    >
      <Routerbutton
        display="flex"
        gap="10px"
        direction="row"
        width="unset"
        height="114px"
        justifyContent="flex-end"
        alignItems="flex-start"
        shrink="0"
        alignSelf="stretch"
        position="relative"
        padding="10px 10px 10px 10px"
        backgroundColor="rgba(244,233,227,1)"
        {...getOverrideProps(overrides, "router button")}
      ></Routerbutton>
      <Conversationallyheader
        display="flex"
        gap="10px"
        direction="column"
        width="unset"
        height="248px"
        justifyContent="center"
        alignItems="center"
        shrink="0"
        alignSelf="stretch"
        position="relative"
        padding="10px 10px 10px 10px"
        {...getOverrideProps(overrides, "conversationally header")}
      ></Conversationallyheader>
      <Lobbymainframe
        display="flex"
        gap="20px"
        direction="row"
        width="unset"
        height="unset"
        justifyContent="flex-start"
        alignItems="flex-start"
        overflow="hidden"
        shrink="0"
        position="relative"
        padding="50px 30px 50px 30px"
        backgroundColor="rgba(245,233,227,1)"
        {...getOverrideProps(overrides, "lobby main frame")}
      ></Lobbymainframe>
      <Triangle
        display="flex"
        gap="10px"
        direction="row"
        width="unset"
        height="573px"
        justifyContent="space-between"
        alignItems="center"
        shrink="0"
        alignSelf="stretch"
        position="relative"
        padding="10px 10px 10px 10px"
        {...getOverrideProps(overrides, "triangle")}
      ></Triangle>
    </Flex>
  );
}
