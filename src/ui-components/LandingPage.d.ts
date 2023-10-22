/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { EscapeHatchProps } from "@aws-amplify/ui-react/internal";
import { RouterbuttonProps } from "./Routerbutton";
import { ConversationallyProps } from "./Conversationally";
import { ApplicationbuttonProps } from "./Applicationbutton";
import { TriangleProps } from "./Triangle";
import { FlexProps } from "@aws-amplify/ui-react";
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type LandingPageOverridesProps = {
    LandingPage?: PrimitiveOverrideProps<FlexProps>;
    "router button"?: RouterbuttonProps;
    conversationally?: ConversationallyProps;
    "application button"?: ApplicationbuttonProps;
    triangle?: TriangleProps;
} & EscapeHatchProps;
export declare type LandingPageProps = React.PropsWithChildren<Partial<FlexProps> & {
    overrides?: LandingPageOverridesProps | undefined | null;
}>;
export default function LandingPage(props: LandingPageProps): React.ReactElement;
