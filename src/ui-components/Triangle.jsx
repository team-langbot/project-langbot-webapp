/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

/* eslint-disable */
import * as React from "react";
import { getOverrideProps } from "@aws-amplify/ui-react/internal";
import { Flex, Icon } from "@aws-amplify/ui-react";
export default function Triangle(props) {
  const { overrides, ...rest } = props;
  return (
    <Flex
      gap="10px"
      direction="row"
      width="1658px"
      height="424px"
      justifyContent="space-between"
      alignItems="center"
      position="relative"
      padding="10px 10px 10px 10px"
      {...getOverrideProps(overrides, "Triangle")}
      {...rest}
    >
      <Icon
        width="unset"
        height="unset"
        viewBox={{ minX: 0, minY: 0, width: 1638, height: 404 }}
        paths={[
          {
            d: "M0 0L1638 0L1638 404L0 0Z",
            fill: "rgba(173,143,108,0.7)",
            fillRule: "nonzero",
          },
        ]}
        display="block"
        gap="unset"
        alignItems="unset"
        justifyContent="unset"
        grow="1"
        shrink="1"
        basis="0"
        alignSelf="stretch"
        position="relative"
        {...getOverrideProps(overrides, "Rectangle 1")}
      ></Icon>
    </Flex>
  );
}
