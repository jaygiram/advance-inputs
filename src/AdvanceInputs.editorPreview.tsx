import { ReactElement } from "react";
import type { WebIcon } from "mendix";

import { AdvanceInputsPreviewProps } from "../typings/AdvanceInputsProps";
import { BuiltInIcon } from "./components/BuiltInIcon";
import { HelperText } from "./components/HelperText";
import { IconButton } from "./components/IconButton";
import { Input } from "./components/Input";
import { Label } from "./components/Label";
import { Prefix } from "./components/Prefix";
import { Suffix } from "./components/Suffix";

import "./ui/AdvanceInputs.css";

function resolvePreviewIcon(icon: unknown): WebIcon | undefined {
    if (!icon) {
        return undefined;
    }

    if (typeof icon === "object" && "value" in icon) {
        return icon.value as WebIcon | undefined;
    }

    return icon as WebIcon;
}

function resolveAutocomplete(
    value: AdvanceInputsPreviewProps["autocomplete"]
):
    | "off"
    | "on"
    | "name"
    | "given-name"
    | "family-name"
    | "email"
    | "username"
    | "current-password"
    | "new-password"
    | "tel"
    | "organization" {
    switch (value) {
        case "givenName":
            return "given-name";

        case "familyName":
            return "family-name";

        case "currentPassword":
            return "current-password";

        case "newPassword":
            return "new-password";

        default:
            return value;
    }
}

export function preview({
    placeholder,
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
    autoFocus: _autoFocus,

    showPrefix,
    prefixContentType,
    prefixIcon,
    prefixText,
    prefixShowAsButton,
    prefixButtonBackgroundColor,
    prefixButtonIconColor,
    prefixInteractive,
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
    suffixTooltip,
    suffixAriaLabel
}: AdvanceInputsPreviewProps): ReactElement {
    const previewInputId = "advance-inputs-preview";
    const helperTextId = `${previewInputId}-helper`;

    const shouldShowHelperText =
        showHelperText && Boolean(helperText?.trim());

    const resolvedPrefixIcon = resolvePreviewIcon(prefixIcon);
    const resolvedSuffixIcon = resolvePreviewIcon(suffixIcon);

    const resolvedMaxLength =
        enableMaxLength &&
        typeof maxLength === "number" &&
        maxLength > 0
            ? maxLength
            : undefined;

    /*
     * Preview value is always empty.
     * Therefore the built-in clear button stays hidden automatically.
     */
    const showClearButton = false;

    const showPasswordToggle =
        suffixInteraction === "passwordToggle" &&
        inputType === "password";

    const showCustomSuffix =
        (suffixInteraction === "none" ||
            suffixInteraction === "action") &&
        showSuffix;

    const isCustomSuffixInteractive =
        suffixInteraction === "action";

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

    const passwordToggleLabel = "Show password";

    const describedById =
        shouldShowHelperText
            ? helperTextId
            : undefined;

    return (
        <div className="advance-inputs">
            <Label
                show={showLabel}
                text={labelText}
                required={required}
                requiredIndicator={requiredIndicator || "*"}
                htmlFor={previewInputId}
            />

            <div className={controlClassName}>
                <Prefix
                    show={showPrefix}
                    contentType={prefixContentType}
                    icon={resolvedPrefixIcon}
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
                    disabled={false}
                    isExecuting={false}
                    onClick={() => undefined}
                />

                <Input
                    id={previewInputId}
                    value=""
                    placeholder={placeholder || "Enter a value"}
                    inputType={inputType}
                    autocomplete={resolveAutocomplete(autocomplete)}
                    inputMode={inputMode}
                    spellCheck={spellCheck}
                    autoFocus={false}
                    maxLength={resolvedMaxLength}
                    disabled
                    required={required}
                    ariaDescribedBy={describedById}
                    onChange={() => undefined}
                />

                {showClearButton ? (
                    <IconButton
                        position="suffix"
                        contentType="icon"
                        ariaLabel="Clear input"
                        tooltip="Clear input"
                        disabled={false}
                        isExecuting={false}
                        onClick={() => undefined}
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
                        disabled={false}
                        isExecuting={false}
                        onClick={() => undefined}
                    >
                        <BuiltInIcon
                            name="eye"
                            className="advance-inputs__built-in-icon"
                        />
                    </IconButton>
                ) : null}

                {showCustomSuffix ? (
                    <Suffix
                        show={showSuffix}
                        contentType={suffixContentType}
                        icon={resolvedSuffixIcon}
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
                        disabled={false}
                        isExecuting={false}
                        onClick={() => undefined}
                    />
                ) : null}
            </div>

            {shouldShowHelperText ? (
                <HelperText
                    show
                    text={helperText}
                    id={helperTextId}
                />
            ) : reserveMessageSpace ? (
                <div
                    className="advance-inputs__message-spacer"
                    aria-hidden="true"
                />
            ) : null}
        </div>
    );
}

export function getPreviewCss(): string {
    return require("./ui/AdvanceInputs.css");
}