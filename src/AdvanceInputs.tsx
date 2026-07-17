import { ChangeEvent, ReactElement, useId } from "react";

import { HelperText } from "./components/HelperText";
import { Label } from "./components/Label";
import { Prefix } from "./components/Prefix";
import { Suffix } from "./components/Suffix";
import { useActionHandler } from "./hooks/useActionHandler";
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
    reserveMessageSpace,
    showPrefix,
    prefixContentType,
    prefixIcon,
    prefixText,
    prefixAppearance,
    prefixInteractive,
    prefixAction,
    prefixTooltip,
    prefixAriaLabel,
    showSuffix,
    suffixContentType,
    suffixIcon,
    suffixText,
    suffixAppearance,
    suffixInteractive,
    suffixAction,
    suffixTooltip,
    suffixAriaLabel
}: AdvanceInputsContainerProps): ReactElement {
    const value = valueAttribute.value ?? "";
    const isReadOnly = valueAttribute.readOnly;
    const inputId = useId();
    const validationId = `${inputId}-validation`;
    const helperTextId = `${inputId}-helper`;
    const validationMessage = valueAttribute.validation;
    const shouldShowHelperText = showHelperText && Boolean(helperText);
    const shouldReserveMessageSpace = reserveMessageSpace && !validationMessage && !shouldShowHelperText;
    const prefixActionHandler = useActionHandler({ action: prefixAction, disabled: isReadOnly });
    const suffixActionHandler = useActionHandler({ action: suffixAction, disabled: isReadOnly });
    const controlClassName = [
        "advance-inputs__control",
        showPrefix ? "advance-inputs__control--has-prefix" : null,
        showSuffix ? "advance-inputs__control--has-suffix" : null
    ].filter(Boolean).join(" ");

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

            <div className={controlClassName}>
                <Prefix
                    show={showPrefix}
                    contentType={prefixContentType}
                    icon={prefixIcon?.value}
                    text={prefixText}
                    appearance={prefixAppearance}
                    interactive={prefixInteractive}
                    ariaLabel={prefixAriaLabel || prefixTooltip || "Prefix action"}
                    tooltip={prefixTooltip}
                    disabled={!prefixActionHandler.canExecute}
                    isExecuting={prefixActionHandler.isExecuting}
                    onClick={prefixActionHandler.execute}
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

                <Suffix
                    show={showSuffix}
                    contentType={suffixContentType}
                    icon={suffixIcon?.value}
                    text={suffixText}
                    appearance={suffixAppearance}
                    interactive={suffixInteractive}
                    ariaLabel={suffixAriaLabel || suffixTooltip || "Suffix action"}
                    tooltip={suffixTooltip}
                    disabled={!suffixActionHandler.canExecute}
                    isExecuting={suffixActionHandler.isExecuting}
                    onClick={suffixActionHandler.execute}
                />
            </div>

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