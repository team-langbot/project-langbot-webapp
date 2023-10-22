/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { EscapeHatchProps } from "@aws-amplify/ui-react/internal";
import { FlexProps, TextProps } from "@aws-amplify/ui-react";
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type LessontwobuttonOverridesProps = {
    Lessontwobutton?: PrimitiveOverrideProps<FlexProps>;
    "lesson two: let\u2019s have coffee"?: PrimitiveOverrideProps<TextProps>;
} & EscapeHatchProps;
export declare type LessontwobuttonProps = React.PropsWithChildren<Partial<FlexProps> & {
    overrides?: LessontwobuttonOverridesProps | undefined | null;
}>;
export default function Lessontwobutton(props: LessontwobuttonProps): React.ReactElement;
