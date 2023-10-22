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
export declare type TeammembersOverridesProps = {
    Teammembers?: PrimitiveOverrideProps<FlexProps>;
    Aastha?: AasthaProps;
    Isabel?: IsabelProps;
    Jess?: JessProps;
    Mon?: MonProps;
    Ram?: RamProps;
} & EscapeHatchProps;
export declare type TeammembersProps = React.PropsWithChildren<Partial<FlexProps> & {
    overrides?: TeammembersOverridesProps | undefined | null;
}>;
export default function Teammembers(props: TeammembersProps): React.ReactElement;
