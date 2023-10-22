/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { EscapeHatchProps } from "@aws-amplify/ui-react/internal";
import { FlexProps, ImageProps, TextProps } from "@aws-amplify/ui-react";
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type JessOverridesProps = {
    Jess?: PrimitiveOverrideProps<FlexProps>;
    "Rectangle 9"?: PrimitiveOverrideProps<ImageProps>;
    "jess matthews / product + UX"?: PrimitiveOverrideProps<TextProps>;
} & EscapeHatchProps;
export declare type JessProps = React.PropsWithChildren<Partial<FlexProps> & {
    overrides?: JessOverridesProps | undefined | null;
}>;
export default function Jess(props: JessProps): React.ReactElement;
