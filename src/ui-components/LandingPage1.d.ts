/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { EscapeHatchProps } from "@aws-amplify/ui-react/internal";
import { FlexProps, IconProps, ImageProps, TextProps, ViewProps } from "@aws-amplify/ui-react";
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type LandingPage1OverridesProps = {
    LandingPage1?: PrimitiveOverrideProps<FlexProps>;
    "About Us"?: PrimitiveOverrideProps<TextProps>;
    Frame?: PrimitiveOverrideProps<ViewProps>;
    "Clip path group"?: PrimitiveOverrideProps<ViewProps>;
    clip0_10_88?: PrimitiveOverrideProps<ViewProps>;
    Vector815?: PrimitiveOverrideProps<IconProps>;
    Group?: PrimitiveOverrideProps<ViewProps>;
    Vector817?: PrimitiveOverrideProps<IconProps>;
    Vector818?: PrimitiveOverrideProps<IconProps>;
    "Frame 1"?: PrimitiveOverrideProps<ViewProps>;
    "Rectangle 5"?: PrimitiveOverrideProps<ImageProps>;
    "Rectangle 1"?: PrimitiveOverrideProps<IconProps>;
    "Rectangle 2"?: PrimitiveOverrideProps<ViewProps>;
    "Let\u2019s talk"?: PrimitiveOverrideProps<TextProps>;
} & EscapeHatchProps;
export declare type LandingPage1Props = React.PropsWithChildren<Partial<FlexProps> & {
    overrides?: LandingPage1OverridesProps | undefined | null;
}>;
export default function LandingPage1(props: LandingPage1Props): React.ReactElement;
