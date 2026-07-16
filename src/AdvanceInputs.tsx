import { ChangeEvent, ReactElement, useId } from "react";

import { HelperText } from "./components/HelperText";
import { Label } from "./components/Label";
import { AdvanceInputsContainerProps } from "../typings/AdvanceInputsProps";

import "./ui/AdvanceInputs.css";

export function AdvanceInputs({
    valueAttribute,
    placeholder,
    class: className,
    style,
    tabIndex,
    showLabel,
    labelText,
    required,
    requiredIndicator,
    showHelperText,
    helperText,
    reserveMessageSpace
}: AdvanceInputsContainerProps): ReactElement {
    const value = valueAttribute.value ?? "";
    const isReadOnly = valueAttribute.readOnly;
    const inputId = useId();
    const validationId = `${inputId}-validation`;
    const helperTextId = `${inputId}-helper`;
    const validationMessage = valueAttribute.validation;
    const shouldShowHelperText = showHelperText && Boolean(helperText);
    const shouldReserveMessageSpace = reserveMessageSpace && !validationMessage && !shouldShowHelperText;

    const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
        if (!isReadOnly) {
            valueAttribute.setValue(event.target.value);
        }
    };

    return (
        <div className={`advance-inputs ${className || ""}`} style={style}>
            <Label
                show={showLabel}
                text={labelText}
                required={required}
                requiredIndicator={requiredIndicator || "*"}
                htmlFor={inputId}
            />

            <input
                id={inputId}
                className="advance-inputs__input"
                type="text"
                value={value}
                placeholder={placeholder || ""}
                readOnly={isReadOnly}
                tabIndex={tabIndex}
                onChange={handleChange}
                required={required}
                aria-required={required}
                aria-invalid={validationMessage ? true : undefined}
                aria-describedby={validationMessage ? validationId : shouldShowHelperText ? helperTextId : undefined}
            />

            {validationMessage ? (
                <div id={validationId} className="advance-inputs__validation" role="alert">
                    {validationMessage}
                </div>
            ) : null}

            {!validationMessage ? (
                <HelperText show={showHelperText} text={helperText} id={helperTextId} />
            ) : null}

            {shouldReserveMessageSpace ? <div className="advance-inputs__message-spacer" aria-hidden="true" /> : null}
        </div>
    );
}