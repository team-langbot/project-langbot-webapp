/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { EscapeHatchProps } from "@aws-amplify/ui-react/internal";
import { LetstalkandhomerouterProps } from "./Letstalkandhomerouter";
import { ConversationallyheaderProps } from "./Conversationallyheader";
import { TeammembersProps } from "./Teammembers";
import { FlexProps } from "@aws-amplify/ui-react";
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type AboutUsOverridesProps = {
    AboutUs?: PrimitiveOverrideProps<FlexProps>;
    "let's talk and home router"?: LetstalkandhomerouterProps;
    "conversationally header"?: ConversationallyheaderProps;
    "team members"?: TeammembersProps;
} & EscapeHatchProps;
export declare type AboutUsProps = React.PropsWithChildren<Partial<FlexProps> & {
    overrides?: AboutUsOverridesProps | undefined | null;
}>;
export default function AboutUs(props: AboutUsProps): React.ReactElement;
