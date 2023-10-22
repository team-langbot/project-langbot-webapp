/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { EscapeHatchProps } from "@aws-amplify/ui-react/internal";
import { FlexProps, ImageProps, TextProps } from "@aws-amplify/ui-react";
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type RamOverridesProps = {
    Ram?: PrimitiveOverrideProps<FlexProps>;
    "Rectangle 11"?: PrimitiveOverrideProps<ImageProps>;
    "RAM SENTHAMARAI / DATA SCIENCE"?: PrimitiveOverrideProps<TextProps>;
} & EscapeHatchProps;
export declare type RamProps = React.PropsWithChildren<Partial<FlexProps> & {
    overrides?: RamOverridesProps | undefined | null;
}>;
export default function Ram(props: RamProps): React.ReactElement;
