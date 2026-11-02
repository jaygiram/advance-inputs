import { KeyboardEvent, ReactElement, useId, useRef, useState } from "react";
import { ValueStatus } from "mendix";

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
    inputAriaLabel,
    required,
    requiredIndicator,
    requiredValidationMessage,

    showHelperText,
    helperText,
    reserveMessageSpace,

    inputType,
    showAsPassword,
    dynamicInputTooltip,
    autocomplete,
    inputMode,
    validationType,
    numericValidationMessage,
    decimalValidationMessage,
    alphabetValidationMessage,
    customValidationExpression,
    customValidationMessage,
    maxLengthValidationMessage,
    enableMaxLength,
    maxLength,
    showCharacterCounter,
    spellCheck,
    autoFocus,

    onChangeAction,
    onEnterAction,
    onLeaveAction,
    onEnterKeyPressAction,
    applyChangesBehavior,
    editable,
    editableCondition,
    readOnlyStyle,
    visible,
    visibleCondition,

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
}: AdvanceInputsContainerProps): ReactElement | null {
    const inputId = useId();
    const validationId = `${inputId}-validation`;
    const helperTextId = `${inputId}-helper`;

    const [hasValidationStarted, setHasValidationStarted] =
        useState(false);
    const [hasCopiedText, setHasCopiedText] = useState(false);
    const hasChangedSinceFocus = useRef(false);
    const value = valueAttribute.value ?? "";
    const isConditionalEditabilityAvailable =
        editableCondition?.status === ValueStatus.Available &&
        editableCondition.value === true;
    const isReadOnly =
        valueAttribute.readOnly ||
        editable === "never" ||
        (editable === "conditional" &&
            !isConditionalEditabilityAvailable);
    const isVisible =
        visible === "default" ||
        (visibleCondition?.status === ValueStatus.Available &&
            visibleCondition.value === true);
    const dynamicTooltip =
        dynamicInputTooltip?.status === ValueStatus.Available &&
        typeof dynamicInputTooltip.value === "string"
            ? dynamicInputTooltip.value.trim()
            : "";
    const inputTitle = dynamicTooltip || inputTooltip?.trim() || undefined;
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
        if (required && inputValue.trim().length === 0) {
            return (
                requiredValidationMessage?.trim() ||
                "This field is required."
            );
        }

        if (
            validationType === "custom" &&
            customValidationExpression?.status === ValueStatus.Available &&
            customValidationExpression.value === false
        ) {
            return (
                customValidationMessage?.trim() ||
                "Please enter a valid value."
            );
        }

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

        if (
            validationType === "alphabet" &&
            inputValue.length > 0 &&
            !/^[\p{L} ]+$/u.test(inputValue)
        ) {
            return (
                alphabetValidationMessage?.trim() ||
                "Please enter letters only."
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
    const validationMessage =
        mendixValidationMessage?.trim() || widgetValidationMessage;

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

    const onChangeActionHandler = useActionHandler({
        action: onChangeAction,
        disabled: isReadOnly
    });

    const onEnterActionHandler = useActionHandler({
        action: onEnterAction,
        disabled: isReadOnly
    });

    const onLeaveActionHandler = useActionHandler({
        action: onLeaveAction,
        disabled: isReadOnly
    });

    const onEnterKeyPressActionHandler = useActionHandler({
        action: onEnterKeyPressAction,
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
            : showAsPassword
              ? "password"
              : inputType;

    const isTextReadOnly = isReadOnly && readOnlyStyle === "text";


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
    const hasVisibleLabel = showLabel && Boolean(labelText?.trim());
    const resolvedInputAriaLabel = hasVisibleLabel
        ? undefined
        : inputAriaLabel?.trim() || labelText?.trim() || undefined;

    const handleInputChange = (newValue: string): void => {
        if (isReadOnly) {
            return;
        }

        valueAttribute.setValue(newValue);
        hasChangedSinceFocus.current = true;

        if (applyChangesBehavior === "whileTyping") {
            onChangeActionHandler.execute();
        }
    };

    const handleInputFocus = (): void => {
        hasChangedSinceFocus.current = false;
        onEnterActionHandler.execute();
    };

    const handleInputBlur = (): void => {
        if (isReadOnly) {
            return;
        }

        setHasValidationStarted(true);
        onLeaveActionHandler.execute();

        if (
            hasChangedSinceFocus.current &&
            applyChangesBehavior === "onLeave"
        ) {
            onChangeActionHandler.execute();
        }

        hasChangedSinceFocus.current = false;
    };

    const handleClear = (): void => {
        if (isReadOnly || !hasValue) {
            return;
        }

        valueAttribute.setValue("");
        hasChangedSinceFocus.current = true;

        if (applyChangesBehavior === "whileTyping") {
            onChangeActionHandler.execute();
        }

        setHasValidationStarted(true);
        resetPasswordVisibility();
    };

    const handleInputKeyDown = (
        event: KeyboardEvent<HTMLInputElement>
    ): void => {
        if (event.key !== "Enter" || event.nativeEvent.isComposing) {
            return;
        }

        event.preventDefault();

        if (event.repeat) {
            return;
        }

        onEnterKeyPressActionHandler.execute();

        const hasCustomSuffixContent =
            suffixContentType === "icon"
                ? Boolean(suffixIcon?.value)
                : Boolean(suffixText.trim());

        if (
            showCustomSuffix &&
            isCustomSuffixInteractive &&
            hasCustomSuffixContent &&
            suffixActionHandler.canExecute
        ) {
            suffixActionHandler.execute();
            return;
        }

        if (showClearButton && !isReadOnly && hasValue) {
            handleClear();
            return;
        }

        if (showPasswordToggle && !isReadOnly) {
            togglePasswordVisibility();
            return;
        }

        if (showCopyButton && hasValue) {
            void handleCopyText();
            return;
        }

        const nextFocusableElement = getNextTabbableElement(
            event.currentTarget
        );

        if (nextFocusableElement) {
            nextFocusableElement.focus();
        } else {
            event.currentTarget.blur();
        }
    };

    if (!isVisible) {
        return null;
    }

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

            {isTextReadOnly ? (
                <div
                    className="advance-inputs__readonly-text"
                    role="textbox"
                    aria-readonly="true"
                    aria-invalid={hasValidationMessage || undefined}
                    aria-describedby={describedById}
                    aria-label={resolvedInputAriaLabel}
                >
                    {value}
                </div>
            ) : (
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
                    title={inputTitle}
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
                    ariaLabel={resolvedInputAriaLabel}
                    onChange={handleInputChange}
                    onFocus={handleInputFocus}
                    onBlur={handleInputBlur}
                    onKeyDown={handleInputKeyDown}
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
            )}
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

function getNextTabbableElement(
    current: HTMLElement
): HTMLElement | undefined {
    const elements = Array.from(
        document.querySelectorAll<HTMLElement>(
            "a[href], area[href], button, input:not([type='hidden']), select, textarea, iframe, object, embed, audio[controls], video[controls], summary, [contenteditable], [tabindex]"
        )
    ).filter(element => {
        if (element !== current && element.tabIndex < 0) {
            return false;
        }

        if (
            element.matches(":disabled") ||
            element.closest("[inert], [aria-hidden='true']")
        ) {
            return false;
        }

        for (
            let ancestor: HTMLElement | null = element;
            ancestor;
            ancestor = ancestor.parentElement
        ) {
            const style = window.getComputedStyle(ancestor);
            if (
                ancestor.hidden ||
                ancestor.inert ||
                style.display === "none" ||
                style.visibility === "hidden" ||
                style.visibility === "collapse"
            ) {
                return false;
            }
        }

        return element === current || element.getClientRects().length > 0;
    });

    elements.sort((left, right) => {
        const leftTabIndex = left.tabIndex > 0 ? left.tabIndex : 0;
        const rightTabIndex = right.tabIndex > 0 ? right.tabIndex : 0;

        if (leftTabIndex !== rightTabIndex) {
            return leftTabIndex - rightTabIndex;
        }

        if (
            left.compareDocumentPosition(right) &
            Node.DOCUMENT_POSITION_FOLLOWING
        ) {
            return -1;
        }

        return 1;
    });

    const currentIndex = elements.indexOf(current);
    return currentIndex >= 0 ? elements[currentIndex + 1] : undefined;
}
