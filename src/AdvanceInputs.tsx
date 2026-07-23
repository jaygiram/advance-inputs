import { ReactElement, useEffect, useId, useState } from "react";

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
customPattern,
validationMessage,
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
suffixInteraction,
suffixAction,
suffixTooltip,
suffixAriaLabel,
inputTooltip
}: AdvanceInputsContainerProps): ReactElement {
    const inputId = useId();
    const validationId = `${inputId}-validation`;
    const helperTextId = `${inputId}-helper`;

    const [hasCopiedText, setHasCopiedText] = useState(false);
    const mendixValue = valueAttribute.value ?? "";

    const [value, setValue] = useState(mendixValue);

    const isReadOnly = valueAttribute.readOnly;
    const mendixValidationMessage = valueAttribute.validation;

    useEffect(() => {
    setValue(mendixValue);
}, [mendixValue]);

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
    if (required && inputValue.trim().length === 0) {
        return "This field is required.";
    }

    if (
        resolvedMaxLength !== undefined &&
        inputValue.length > resolvedMaxLength
    ) {
        return "The maximum character limit has been exceeded.";
    }

    if (
        validationType === "numeric" &&
        inputValue.length > 0 &&
        !/^\d+$/.test(inputValue)
    ) {
        return "Please enter numbers only.";
    }

    if (
        validationType === "decimal" &&
        inputValue.length > 0 &&
        !/^\d+(\.\d+)?$/.test(inputValue)
    ) {
        return "Please enter a valid decimal number.";
    }

    if (
        validationType === "custom" &&
        inputValue.length > 0
    ) {
        const normalizedPattern = customPattern?.trim();

        if (!normalizedPattern) {
            return undefined;
        }

        try {
            const customValidationExpression =
                new RegExp(normalizedPattern);

            if (!customValidationExpression.test(inputValue)) {
                return (
                    validationMessage?.trim() ||
                    "The entered value does not match the required format."
                );
            }
        } catch (error) {
            console.error(
                "Advance Inputs: Invalid custom validation pattern.",
                error
            );

            return "The configured custom validation pattern is invalid.";
        }
    }

    return undefined;
};

    const widgetValidationMessage =
        getWidgetValidationMessage(value);

    /*
     * Mendix validation always has the highest priority.
     */
    const validationMessageToDisplay =
        mendixValidationMessage?.trim() ||
        widgetValidationMessage;

    const hasValidationMessage = Boolean(validationMessageToDisplay?.trim());
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
    suffixInteraction === "passwordToggle"
        ? isPasswordVisible
            ? "text"
            : "password"
        : inputType;


const showClearButton =
    suffixInteraction === "clear" &&
    hasValue;

const showPasswordToggle =
    suffixInteraction === "passwordToggle";

    const showCopyButton =
    suffixInteraction === "copyText";

const showCustomSuffix =
    showSuffix &&
    (
        suffixInteraction === "none" ||
        suffixInteraction === "action"
    );

const isCustomSuffixInteractive =
    suffixInteraction === "action";


        const hasVisibleSuffix =
    showClearButton ||
    showPasswordToggle ||
    showCopyButton ||
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

const handleCopyText = async (): Promise<void> => {
    if (!hasValue) {
        return;
    }

    try {
        if (navigator.clipboard && window.isSecureContext) {
            await navigator.clipboard.writeText(value);
        } else {
            const temporaryTextArea = document.createElement("textarea");

            temporaryTextArea.value = value;
            temporaryTextArea.style.position = "fixed";
            temporaryTextArea.style.opacity = "0";
            temporaryTextArea.style.pointerEvents = "none";

            document.body.appendChild(temporaryTextArea);
            temporaryTextArea.focus();
            temporaryTextArea.select();

            document.execCommand("copy");
            document.body.removeChild(temporaryTextArea);
        }

        setHasCopiedText(true);

        window.setTimeout(() => {
            setHasCopiedText(false);
        }, 1500);
    } catch (error) {
        console.error("Advance Inputs: Unable to copy text.", error);
        setHasCopiedText(false);
    }
};

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

const passwordToggleLabel =
    isPasswordVisible
        ? "Hide password"
        : "Show password";

    const handleInputChange = (newValue: string): void => {
    if (isReadOnly) {
        return;
    }

    setValue(newValue);
    valueAttribute.setValue(newValue);

};

    const handleClear = (): void => {
    if (isReadOnly || !hasValue) {
        return;
    }

    setValue("");
    valueAttribute.setValue("");

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
                    title={inputTooltip}
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
                />

                {showClearButton ? (
                    <IconButton
                        position="suffix"
                        contentType="icon"
                  ariaLabel="Clear input"
tooltip="Clear input"
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

{showCopyButton ? (
    <IconButton
        position="suffix"
        contentType="icon"
        ariaLabel={hasCopiedText ? "Text copied" : "Copy text"}
        tooltip={hasCopiedText ? "Copied" : "Copy text"}
        disabled={!hasValue}
        isExecuting={false}
        onClick={() => {
            void handleCopyText();
        }}
    >
        {hasCopiedText ? (
            <svg
                className="advance-inputs__built-in-icon"
                viewBox="0 0 24 24"
                width="18"
                height="18"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
            >
                <path d="M20 6 9 17l-5-5" />
            </svg>
        ) : (
            <svg
                className="advance-inputs__built-in-icon"
                viewBox="0 0 24 24"
                width="18"
                height="18"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
            >
                <rect x="9" y="9" width="11" height="11" rx="2" />
                <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
            </svg>
        )}
    </IconButton>
) : null}

              {showCustomSuffix ? (
    <Suffix
        show={showSuffix}
        contentType={suffixContentType}
        icon={suffixIcon?.value}
        text={suffixText}
        showAsButton={suffixShowAsButton}
        buttonBackgroundColor={suffixButtonBackgroundColor}
        buttonIconColor={suffixButtonIconColor}
        interactive={isCustomSuffixInteractive}
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
                            {validationMessageToDisplay}
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
