import { ReactElement } from "react";

import { HelperText } from "./components/HelperText";
import { Label } from "./components/Label";
import { AdvanceInputsPreviewProps } from "../typings/AdvanceInputsProps";

import "./ui/AdvanceInputs.css";

export function preview({
    placeholder,
    showLabel,
    labelText,
    required,
    requiredIndicator,
    showHelperText,
    helperText,
    reserveMessageSpace
}: AdvanceInputsPreviewProps): ReactElement {
    const previewInputId = "advance-inputs-preview";
    const shouldShowHelperText = showHelperText && Boolean(helperText);

    return (
        <div className="advance-inputs">
            <Label
                show={showLabel}
                text={labelText}
                required={required}
                requiredIndicator={requiredIndicator || "*"}
                htmlFor={previewInputId}
            />

            <input
                id={previewInputId}
                className="advance-inputs__input"
                type="text"
                placeholder={placeholder || "Enter a value"}
                disabled
            />

            {!shouldShowHelperText ? (
                reserveMessageSpace ? <div className="advance-inputs__message-spacer" aria-hidden="true" /> : null
            ) : (
                <HelperText show={showHelperText} text={helperText} id={`${previewInputId}-helper`} />
            )}
        </div>
    );
}

export function getPreviewCss(): string {
    return require("./ui/AdvanceInputs.css");
}