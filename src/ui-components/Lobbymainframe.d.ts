/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { EscapeHatchProps } from "@aws-amplify/ui-react/internal";
import { LessonbuttonsProps } from "./Lessonbuttons";
import { ConversationallyphotoProps } from "./Conversationallyphoto";
import { FlexProps } from "@aws-amplify/ui-react";
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type LobbymainframeOverridesProps = {
    Lobbymainframe?: PrimitiveOverrideProps<FlexProps>;
    "lesson buttons"?: LessonbuttonsProps;
    "conversationally photo"?: ConversationallyphotoProps;
} & EscapeHatchProps;
export declare type LobbymainframeProps = React.PropsWithChildren<Partial<FlexProps> & {
    overrides?: LobbymainframeOverridesProps | undefined | null;
}>;
export default function Lobbymainframe(props: LobbymainframeProps): React.ReactElement;
