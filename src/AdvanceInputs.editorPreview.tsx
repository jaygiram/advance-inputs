import { ReactElement } from "react";

import { AdvanceInputsPreviewProps } from "../typings/AdvanceInputsProps";

import "./ui/AdvanceInputs.css";

export function preview({ placeholder }: AdvanceInputsPreviewProps): ReactElement {
    return (
        <div className="advance-inputs">
            <input
                className="advance-inputs__input"
                type="text"
                placeholder={placeholder || "Enter a value"}
                disabled
            />
        </div>
    );
}

export function getPreviewCss(): string {
    return require("./ui/AdvanceInputs.css");
}