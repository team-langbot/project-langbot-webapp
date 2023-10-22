/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { EscapeHatchProps } from "@aws-amplify/ui-react/internal";
import { FlexProps, ImageProps } from "@aws-amplify/ui-react";
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type NicetomeetyouheaderOverridesProps = {
    Nicetomeetyouheader?: PrimitiveOverrideProps<FlexProps>;
    "nice_to_meet_you_header 1"?: PrimitiveOverrideProps<ImageProps>;
} & EscapeHatchProps;
export declare type NicetomeetyouheaderProps = React.PropsWithChildren<Partial<FlexProps> & {
    overrides?: NicetomeetyouheaderOverridesProps | undefined | null;
}>;
export default function Nicetomeetyouheader(props: NicetomeetyouheaderProps): React.ReactElement;
