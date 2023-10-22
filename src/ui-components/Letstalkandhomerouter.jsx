/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

/* eslint-disable */
import * as React from "react";
import {
  getOverrideProps,
  useNavigateAction,
} from "@aws-amplify/ui-react/internal";
import { Flex, Text } from "@aws-amplify/ui-react";
export default function Letstalkandhomerouter(props) {
  const { overrides, ...rest } = props;
  const letstalkOnClick = useNavigateAction({ type: "url", url: "/lobby" });
  const homeOnClick = useNavigateAction({ type: "url", url: "/" });
  return (
    <Flex
      gap="36px"
      direction="row"
      width="unset"
      height="unset"
      justifyContent="flex-start"
      alignItems="flex-start"
      position="relative"
      padding="0px 0px 0px 0px"
      backgroundColor="rgba(245,233,227,1)"
      {...getOverrideProps(overrides, "Letstalkandhomerouter")}
      {...rest}
    >
      <Text
        fontFamily="Inter"
        fontSize="32px"
        fontWeight="400"
        color="rgba(0,0,0,1)"
        textTransform="uppercase"
        lineHeight="38.727272033691406px"
        textAlign="left"
        display="block"
        direction="column"
        justifyContent="unset"
        width="unset"
        height="unset"
        gap="unset"
        alignItems="unset"
        shrink="0"
        position="relative"
        padding="0px 0px 0px 0px"
        whiteSpace="pre-wrap"
        children="let’s talk"
        onClick={() => {
          letstalkOnClick();
        }}
        {...getOverrideProps(overrides, "let\u2019s talk")}
      ></Text>
      <Text
        fontFamily="Inter"
        fontSize="32px"
        fontWeight="400"
        color="rgba(0,0,0,1)"
        textTransform="uppercase"
        lineHeight="38.727272033691406px"
        textAlign="left"
        display="block"
        direction="column"
        justifyContent="unset"
        width="unset"
        height="unset"
        gap="unset"
        alignItems="unset"
        shrink="0"
        position="relative"
        padding="0px 0px 0px 0px"
        whiteSpace="pre-wrap"
        children="home"
        onClick={() => {
          homeOnClick();
        }}
        {...getOverrideProps(overrides, "home")}
      ></Text>
    </Flex>
  );
}
