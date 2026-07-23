/**
 * This file was generated from AdvanceInputs.xml
 * WARNING: All changes made to this file will be overwritten
 * @author Mendix Widgets Framework Team
 */
import { ActionValue, DynamicValue, EditableValue, WebIcon } from "mendix";
import { CSSProperties } from "react";

export type PrefixContentTypeEnum = "icon" | "text";

export type SuffixContentTypeEnum = "icon" | "text";

export type SuffixInteractionEnum = "none" | "action" | "clear" | "passwordToggle" | "copyText";

export type InputTypeEnum = "text" | "password" | "email" | "tel" | "url" | "search";

export type AutocompleteEnum =
    | "off"
    | "on"
    | "name"
    | "givenName"
    | "familyName"
    | "email"
    | "username"
    | "currentPassword"
    | "newPassword"
    | "tel"
    | "organization";

export type InputModeEnum = "text" | "email" | "tel" | "url" | "numeric" | "decimal" | "search" | "none";

export type InputMaskTypeEnum = "date" | "phone" | "pan" | "gst" | "ssn" | "custom";

export type DateMaskFormatEnum = "ddMMyyyy" | "MMddyyyy" | "yyyyMMdd";

export type PhoneMaskFormatEnum = "india" | "us" | "international";

export type ValidationTypeEnum = "none" | "numeric" | "decimal" | "custom";

export interface AdvanceInputsContainerProps {
    name: string;
    class: string;
    style?: CSSProperties;
    tabIndex?: number;
    valueAttribute: EditableValue<string>;
    showLabel: boolean;
    labelText: string;
    inputTooltip: string;
    required: boolean;
    requiredIndicator: string;
    showHelperText: boolean;
    helperText: string;
    reserveMessageSpace: boolean;
    showPrefix: boolean;
    prefixContentType: PrefixContentTypeEnum;
    prefixIcon?: DynamicValue<WebIcon>;
    prefixText: string;
    prefixShowAsButton: boolean;
    prefixButtonBackgroundColor: string;
    prefixButtonIconColor: string;
    prefixInteractive: boolean;
    prefixAction?: ActionValue;
    prefixTooltip: string;
    prefixAriaLabel: string;
    showSuffix: boolean;
    suffixContentType: SuffixContentTypeEnum;
    suffixIcon?: DynamicValue<WebIcon>;
    suffixText: string;
    suffixButtonBackgroundColor: string;
    suffixButtonIconColor: string;
    suffixButtonIconColor: string;
    suffixInteraction: SuffixInteractionEnum;
    suffixAction?: ActionValue;
    suffixTooltip: string;
    suffixAriaLabel: string;
    inputType: InputTypeEnum;
    autocomplete: AutocompleteEnum;
    inputMode: InputModeEnum;
    enableInputMask: boolean;
    inputMaskType: InputMaskTypeEnum;
    dateMaskFormat: DateMaskFormatEnum;
    phoneMaskFormat: PhoneMaskFormatEnum;
    customInputMask: string;
    inputMaskPlaceholderCharacter: string;
    showInputMaskPlaceholder: boolean;
    storeUnmaskedValue: boolean;
    validationType: ValidationTypeEnum;
    customPattern: string;
    validationMessage: string;
    enableMaxLength: boolean;
    maxLength: number;
    showCharacterCounter: boolean;
    spellCheck: boolean;
    autoFocus: boolean;
}

export interface AdvanceInputsPreviewProps {
    /**
     * @deprecated Deprecated since version 9.18.0. Please use class property instead.
     */
    className: string;
    class: string;
    style: string;
    styleObject?: CSSProperties;
    readOnly: boolean;
    renderMode: "design" | "xray" | "structure";
    translate: (text: string) => string;
    valueAttribute: string;
    showLabel: boolean;
    labelText: string;
    inputTooltip: string;
    required: boolean;
    requiredIndicator: string;
    showHelperText: boolean;
    helperText: string;
    reserveMessageSpace: boolean;
    showPrefix: boolean;
    prefixContentType: PrefixContentTypeEnum;
    prefixIcon:
        | { type: "glyph"; iconClass: string }
        | { type: "image"; imageUrl: string; iconUrl: string }
        | { type: "icon"; iconClass: string }
        | undefined;
    prefixText: string;
    prefixShowAsButton: boolean;
    prefixButtonBackgroundColor: string;
    prefixButtonIconColor: string;
    prefixInteractive: boolean;
    prefixAction: {} | null;
    prefixTooltip: string;
    prefixAriaLabel: string;
    showSuffix: boolean;
    suffixContentType: SuffixContentTypeEnum;
    suffixIcon:
        | { type: "glyph"; iconClass: string }
        | { type: "image"; imageUrl: string; iconUrl: string }
        | { type: "icon"; iconClass: string }
        | undefined;
    suffixText: string;
    suffixButtonBackgroundColor: string;
    suffixButtonIconColor: string;
    suffixButtonIconColor: string;
    suffixInteraction: SuffixInteractionEnum;
    suffixAction: {} | null;
    suffixTooltip: string;
    suffixAriaLabel: string;
    inputType: InputTypeEnum;
    autocomplete: AutocompleteEnum;
    inputMode: InputModeEnum;
    enableInputMask: boolean;
    inputMaskType: InputMaskTypeEnum;
    dateMaskFormat: DateMaskFormatEnum;
    phoneMaskFormat: PhoneMaskFormatEnum;
    customInputMask: string;
    inputMaskPlaceholderCharacter: string;
    showInputMaskPlaceholder: boolean;
    storeUnmaskedValue: boolean;
    validationType: ValidationTypeEnum;
    customPattern: string;
    validationMessage: string;
    enableMaxLength: boolean;
    maxLength: number | null;
    showCharacterCounter: boolean;
    spellCheck: boolean;
    autoFocus: boolean;
}
