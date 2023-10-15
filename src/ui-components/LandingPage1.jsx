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
import { Flex, Icon, Image, Text, View } from "@aws-amplify/ui-react";
export default function LandingPage1(props) {
  const { overrides, ...rest } = props;
  const aboutUsOnClick = useNavigateAction({ type: "url", url: "/about-us" });
  const letstalkOnClick = useNavigateAction({
    type: "url",
    url: `${"/lobby"}${""}`,
  });
  return (
    <Flex
      gap="20px"
      direction="column"
      width="unset"
      height="unset"
      justifyContent="flex-start"
      alignItems="flex-start"
      overflow="hidden"
      position="relative"
      padding="128px 0px 128px 0px"
      backgroundColor="rgba(244,233,227,1)"
      {...getOverrideProps(overrides, "LandingPage1")}
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
        width="264px"
        height="59px"
        gap="unset"
        alignItems="unset"
        shrink="0"
        position="relative"
        padding="0px 0px 0px 0px"
        whiteSpace="pre-wrap"
        children="About Us"
        onClick={() => {
          aboutUsOnClick();
        }}
        {...getOverrideProps(overrides, "About Us")}
      ></Text>
      <View
        width="1440px"
        height="270px"
        display="block"
        gap="unset"
        alignItems="unset"
        justifyContent="unset"
        overflow="hidden"
        shrink="0"
        position="relative"
        boxShadow="0px 4px 4px rgba(0, 0, 0, 0.25)"
        padding="0px 0px 0px 0px"
        {...getOverrideProps(overrides, "Frame")}
      >
        <View
          padding="0px 0px 0px 0px"
          width="2400.56px"
          height="298px"
          display="block"
          gap="unset"
          alignItems="unset"
          justifyContent="unset"
          position="absolute"
          top="-10.37%"
          bottom="0%"
          left="0%"
          right="-66.71%"
          {...getOverrideProps(overrides, "Clip path group")}
        >
          <View
            padding="0px 0px 0px 0px"
            width="2400.56px"
            height="298px"
            display="block"
            gap="unset"
            alignItems="unset"
            justifyContent="unset"
            position="absolute"
            top="0%"
            bottom="0%"
            left="0%"
            right="0%"
            {...getOverrideProps(overrides, "clip0_10_88")}
          >
            <Icon
              width="2400.56px"
              height="298px"
              viewBox={{
                minX: 0,
                minY: 0,
                width: 2400.560791015625,
                height: 298,
              }}
              paths={[
                {
                  d: "M2400.56 0L0 0L0 298L2400.56 298L2400.56 0Z",
                  fill: "rgba(0,0,0,1)",
                  fillRule: "nonzero",
                },
              ]}
              display="block"
              gap="unset"
              alignItems="unset"
              justifyContent="unset"
              position="absolute"
              top="0%"
              bottom="0%"
              left="0%"
              right="0%"
              {...getOverrideProps(overrides, "Vector815")}
            ></Icon>
          </View>
          <View
            padding="0px 0px 0px 0px"
            width="2422.43px"
            height="1564.88px"
            display="block"
            gap="unset"
            alignItems="unset"
            justifyContent="unset"
            position="absolute"
            top="-48.55%"
            bottom="-376.58%"
            left="-0.91%"
            right="0%"
            {...getOverrideProps(overrides, "Group")}
          >
            <Icon
              width="2422.43px"
              height="1564.88px"
              viewBox={{
                minX: 0,
                minY: 0,
                width: 2422.429931640625,
                height: 1564.882080078125,
              }}
              paths={[
                {
                  d: "M2422.43 0L0 0L0 1564.88L2422.43 1564.88L2422.43 0Z",
                  fill: "rgba(255,255,255,1)",
                  fillRule: "nonzero",
                },
              ]}
              display="block"
              gap="unset"
              alignItems="unset"
              justifyContent="unset"
              position="absolute"
              top="0%"
              bottom="0%"
              left="0%"
              right="0%"
              {...getOverrideProps(overrides, "Vector817")}
            ></Icon>
            <Icon
              width="59.44%"
              height="77.93%"
              viewBox={{
                minX: 0,
                minY: 0,
                width: 1440,
                height: 1219.5076904296875,
              }}
              paths={[
                {
                  d: "M1440 0L0 0L0 1219.51L1440 1219.51L1440 0Z",
                  fillRule: "nonzero",
                },
              ]}
              display="block"
              gap="unset"
              alignItems="unset"
              justifyContent="unset"
              position="absolute"
              top="11.04%"
              bottom="11.04%"
              left="0.9%"
              right="39.65%"
              {...getOverrideProps(overrides, "Vector818")}
            ></Icon>
          </View>
        </View>
      </View>
      <View
        width="1449px"
        height="774px"
        display="block"
        gap="unset"
        alignItems="unset"
        justifyContent="unset"
        overflow="hidden"
        shrink="0"
        position="relative"
        border="1px SOLID rgba(255,255,255,0.1)"
        borderRadius="2px"
        padding="0px 0px 0px 0px"
        backgroundColor="rgba(64,64,64,1)"
        {...getOverrideProps(overrides, "Frame 1")}
      >
        <Image
          width="100.59%"
          height="100%"
          display="block"
          gap="unset"
          alignItems="unset"
          justifyContent="unset"
          position="absolute"
          top="0%"
          bottom="0%"
          left="-0.59%"
          right="0%"
          padding="0px 0px 0px 0px"
          objectFit="unset"
          src="https://project-langbot-images.s3.us-west-2.amazonaws.com/teacher.jpeg"
          {...getOverrideProps(overrides, "Rectangle 5")}
        ></Image>
      </View>
      <Icon
        width="1453.5px"
        height="414px"
        viewBox={{ minX: 0, minY: 0, width: 1453.5, height: 414 }}
        paths={[
          {
            d: "M0 0L1453.5 0L1453.5 414L0 0Z",
            fill: "rgba(173,143,108,0.7)",
            fillRule: "nonzero",
          },
        ]}
        display="block"
        gap="unset"
        alignItems="unset"
        justifyContent="unset"
        shrink="0"
        position="relative"
        {...getOverrideProps(overrides, "Rectangle 1")}
      ></Icon>
      <View
        width="379px"
        height="124px"
        display="block"
        gap="unset"
        alignItems="unset"
        justifyContent="unset"
        shrink="0"
        position="relative"
        boxShadow="2px 6px 4px rgba(0.95686274766922, 0.9137254953384399, 0.8901960849761963, 1)"
        padding="0px 0px 0px 0px"
        backgroundColor="rgba(255,251,251,1)"
        {...getOverrideProps(overrides, "Rectangle 2")}
      ></View>
      <Text
        fontFamily="Inter"
        fontSize="32px"
        fontWeight="600"
        color="rgba(69,67,16,1)"
        textTransform="uppercase"
        lineHeight="38.727272033691406px"
        textAlign="left"
        display="block"
        direction="column"
        justifyContent="unset"
        width="189px"
        height="93px"
        gap="unset"
        alignItems="unset"
        shrink="0"
        position="relative"
        padding="0px 0px 0px 0px"
        whiteSpace="pre-wrap"
        children="Let’s talk"
        onClick={() => {
          letstalkOnClick();
        }}
        {...getOverrideProps(overrides, "Let\u2019s talk")}
      ></Text>
    </Flex>
  );
}
