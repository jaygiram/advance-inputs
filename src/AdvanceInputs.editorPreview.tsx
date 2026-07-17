import { ReactElement } from "react";
import type { WebIcon } from "mendix";

import { AdvanceInputsPreviewProps } from "../typings/AdvanceInputsProps";
import { HelperText } from "./components/HelperText";
import { Input } from "./components/Input";
import { Label } from "./components/Label";
import { Prefix } from "./components/Prefix";
import { Suffix } from "./components/Suffix";

import "./ui/AdvanceInputs.css";

/**
 * Studio Pro preview icon properties can be generated as `unknown`
 * or as an object containing a `value` property.
 */
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
    prefixTooltip,
    prefixAriaLabel,
    showSuffix,
    suffixContentType,
    suffixIcon,
    suffixText,
    suffixAppearance,
    suffixInteractive,
    suffixTooltip,
    suffixAriaLabel
}: AdvanceInputsPreviewProps): ReactElement {
    const previewInputId = "advance-inputs-preview";
    const helperTextId = `${previewInputId}-helper`;
    const shouldShowHelperText = showHelperText && Boolean(helperText?.trim());
    const resolvedPrefixIcon = resolvePreviewIcon(prefixIcon);
    const resolvedSuffixIcon = resolvePreviewIcon(suffixIcon);

    const controlClassName = [
        "advance-inputs__control",
        showPrefix ? "advance-inputs__control--has-prefix" : undefined,
        showSuffix ? "advance-inputs__control--has-suffix" : undefined
    ]
        .filter(Boolean)
        .join(" ");

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
                    appearance={prefixAppearance}
                    interactive={prefixInteractive}
                    ariaLabel={prefixAriaLabel || prefixTooltip || "Prefix action"}
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
                    autocomplete={autocomplete}
                    inputMode={inputMode}
                    spellCheck={spellCheck}
                    autoFocus={false}
                    maxLength={enableMaxLength ? maxLength : undefined}
                    disabled
                    required={required}
                    ariaDescribedBy={shouldShowHelperText ? helperTextId : undefined}
                    onChange={() => undefined}
                />

                <Suffix
                    show={showSuffix}
                    contentType={suffixContentType}
                    icon={resolvedSuffixIcon}
                    text={suffixText}
                    appearance={suffixAppearance}
                    interactive={suffixInteractive}
                    ariaLabel={suffixAriaLabel || suffixTooltip || "Suffix action"}
                    tooltip={suffixTooltip}
                    disabled={false}
                    isExecuting={false}
                    onClick={() => undefined}
                />
            </div>

            {shouldShowHelperText ? (
                <HelperText show text={helperText} id={helperTextId} />
            ) : reserveMessageSpace ? (
                <div className="advance-inputs__message-spacer" aria-hidden="true" />
            ) : null}
        </div>
    );
}

export function getPreviewCss(): string {
    return require("./ui/AdvanceInputs.css");
}