/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { EscapeHatchProps } from "@aws-amplify/ui-react/internal";
import { FlexProps, ImageProps } from "@aws-amplify/ui-react";
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type ConversationallyphotoOverridesProps = {
    Conversationallyphoto?: PrimitiveOverrideProps<FlexProps>;
    "conversationally_photo 1"?: PrimitiveOverrideProps<ImageProps>;
} & EscapeHatchProps;
export declare type ConversationallyphotoProps = React.PropsWithChildren<Partial<FlexProps> & {
    overrides?: ConversationallyphotoOverridesProps | undefined | null;
}>;
export default function Conversationallyphoto(props: ConversationallyphotoProps): React.ReactElement;
