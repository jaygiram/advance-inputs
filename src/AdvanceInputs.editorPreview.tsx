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


export function preview({
    placeholder,
    showLabel,
    labelText,
    required,
    requiredIndicator,
    showHelperText,
    helperText,
    reserveMessageSpace,

    autocomplete,
    inputMode,
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

    /*
     * Preview value is always empty.
     * Therefore the built-in clear button stays hidden automatically.
     */

    const showClearButton = false;
const showPasswordToggle =
    suffixInteraction === "passwordToggle";

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
    id="advance-inputs-preview"
    value=""
    placeholder={placeholder || ""}
    inputType={
        suffixInteraction === "passwordToggle"
            ? "password"
            : "text"
    }
    autocomplete={autocomplete}
    inputMode={inputMode}
    spellCheck={spellCheck}
    autoFocus={false}
    maxLength={undefined}
    readOnly={false}
    required={required}
    ariaInvalid={false}
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