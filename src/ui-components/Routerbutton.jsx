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
export default function Routerbutton(props) {
  const { overrides, ...rest } = props;
  const routerbuttonOnClick = useNavigateAction({
    type: "url",
    url: "/about-us",
  });
  return (
    <Flex
      gap="10px"
      direction="row"
      width="450px"
      height="146px"
      justifyContent="center"
      alignItems="center"
      position="relative"
      padding="10px 10px 10px 10px"
      backgroundColor="rgba(244,233,227,1)"
      onClick={() => {
        routerbuttonOnClick();
      }}
      {...getOverrideProps(overrides, "Routerbutton")}
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
        children="About Us"
        {...getOverrideProps(overrides, "About Us")}
      ></Text>
    </Flex>
  );
}
