/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { EscapeHatchProps } from "@aws-amplify/ui-react/internal";
import { FlexProps, ImageProps } from "@aws-amplify/ui-react";
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type ConversationallyOverridesProps = {
    Conversationally?: PrimitiveOverrideProps<FlexProps>;
    "Olive Green Pink Modern Minimalist Company Logo 1"?: PrimitiveOverrideProps<ImageProps>;
} & EscapeHatchProps;
export declare type ConversationallyProps = React.PropsWithChildren<Partial<FlexProps> & {
    overrides?: ConversationallyOverridesProps | undefined | null;
}>;
export default function Conversationally(props: ConversationallyProps): React.ReactElement;
