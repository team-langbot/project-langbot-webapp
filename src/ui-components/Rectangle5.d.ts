/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { EscapeHatchProps } from "@aws-amplify/ui-react/internal";
import { ViewProps } from "@aws-amplify/ui-react";
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type Rectangle5OverridesProps = {
    Rectangle5?: PrimitiveOverrideProps<ViewProps>;
} & EscapeHatchProps;
export declare type Rectangle5Props = React.PropsWithChildren<Partial<ViewProps> & {
    overrides?: Rectangle5OverridesProps | undefined | null;
}>;
export default function Rectangle5(props: Rectangle5Props): React.ReactElement;
