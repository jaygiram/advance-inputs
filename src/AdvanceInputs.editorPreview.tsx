import { ReactElement } from "react";
import { HelloWorldSample } from "./components/HelloWorldSample";
import { AdvanceInputsPreviewProps } from "../typings/AdvanceInputsProps";

export function preview({ sampleText }: AdvanceInputsPreviewProps): ReactElement {
    return <HelloWorldSample sampleText={sampleText} />;
}

export function getPreviewCss(): string {
    return require("./ui/AdvanceInputs.css");
}
