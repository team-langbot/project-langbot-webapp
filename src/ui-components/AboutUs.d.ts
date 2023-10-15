/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { EscapeHatchProps } from "@aws-amplify/ui-react/internal";
import { IconProps, ImageProps, TextProps, ViewProps } from "@aws-amplify/ui-react";
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type AboutUsOverridesProps = {
    AboutUs?: PrimitiveOverrideProps<ViewProps>;
    "About Us - 3"?: PrimitiveOverrideProps<ViewProps>;
    Frame?: PrimitiveOverrideProps<ViewProps>;
    "Clip path group"?: PrimitiveOverrideProps<ViewProps>;
    clip0_10_88?: PrimitiveOverrideProps<ViewProps>;
    Vector1520?: PrimitiveOverrideProps<IconProps>;
    Group?: PrimitiveOverrideProps<ViewProps>;
    Vector1522?: PrimitiveOverrideProps<IconProps>;
    Vector1523?: PrimitiveOverrideProps<IconProps>;
    home?: PrimitiveOverrideProps<TextProps>;
    "Group 5"?: PrimitiveOverrideProps<ViewProps>;
    "Rectangle 7"?: PrimitiveOverrideProps<ImageProps>;
    "Rectangle 11"?: PrimitiveOverrideProps<ImageProps>;
    "Rectangle 8"?: PrimitiveOverrideProps<ImageProps>;
    "Rectangle 9"?: PrimitiveOverrideProps<ImageProps>;
    "Rectangle 10"?: PrimitiveOverrideProps<ImageProps>;
    "Aastha Khanna application/ ML development"?: PrimitiveOverrideProps<TextProps>;
    "Ram Senthamarai Data science"?: PrimitiveOverrideProps<TextProps>;
    "mon young project management"?: PrimitiveOverrideProps<TextProps>;
    "jess matthews product/ux"?: PrimitiveOverrideProps<TextProps>;
    "Isabel chan data engineering"?: PrimitiveOverrideProps<TextProps>;
    "let\u2019s talk"?: PrimitiveOverrideProps<TextProps>;
} & EscapeHatchProps;
export declare type AboutUsProps = React.PropsWithChildren<Partial<ViewProps> & {
    overrides?: AboutUsOverridesProps | undefined | null;
}>;
export default function AboutUs(props: AboutUsProps): React.ReactElement;
