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
import { Icon, Image, Text, View } from "@aws-amplify/ui-react";
export default function AboutUs(props) {
  const { overrides, ...rest } = props;
  const homeOnClick = useNavigateAction({ type: "url", url: "/" });
  const letstalkOnClick = useNavigateAction({ type: "url", url: "/lobby" });
  return (
    <View
      width="1718px"
      height="928px"
      display="block"
      gap="unset"
      alignItems="unset"
      justifyContent="unset"
      overflow="hidden"
      position="relative"
      padding="0px 0px 0px 0px"
      backgroundColor="rgba(244,233,227,1)"
      {...getOverrideProps(overrides, "AboutUs")}
      {...rest}
    >
      <View
        width="1440px"
        height="1024px"
        display="block"
        gap="unset"
        alignItems="unset"
        justifyContent="unset"
        overflow="hidden"
        position="absolute"
        top="-48px"
        left="139px"
        padding="0px 0px 0px 0px"
        backgroundColor="rgba(244,233,227,1)"
        {...getOverrideProps(overrides, "About Us - 3")}
      >
        <View
          width="1440px"
          height="270px"
          display="block"
          gap="unset"
          alignItems="unset"
          justifyContent="unset"
          overflow="hidden"
          position="absolute"
          top="13.38%"
          bottom="60.25%"
          left="calc(50% - 720px - 0px)"
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
                {...getOverrideProps(overrides, "Vector1520")}
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
                  height: 1564.88232421875,
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
                {...getOverrideProps(overrides, "Vector1522")}
              ></Icon>
              <Icon
                width="59.44%"
                height="77.93%"
                viewBox={{
                  minX: 0,
                  minY: 0,
                  width: 1440,
                  height: 1219.507568359375,
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
                {...getOverrideProps(overrides, "Vector1523")}
              ></Icon>
            </View>
          </View>
        </View>
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
          height="77px"
          gap="unset"
          alignItems="unset"
          position="absolute"
          top="6.84%"
          bottom="85.64%"
          left="78.68%"
          right="2.99%"
          padding="0px 0px 0px 0px"
          whiteSpace="pre-wrap"
          children="home"
          onClick={() => {
            homeOnClick();
          }}
          {...getOverrideProps(overrides, "home")}
        ></Text>
        <View
          padding="0px 0px 0px 0px"
          width="1372px"
          height="309px"
          display="block"
          gap="unset"
          alignItems="unset"
          justifyContent="unset"
          position="absolute"
          top="413px"
          left="calc(50% - 686px - -28px)"
          {...getOverrideProps(overrides, "Group 5")}
        >
          <Image
            width="248px"
            height="309px"
            display="block"
            gap="unset"
            alignItems="unset"
            justifyContent="unset"
            position="absolute"
            top="0px"
            left="0px"
            padding="0px 0px 0px 0px"
            objectFit="cover"
            {...getOverrideProps(overrides, "Rectangle 7")}
          ></Image>
          <Image
            width="248px"
            height="309px"
            display="block"
            gap="unset"
            alignItems="unset"
            justifyContent="unset"
            position="absolute"
            top="0px"
            left="1124px"
            padding="0px 0px 0px 0px"
            objectFit="cover"
            {...getOverrideProps(overrides, "Rectangle 11")}
          ></Image>
          <Image
            width="248px"
            height="309px"
            display="block"
            gap="unset"
            alignItems="unset"
            justifyContent="unset"
            position="absolute"
            top="0px"
            left="281px"
            padding="0px 0px 0px 0px"
            objectFit="cover"
            {...getOverrideProps(overrides, "Rectangle 8")}
          ></Image>
          <Image
            width="248px"
            height="309px"
            display="block"
            gap="unset"
            alignItems="unset"
            justifyContent="unset"
            position="absolute"
            top="0px"
            left="562px"
            padding="0px 0px 0px 0px"
            objectFit="cover"
            {...getOverrideProps(overrides, "Rectangle 9")}
          ></Image>
          <Image
            width="248px"
            height="309px"
            display="block"
            gap="unset"
            alignItems="unset"
            justifyContent="unset"
            position="absolute"
            top="0px"
            left="843px"
            padding="0px 0px 0px 0px"
            objectFit="cover"
            {...getOverrideProps(overrides, "Rectangle 10")}
          ></Image>
        </View>
        <Text
          fontFamily="Inter"
          fontSize="27.30817985534668px"
          fontWeight="600"
          color="rgba(69,67,16,1)"
          textTransform="uppercase"
          lineHeight="33.049102783203125px"
          textAlign="center"
          display="block"
          direction="column"
          justifyContent="unset"
          width="295px"
          height="119.5px"
          gap="unset"
          alignItems="unset"
          position="absolute"
          top="71.09%"
          bottom="17.24%"
          left="25px"
          right="1120px"
          padding="0px 0px 0px 0px"
          whiteSpace="pre-wrap"
          children="Aastha Khanna&#xA;application/&#xA;ML development"
          {...getOverrideProps(
            overrides,
            "Aastha Khanna application/ ML development"
          )}
        ></Text>
        <Text
          fontFamily="Inter"
          fontSize="27.30817985534668px"
          fontWeight="600"
          color="rgba(69,67,16,1)"
          textTransform="uppercase"
          lineHeight="33.049102783203125px"
          textAlign="center"
          display="block"
          direction="column"
          justifyContent="unset"
          width="295px"
          height="127px"
          gap="unset"
          alignItems="unset"
          position="absolute"
          top="67.29%"
          bottom="20.31%"
          left="1169px"
          right="-24px"
          padding="0px 0px 0px 0px"
          whiteSpace="pre-wrap"
          children="Ram Senthamarai&#xA;Data science"
          {...getOverrideProps(overrides, "Ram Senthamarai Data science")}
        ></Text>
        <Text
          fontFamily="Inter"
          fontSize="27.30817985534668px"
          fontWeight="600"
          color="rgba(69,67,16,1)"
          textTransform="uppercase"
          lineHeight="33.049102783203125px"
          textAlign="center"
          display="block"
          direction="column"
          justifyContent="unset"
          width="295px"
          height="149px"
          gap="unset"
          alignItems="unset"
          position="absolute"
          top="68.26%"
          bottom="17.19%"
          left="867px"
          right="278px"
          padding="0px 0px 0px 0px"
          whiteSpace="pre-wrap"
          children="mon young&#xA;project management"
          {...getOverrideProps(overrides, "mon young project management")}
        ></Text>
        <Text
          fontFamily="Inter"
          fontSize="27.30817985534668px"
          fontWeight="600"
          color="rgba(69,67,16,1)"
          textTransform="uppercase"
          lineHeight="33.049102783203125px"
          textAlign="center"
          display="block"
          direction="column"
          justifyContent="unset"
          width="295px"
          height="119.5px"
          gap="unset"
          alignItems="unset"
          position="absolute"
          top="68.26%"
          bottom="20.07%"
          left="585px"
          right="560px"
          padding="0px 0px 0px 0px"
          whiteSpace="pre-wrap"
          children="jess matthews&#xA;product/ux"
          {...getOverrideProps(overrides, "jess matthews product/ux")}
        ></Text>
        <Text
          fontFamily="Inter"
          fontSize="27.30817985534668px"
          fontWeight="600"
          color="rgba(69,67,16,1)"
          textTransform="uppercase"
          lineHeight="33.049102783203125px"
          textAlign="center"
          display="block"
          direction="column"
          justifyContent="unset"
          width="295px"
          height="119.5px"
          gap="unset"
          alignItems="unset"
          position="absolute"
          top="68.26%"
          bottom="20.07%"
          left="320px"
          right="825px"
          padding="0px 0px 0px 0px"
          whiteSpace="pre-wrap"
          children="Isabel chan&#xA;data engineering"
          {...getOverrideProps(overrides, "Isabel chan data engineering")}
        ></Text>
      </View>
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
        height="77px"
        gap="unset"
        alignItems="unset"
        position="absolute"
        top="22px"
        left="1402px"
        padding="0px 0px 0px 0px"
        whiteSpace="pre-wrap"
        children="let’s talk"
        onClick={() => {
          letstalkOnClick();
        }}
        {...getOverrideProps(overrides, "let\u2019s talk")}
      ></Text>
    </View>
  );
}
