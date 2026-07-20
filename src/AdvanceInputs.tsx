import { ReactElement, useId, useState } from "react";

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
    validationType,
    numericValidationMessage,
    decimalValidationMessage,
    maxLengthValidationMessage,
    enableMaxLength,
    maxLength,
    showCharacterCounter,
    spellCheck,
    autoFocus,

    showPrefix,
    prefixContentType,
    prefixIcon,
    prefixText,
    prefixShowAsButton,
    prefixButtonBackgroundColor,
    prefixButtonIconColor,
    prefixInteractive,
    prefixAction,
    prefixTooltip,
    prefixAriaLabel,

    showSuffix,
    suffixContentType,
    suffixIcon,
    suffixText,
    suffixShowAsButton,
    suffixButtonBackgroundColor,
    suffixButtonIconColor,
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

    const [hasValidationStarted, setHasValidationStarted] =
        useState(false);

    const value = valueAttribute.value ?? "";
    const isReadOnly = valueAttribute.readOnly;
    const mendixValidationMessage = valueAttribute.validation;

    const resolvedMaxLength =
        enableMaxLength &&
            typeof maxLength === "number" &&
            maxLength > 0
            ? maxLength
            : undefined;

    const shouldShowCharacterCounter =
        showCharacterCounter &&
        resolvedMaxLength !== undefined;

    const characterCount = value.length;

    const characterCounterClassName = [
        "advance-inputs__character-counter",
        resolvedMaxLength !== undefined &&
            characterCount > resolvedMaxLength
            ? "advance-inputs__character-counter--exceeded"
            : undefined
    ]
        .filter(Boolean)
        .join(" ");

    const getWidgetValidationMessage = (
        inputValue: string
    ): string | undefined => {
        if (
            resolvedMaxLength !== undefined &&
            inputValue.length > resolvedMaxLength
        ) {
            return (
                maxLengthValidationMessage?.trim() ||
                `Maximum ${resolvedMaxLength} characters are allowed.`
            );
        }

        if (
            validationType === "numeric" &&
            inputValue.length > 0 &&
            !/^\d+$/.test(inputValue)
        ) {
            return (
                numericValidationMessage?.trim() ||
                "Please enter numbers only."
            );
        }

        if (
            validationType === "decimal" &&
            inputValue.length > 0 &&
            !/^\d+(\.\d+)?$/.test(inputValue)
        ) {
            return (
                decimalValidationMessage?.trim() ||
                "Please enter a valid decimal number."
            );
        }

        return undefined;
    };
    const currentWidgetValidationMessage =
        getWidgetValidationMessage(value);

    const widgetValidationMessage =
        hasValidationStarted
            ? currentWidgetValidationMessage
            : undefined;
    /*
     * Mendix validation always has the highest priority.
     * Widget validation is displayed only when Mendix has no validation message.
     */
    const validationMessage =
        mendixValidationMessage?.trim() ||
        widgetValidationMessage;

    const hasValidationMessage = Boolean(validationMessage?.trim());
    const hasValue = value.length > 0;

    const {
        isPasswordVisible,
        togglePasswordVisibility,
        resetPasswordVisibility
    } = usePasswordVisibility();

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
        !hasValidationMessage &&
        !shouldShowHelperText;


    const effectiveInputType =
        inputType === "password" &&
            suffixBehavior === "passwordToggle"
            ? isPasswordVisible
                ? "text"
                : "password"
            : inputType;

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
        isReadOnly ? "advance-inputs--readonly" : undefined,
        hasValidationMessage ? "advance-inputs--invalid" : undefined,
        hasValue ? "advance-inputs--has-value" : undefined,
        className
    ]
        .filter(Boolean)
        .join(" ");

    const describedByIds = [
        hasValidationMessage ? validationId : undefined,
        !hasValidationMessage && shouldShowHelperText
            ? helperTextId
            : undefined
    ].filter(Boolean);

    const describedById =
        describedByIds.length > 0
            ? describedByIds.join(" ")
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

    const handleInputBlur = (): void => {
        if (isReadOnly) {
            return;
        }

        setHasValidationStarted(true);
    };

    const handleClear = (): void => {
        if (isReadOnly || !hasValue) {
            return;
        }

        valueAttribute.setValue("");
        setHasValidationStarted(false);
        resetPasswordVisibility();
    };
    return (
        <div
            className={widgetClassName}
            style={style}
        >
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
                    showAsButton={prefixShowAsButton}
                    buttonBackgroundColor={prefixButtonBackgroundColor}
                    buttonIconColor={prefixButtonIconColor}
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
                    maxLength={undefined}
                    tabIndex={tabIndex}
                    readOnly={isReadOnly}
                    required={required}
                    ariaInvalid={hasValidationMessage}
                    ariaDescribedBy={describedById}
                    onChange={handleInputChange}
                    onBlur={handleInputBlur}
                />

                {showClearButton ? (
                    <IconButton
                        position="suffix"
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
                        showAsButton={suffixShowAsButton}
                        buttonBackgroundColor={
                            suffixButtonBackgroundColor
                        }
                        buttonIconColor={suffixButtonIconColor}
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
            <div className="advance-inputs__footer">

                <div className="advance-inputs__footer-left">
                    {hasValidationMessage ? (
                        <div
                            id={validationId}
                            className="advance-inputs__validation"
                            role="alert"
                        >
                            {validationMessage}
                        </div>
                    ) : !hasValidationMessage && shouldShowHelperText ? (
                        <HelperText
                            show
                            text={helperText}
                            id={helperTextId}
                        />
                    ) : shouldReserveMessageSpace ? (
                        <div
                            className="advance-inputs__message-spacer"
                            aria-hidden="true"
                        />
                    ) : null}
                </div>

                {shouldShowCharacterCounter ? (
                    <div
                        className={characterCounterClassName}
                        aria-live="polite"
                    >
                        {characterCount} / {resolvedMaxLength}
                    </div>
                ) : null}

            </div>
        </div>
    );
}

