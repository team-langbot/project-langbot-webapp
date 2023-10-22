/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { EscapeHatchProps } from "@aws-amplify/ui-react/internal";
import { FlexProps, TextProps } from "@aws-amplify/ui-react";
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type RouterbuttonOverridesProps = {
    Routerbutton?: PrimitiveOverrideProps<FlexProps>;
    "About Us"?: PrimitiveOverrideProps<TextProps>;
} & EscapeHatchProps;
export declare type RouterbuttonProps = React.PropsWithChildren<Partial<FlexProps> & {
    overrides?: RouterbuttonOverridesProps | undefined | null;
}>;
export default function Routerbutton(props: RouterbuttonProps): React.ReactElement;
