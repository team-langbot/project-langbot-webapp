/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

/* eslint-disable */
import * as React from "react";
import { getOverrideProps } from "@aws-amplify/ui-react/internal";
import { Flex, Image } from "@aws-amplify/ui-react";
export default function Conversationallyheader(props) {
  const { overrides, ...rest } = props;
  return (
    <Flex
      gap="10px"
      direction="column"
      width="unset"
      height="unset"
      justifyContent="center"
      alignItems="center"
      position="relative"
      padding="10px 10px 10px 10px"
      {...getOverrideProps(overrides, "Conversationallyheader")}
      {...rest}
    >
      <Image
        width="1430px"
        height="368px"
        display="block"
        gap="unset"
        alignItems="unset"
        justifyContent="unset"
        shrink="0"
        position="relative"
        padding="0px 0px 0px 0px"
        objectFit="cover"
        src="https://project-langbot-images.s3.us-west-2.amazonaws.com/conversationally_header.png"
        {...getOverrideProps(overrides, "conversationally_header 1")}
      ></Image>
    </Flex>
  );
}
