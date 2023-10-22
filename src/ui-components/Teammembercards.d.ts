/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { EscapeHatchProps } from "@aws-amplify/ui-react/internal";
import { AasthaProps } from "./Aastha";
import { IsabelProps } from "./Isabel";
import { JessProps } from "./Jess";
import { MonProps } from "./Mon";
import { RamProps } from "./Ram";
import { FlexProps } from "@aws-amplify/ui-react";
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type TeammembercardsOverridesProps = {
    Teammembercards?: PrimitiveOverrideProps<FlexProps>;
    Aastha?: AasthaProps;
    Isabel?: IsabelProps;
    Jess?: JessProps;
    Mon?: MonProps;
    Ram?: RamProps;
} & EscapeHatchProps;
export declare type TeammembercardsProps = React.PropsWithChildren<Partial<FlexProps> & {
    overrides?: TeammembercardsOverridesProps | undefined | null;
}>;
export default function Teammembercards(props: TeammembercardsProps): React.ReactElement;
