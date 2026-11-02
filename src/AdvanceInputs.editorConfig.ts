import { AdvanceInputsPreviewProps } from "../typings/AdvanceInputsProps";

export type Platform = "web" | "desktop";

export type Properties = PropertyGroup[];

type PropertyGroup = {
    caption: string;
    propertyGroups?: PropertyGroup[];
    properties?: Property[];
};

type Property = {
    key: string;
    caption: string;
    description?: string;
    objectHeaders?: string[]; // used for customizing object grids
    objects?: ObjectProperties[];
    properties?: Properties[];
};

type ObjectProperties = {
    properties: PropertyGroup[];
    captions?: string[]; // used for customizing object grids
};

export type Problem = {
    property?: string; // key of the property, at which the problem exists
    severity?: "error" | "warning" | "deprecation"; // default = "error"
    message: string; // description of the problem
    studioMessage?: string; // studio-specific message, defaults to message
    url?: string; // link with more information about the problem
    studioUrl?: string; // studio-specific link
};

type BaseProps = {
  type: "Image" | "Container" | "RowLayout" | "Text" | "DropZone" | "Selectable" | "Datasource";
  grow?: number; // optionally sets a growth factor if used in a layout (default = 1)
}

type ImageProps = BaseProps & {
  type: "Image";
  document?: string; // svg image
  data?: string; // base64 image
  property?: object; // widget image property object from Values API
  width?: number; // sets a fixed maximum width
  height?: number; // sets a fixed maximum height
}

type ContainerProps = BaseProps & {
  type: "Container" | "RowLayout";
  children: PreviewProps[]; // any other preview element
  borders?: boolean; // sets borders around the layout to visually group its children
  borderRadius?: number; // integer. Can be used to create rounded borders
  backgroundColor?: string; // HTML color, formatted #RRGGBB
  borderWidth?: number; // sets the border width
  padding?: number; // integer. adds padding around the container
}

type RowLayoutProps = ContainerProps & {
  type: "RowLayout";
  columnSize?: "fixed" | "grow" // default is fixed
}

type TextProps = BaseProps & {
  type: "Text";
  content: string; // text that should be shown
  fontSize?: number; // sets the font size
  fontColor?: string; // HTML color, formatted #RRGGBB
  bold?: boolean;
  italic?: boolean;
}

type DropZoneProps = BaseProps & {
  type: "DropZone";
  property: object; // widgets property object from Values API
  placeholder: string; // text to be shown inside the dropzone when empty
  showDataSourceHeader?: boolean; // true by default. Toggles whether to show a header containing information about the datasource
}


type SelectableProps = BaseProps & {
  type: "Selectable";
  object: object; // object property instance from the Value API
  child: PreviewProps; // any type of preview property to visualize the object instance
}

type DatasourceProps = BaseProps & {
  type: "Datasource";
  property: object | null; // datasource property object from Values API
  child?: PreviewProps; // any type of preview property component (optional)
}

export type PreviewProps = ImageProps | ContainerProps | RowLayoutProps | TextProps | DropZoneProps | SelectableProps | DatasourceProps;

export function getProperties(
    values: AdvanceInputsPreviewProps,
    defaultProperties: Properties /*, target: Platform*/
): Properties {
    const hiddenKeys = new Set<string>();

    if (!values.showLabel) {
        hiddenKeys.add("labelText");
    }

    if (values.showLabel && values.labelText?.trim()) {
        hiddenKeys.add("inputAriaLabel");
    }

    if (!values.showLabel || !values.required) {
        hiddenKeys.add("requiredIndicator");
    }

    if (!values.required) {
        hiddenKeys.add("requiredValidationMessage");
    }

    if (values.editable !== "conditional") {
        hiddenKeys.add("editableCondition");
    }

    if (values.visible !== "conditional") {
        hiddenKeys.add("visibleCondition");
    }

    if (!values.showHelperText) {
        hiddenKeys.add("helperText");
    }

    if (values.validationType !== "numeric") {
        hiddenKeys.add("numericValidationMessage");
    }

    if (values.validationType !== "decimal") {
        hiddenKeys.add("decimalValidationMessage");
    }

    if (values.validationType !== "alphabet") {
        hiddenKeys.add("alphabetValidationMessage");
    }

    if (values.validationType !== "custom") {
        hiddenKeys.add("customValidationExpression");
        hiddenKeys.add("customValidationMessage");
    }

    if (!values.enableMaxLength) {
        hiddenKeys.add("maxLength");
        hiddenKeys.add("maxLengthValidationMessage");
    }

    const filterGroup = (group: PropertyGroup): PropertyGroup => ({
        ...group,
        properties: group.properties?.filter(
            property => !hiddenKeys.has(property.key)
        ),
        propertyGroups: group.propertyGroups?.map(filterGroup)
    });

    return defaultProperties.map(filterGroup);
}

export function check(values: AdvanceInputsPreviewProps): Problem[] {
    const problems: Problem[] = [];

    if (
        values.enableMaxLength &&
        (values.maxLength === null || values.maxLength < 1)
    ) {
        problems.push({
            property: "maxLength",
            message: "Maximum length value must be at least 1."
        });
    }

    if (
        (!values.showLabel || !values.labelText?.trim()) &&
        !values.inputAriaLabel?.trim()
    ) {
        problems.push({
            property: "inputAriaLabel",
            severity: "warning",
            message:
                "Provide an input ARIA label when no visible label is available."
        });
    }

    return problems;
}

export function getPreview(
    values: AdvanceInputsPreviewProps,
    isDarkMode: boolean,
    _version: number[]
): PreviewProps {
    const attribute = values.valueAttribute?.trim();

    const formattedAttribute = attribute
        ? attribute
              .replace(/[\[\]]/g, "")
              .replace(/\//g, " / ")
        : "";

    const label =
        values.labelText?.trim() ||
        formattedAttribute ||
        "Configure input field";

    const validationParts: string[] = [];

    if (values.required) {
        validationParts.push("Required");
    }

    if (values.validationType !== "none") {
        validationParts.push(
            values.validationType.charAt(0).toUpperCase() +
                values.validationType.slice(1)
        );
    }

    if (values.enableMaxLength && values.maxLength) {
        validationParts.push(`Maximum ${values.maxLength} characters`);
    }

    const validationText =
        validationParts.length > 0
            ? `Validation: ${validationParts.join(", ")}`
            : "";

    const showCounter =
        values.showCharacterCounter &&
        values.enableMaxLength &&
        Boolean(values.maxLength);

    const footerChildren: PreviewProps[] = [];

    if (validationText) {
        footerChildren.push({
            type: "Text",
            content: validationText,
            fontSize: 9,
            fontColor: isDarkMode ? "#B8C0CC" : "#667085",
            grow: 1
        });
    }

    if (showCounter) {
        footerChildren.push({
            type: "Text",
            content: `0 / ${values.maxLength}`,
            fontSize: 9,
            fontColor: isDarkMode ? "#B8C0CC" : "#667085"
        });
    }

const children: PreviewProps[] = [];

if (values.showLabel) {
    children.push({
        type: "Text",
        content: `${label}${values.required ? " *" : ""}`,
        bold: true,
        fontSize: 9
    });
}

children.push({
    type: "Container",
    borders: true,
    borderRadius: 4,
    borderWidth: 1,
    padding: 7,
    children: [
        {
            type: "Text",
            content:
                values.placeholder?.trim() ||
                (attribute
                    ? `[${formattedAttribute}]`
                    : "No attribute selected"),
            fontSize: 8,
            fontColor: attribute
                ? isDarkMode
                    ? "#D4D4D4"
                    : "#475467"
                : "#D97706"
        }
    ]
});

if (footerChildren.length > 0) {
    children.push({
        type: "RowLayout",
        columnSize: "grow",
        children: footerChildren
    });
}

    return {
        type: "Container",
        borders: true,
        borderRadius: 6,
        borderWidth: 1,
        padding: 8,
        children
    };
}
export function getCustomCaption(
    values: AdvanceInputsPreviewProps,
    _platform: Platform
): string {
    const label = values.labelText?.trim();
    const attribute = values.valueAttribute?.trim();

    if (label) {
        return `Advance Inputs - ${label}`;
    }

    if (attribute) {
        const formattedAttribute = attribute
            .replace(/[\[\]]/g, "")
            .replace(/\//g, " / ")
            .replace(/_/g, " ");

        return `Advance Inputs - ${formattedAttribute}`;
    }

    return "Advance Inputs - Configure field";
}