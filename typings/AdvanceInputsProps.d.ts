/**
 * This file was generated from AdvanceInputs.xml
 * WARNING: All changes made to this file will be overwritten
 * @author Mendix Widgets Framework Team
 */
import { ActionValue, DynamicValue, EditableValue, WebIcon } from "mendix";
import { CSSProperties } from "react";

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

export type EditableEnum = "default" | "never" | "conditional";

export type ReadOnlyStyleEnum = "basedOnDataView" | "control" | "text";

export type VisibleEnum = "default" | "conditional";

export type ValidationTypeEnum = "none" | "numeric" | "decimal" | "alphabet" | "custom";

export type PrefixContentTypeEnum = "icon" | "text";

export type SuffixInteractionEnum = "none" | "action" | "clear" | "passwordToggle" | "copyText";

export type SuffixContentTypeEnum = "icon" | "text";

export type ApplyChangesBehaviorEnum = "onLeave" | "whileTyping";

export interface AdvanceInputsContainerProps {
    name: string;
    class: string;
    style?: CSSProperties;
    tabIndex?: number;
    valueAttribute: EditableValue<string>;
    placeholder: string;
    inputType: InputTypeEnum;
    dynamicInputTooltip?: DynamicValue<string>;
    autocomplete: AutocompleteEnum;
    inputMode: InputModeEnum;
    autoFocus: boolean;
    spellCheck: boolean;
    showLabel: boolean;
    labelText: string;
    requiredIndicator: string;
    editable: EditableEnum;
    editableCondition?: DynamicValue<boolean>;
    readOnlyStyle: ReadOnlyStyleEnum;
    visible: VisibleEnum;
    visibleCondition?: DynamicValue<boolean>;
    required: boolean;
    requiredValidationMessage: string;
    validationType: ValidationTypeEnum;
    numericValidationMessage: string;
    decimalValidationMessage: string;
    alphabetValidationMessage: string;
    customValidationExpression?: DynamicValue<boolean>;
    customValidationMessage: string;
    enableMaxLength: boolean;
    maxLength: number;
    maxLengthValidationMessage: string;
    showHelperText: boolean;
    helperText: string;
    reserveMessageSpace: boolean;
    inputTooltip: string;
    showAsPassword: boolean;
    showCharacterCounter: boolean;
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
    suffixInteraction: SuffixInteractionEnum;
    suffixAction?: ActionValue;
    showSuffix: boolean;
    suffixContentType: SuffixContentTypeEnum;
    suffixIcon?: DynamicValue<WebIcon>;
    suffixText: string;
    suffixShowAsButton: boolean;
    suffixButtonBackgroundColor: string;
    suffixButtonIconColor: string;
    suffixTooltip: string;
    suffixAriaLabel: string;
    onChangeAction?: ActionValue;
    onEnterAction?: ActionValue;
    onLeaveAction?: ActionValue;
    onEnterKeyPressAction?: ActionValue;
    applyChangesBehavior: ApplyChangesBehaviorEnum;
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
    placeholder: string;
    inputType: InputTypeEnum;
    dynamicInputTooltip: string;
    autocomplete: AutocompleteEnum;
    inputMode: InputModeEnum;
    autoFocus: boolean;
    spellCheck: boolean;
    showLabel: boolean;
    labelText: string;
    requiredIndicator: string;
    editable: EditableEnum;
    editableCondition: string;
    readOnlyStyle: ReadOnlyStyleEnum;
    visible: VisibleEnum;
    visibleCondition: string;
    required: boolean;
    requiredValidationMessage: string;
    validationType: ValidationTypeEnum;
    numericValidationMessage: string;
    decimalValidationMessage: string;
    alphabetValidationMessage: string;
    customValidationExpression: string;
    customValidationMessage: string;
    enableMaxLength: boolean;
    maxLength: number | null;
    maxLengthValidationMessage: string;
    showHelperText: boolean;
    helperText: string;
    reserveMessageSpace: boolean;
    inputTooltip: string;
    showAsPassword: boolean;
    showCharacterCounter: boolean;
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
    suffixInteraction: SuffixInteractionEnum;
    suffixAction: {} | null;
    showSuffix: boolean;
    suffixContentType: SuffixContentTypeEnum;
    suffixIcon:
        | { type: "glyph"; iconClass: string }
        | { type: "image"; imageUrl: string; iconUrl: string }
        | { type: "icon"; iconClass: string }
        | undefined;
    suffixText: string;
    suffixShowAsButton: boolean;
    suffixButtonBackgroundColor: string;
    suffixButtonIconColor: string;
    suffixTooltip: string;
    suffixAriaLabel: string;
    onChangeAction: {} | null;
    onEnterAction: {} | null;
    onLeaveAction: {} | null;
    onEnterKeyPressAction: {} | null;
    applyChangesBehavior: ApplyChangesBehaviorEnum;
}
