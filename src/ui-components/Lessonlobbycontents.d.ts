/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { EscapeHatchProps } from "@aws-amplify/ui-react/internal";
import { RouterbuttonProps } from "./Routerbutton";
import { ConversationallyheaderProps } from "./Conversationallyheader";
import { LobbymainframeProps } from "./Lobbymainframe";
import { TriangleProps } from "./Triangle";
import { FlexProps } from "@aws-amplify/ui-react";
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type LessonlobbycontentsOverridesProps = {
    Lessonlobbycontents?: PrimitiveOverrideProps<FlexProps>;
    "router button"?: RouterbuttonProps;
    "conversationally header"?: ConversationallyheaderProps;
    "lobby main frame"?: LobbymainframeProps;
    triangle?: TriangleProps;
} & EscapeHatchProps;
export declare type LessonlobbycontentsProps = React.PropsWithChildren<Partial<FlexProps> & {
    overrides?: LessonlobbycontentsOverridesProps | undefined | null;
}>;
export default function Lessonlobbycontents(props: LessonlobbycontentsProps): React.ReactElement;
