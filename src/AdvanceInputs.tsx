import { ChangeEvent, ReactElement, useId } from "react";

import { HelperText } from "./components/HelperText";
import { Input } from "./components/Input";
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
    inputType,
    autocomplete,
    inputMode,
    enableMaxLength,
    maxLength,
    spellCheck,
    autoFocus,
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

                <Input
                    id={inputId}
                    value={value}
                    placeholder={placeholder || ""}
                    inputType={inputType}
                    autocomplete={autocomplete}
                    inputMode={inputMode}
                    spellCheck={spellCheck}
                    autoFocus={autoFocus}
                    maxLength={enableMaxLength ? maxLength : undefined}
                    readOnly={isReadOnly}
                    required={required}
                    ariaInvalid={Boolean(validationMessage)}
                    ariaDescribedBy={validationMessage ? validationId : shouldShowHelperText ? helperTextId : undefined}
                    onChange={(newValue: string) => {
                        if (!isReadOnly) {
                            valueAttribute.setValue(newValue);
                        }
                    }}
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