/**
 * This file was generated from AdvanceInputs.xml
 * WARNING: All changes made to this file will be overwritten
 * @author Mendix Widgets Framework Team
 */
import { EditableValue } from "mendix";
import { CSSProperties } from "react";

export interface AdvanceInputsContainerProps {
    name: string;
    class: string;
    style?: CSSProperties;
    tabIndex?: number;
    valueAttribute: EditableValue<string>;
    placeholder: string;
    showLabel: boolean;
    labelText: string;
    required: boolean;
    requiredIndicator: string;
    showHelperText: boolean;
    helperText: string;
    reserveMessageSpace: boolean;
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
    showLabel: boolean;
    labelText: string;
    required: boolean;
    requiredIndicator: string;
    showHelperText: boolean;
    helperText: string;
    reserveMessageSpace: boolean;
}
