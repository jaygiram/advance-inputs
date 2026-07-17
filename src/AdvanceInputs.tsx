import { ReactElement, useId } from "react";

import { AdvanceInputsContainerProps } from "../typings/AdvanceInputsProps";
import { BuiltInIcon } from "./components/BuiltInIcon";
import { HelperText } from "./components/HelperText";
import { IconButton } from "./components/IconButton";
import { Input } from "./components/Input";
import { Label } from "./components/Label";
import { Prefix } from "./components/Prefix";
import { Suffix } from "./components/Suffix";
import { useActionHandler } from "./hooks/useActionHandler";
import { usePasswordVisibility } from "./hooks/usePasswordVisibility";

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
    suffixBehavior,
    clearAriaLabel,
    showPasswordAriaLabel,
    hidePasswordAriaLabel,
    hideClearWhenEmpty,
    suffixInteractive,
    suffixAction,
    suffixTooltip,
    suffixAriaLabel
}: AdvanceInputsContainerProps): ReactElement {
    const inputId = useId();
    const validationId = `${inputId}-validation`;
    const helperTextId = `${inputId}-helper`;

    const value = valueAttribute.value ?? "";
    const isReadOnly = valueAttribute.readOnly;
    const validationMessage = valueAttribute.validation;

    const { isPasswordVisible, togglePasswordVisibility, resetPasswordVisibility } =
        usePasswordVisibility();

    const prefixActionHandler = useActionHandler({
        action: prefixAction,
        disabled: isReadOnly
    });

    const suffixActionHandler = useActionHandler({
        action: suffixAction,
        disabled: isReadOnly
    });

    const shouldShowHelperText =
        showHelperText && Boolean(helperText?.trim());

    const shouldReserveMessageSpace =
        reserveMessageSpace &&
        !validationMessage &&
        !shouldShowHelperText;

    const resolvedMaxLength =
        enableMaxLength &&
        typeof maxLength === "number" &&
        maxLength > 0
            ? maxLength
            : undefined;

    const effectiveInputType =
        inputType === "password" &&
        suffixBehavior === "passwordToggle"
            ? isPasswordVisible
                ? "text"
                : "password"
            : inputType;

    const hasValue = value.length > 0;

    const showClearButton =
        suffixBehavior === "clear" &&
        (!hideClearWhenEmpty || hasValue);

    const showPasswordToggle =
        suffixBehavior === "passwordToggle" &&
        inputType === "password";

    const showCustomSuffix =
        suffixBehavior === "custom" &&
        showSuffix;

    const hasVisibleSuffix =
        showClearButton ||
        showPasswordToggle ||
        showCustomSuffix;

    const controlClassName = [
        "advance-inputs__control",
        showPrefix
            ? "advance-inputs__control--has-prefix"
            : undefined,
        hasVisibleSuffix
            ? "advance-inputs__control--has-suffix"
            : undefined
    ]
        .filter(Boolean)
        .join(" ");

    const widgetClassName = [
        "advance-inputs",
        className
    ]
        .filter(Boolean)
        .join(" ");

    const describedById = validationMessage
        ? validationId
        : shouldShowHelperText
          ? helperTextId
          : undefined;

    const passwordToggleLabel = isPasswordVisible
        ? hidePasswordAriaLabel || "Hide password"
        : showPasswordAriaLabel || "Show password";

    const handleInputChange = (newValue: string): void => {
        if (isReadOnly) {
            return;
        }

        valueAttribute.setValue(newValue);
    };

    const handleClear = (): void => {
        if (isReadOnly || !hasValue) {
            return;
        }

        valueAttribute.setValue("");
        resetPasswordVisibility();
    };

    return (
        <div className={widgetClassName} style={style}>
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
                    ariaLabel={
                        prefixAriaLabel ||
                        prefixTooltip ||
                        "Prefix action"
                    }
                    tooltip={prefixTooltip}
                    disabled={!prefixActionHandler.canExecute}
                    isExecuting={prefixActionHandler.isExecuting}
                    onClick={prefixActionHandler.execute}
                />

                <Input
                    id={inputId}
                    value={value}
                    placeholder={placeholder || ""}
                    inputType={effectiveInputType}
                    autocomplete={autocomplete}
                    inputMode={inputMode}
                    spellCheck={spellCheck}
                    autoFocus={autoFocus}
                    maxLength={resolvedMaxLength}
                    tabIndex={tabIndex}
                    readOnly={isReadOnly}
                    required={required}
                    ariaInvalid={Boolean(validationMessage)}
                    ariaDescribedBy={describedById}
                    onChange={handleInputChange}
                />

                {showClearButton ? (
                    <IconButton
                        position="suffix"
                        appearance={suffixAppearance}
                        contentType="icon"
                        ariaLabel={clearAriaLabel || "Clear input"}
                        tooltip={clearAriaLabel || "Clear input"}
                        disabled={isReadOnly || !hasValue}
                        isExecuting={false}
                        onClick={handleClear}
                    >
                        <BuiltInIcon
                            name="clear"
                            className="advance-inputs__built-in-icon"
                        />
                    </IconButton>
                ) : null}

                {showPasswordToggle ? (
                    <IconButton
                        position="suffix"
                        appearance={suffixAppearance}
                        contentType="icon"
                        ariaLabel={passwordToggleLabel}
                        tooltip={passwordToggleLabel}
                        disabled={isReadOnly}
                        isExecuting={false}
                        onClick={togglePasswordVisibility}
                    >
                        <BuiltInIcon
                            name={isPasswordVisible ? "eyeOff" : "eye"}
                            className="advance-inputs__built-in-icon"
                        />
                    </IconButton>
                ) : null}

                {showCustomSuffix ? (
                    <Suffix
                        show={showSuffix}
                        contentType={suffixContentType}
                        icon={suffixIcon?.value}
                        text={suffixText}
                        appearance={suffixAppearance}
                        interactive={suffixInteractive}
                        ariaLabel={
                            suffixAriaLabel ||
                            suffixTooltip ||
                            "Suffix action"
                        }
                        tooltip={suffixTooltip}
                        disabled={!suffixActionHandler.canExecute}
                        isExecuting={suffixActionHandler.isExecuting}
                        onClick={suffixActionHandler.execute}
                    />
                ) : null}
            </div>

            {validationMessage ? (
                <div
                    id={validationId}
                    className="advance-inputs__validation"
                    role="alert"
                >
                    {validationMessage}
                </div>
            ) : null}

            {!validationMessage && shouldShowHelperText ? (
                <HelperText
                    show
                    text={helperText}
                    id={helperTextId}
                />
            ) : null}

            {shouldReserveMessageSpace ? (
                <div
                    className="advance-inputs__message-spacer"
                    aria-hidden="true"
                />
            ) : null}
        </div>
    );
}