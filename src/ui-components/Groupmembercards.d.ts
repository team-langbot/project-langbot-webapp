/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { EscapeHatchProps } from "@aws-amplify/ui-react/internal";
import { FlexProps, ImageProps, TextProps } from "@aws-amplify/ui-react";
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type GroupmembercardsOverridesProps = {
    Groupmembercards?: PrimitiveOverrideProps<FlexProps>;
    "group member photos"?: PrimitiveOverrideProps<FlexProps>;
    "Rectangle 8"?: PrimitiveOverrideProps<ImageProps>;
    "Rectangle 13"?: PrimitiveOverrideProps<ImageProps>;
    "Rectangle 15"?: PrimitiveOverrideProps<ImageProps>;
    "Rectangle 14"?: PrimitiveOverrideProps<ImageProps>;
    "Rectangle 12"?: PrimitiveOverrideProps<ImageProps>;
    "group member names"?: PrimitiveOverrideProps<FlexProps>;
    "Aastha Khanna / application development"?: PrimitiveOverrideProps<TextProps>;
    "isabel chan / data engineering"?: PrimitiveOverrideProps<TextProps>;
    "jess matthews / product + UX"?: PrimitiveOverrideProps<TextProps>;
    "mon young / product management"?: PrimitiveOverrideProps<TextProps>;
    "ram senthamarai / data science"?: PrimitiveOverrideProps<TextProps>;
} & EscapeHatchProps;
export declare type GroupmembercardsProps = React.PropsWithChildren<Partial<FlexProps> & {
    overrides?: GroupmembercardsOverridesProps | undefined | null;
}>;
export default function Groupmembercards(props: GroupmembercardsProps): React.ReactElement;
