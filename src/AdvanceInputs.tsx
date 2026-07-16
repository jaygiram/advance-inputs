import { ReactElement } from "react";
import { HelloWorldSample } from "./components/HelloWorldSample";

import { AdvanceInputsContainerProps } from "../typings/AdvanceInputsProps";

import "./ui/AdvanceInputs.css";

export function AdvanceInputs({ sampleText }: AdvanceInputsContainerProps): ReactElement {
    return <HelloWorldSample sampleText={sampleText ? sampleText : "World"} />;
}
