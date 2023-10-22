/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { EscapeHatchProps } from "@aws-amplify/ui-react/internal";
import { ConversationallyheaderProps } from "./Conversationallyheader";
import { TeammembersProps } from "./Teammembers";
import { LetstalkandhomerouterProps } from "./Letstalkandhomerouter";
import { FlexProps } from "@aws-amplify/ui-react";
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type AboutUs2OverridesProps = {
    AboutUs2?: PrimitiveOverrideProps<FlexProps>;
    "conversationally header"?: ConversationallyheaderProps;
    "team members"?: TeammembersProps;
    "let's talk and home router"?: LetstalkandhomerouterProps;
} & EscapeHatchProps;
export declare type AboutUs2Props = React.PropsWithChildren<Partial<FlexProps> & {
    overrides?: AboutUs2OverridesProps | undefined | null;
}>;
export default function AboutUs2(props: AboutUs2Props): React.ReactElement;
