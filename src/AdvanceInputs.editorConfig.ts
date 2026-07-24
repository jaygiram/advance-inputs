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
    if (
        values.enableMaxLength &&
        (values.maxLength === null || values.maxLength < 1)
    ) {
        return [
            {
                property: "maxLength",
                message: "Maximum length value must be at least 1."
            }
        ];
    }

    return [];
}

// export function getPreview(values: AdvanceInputsPreviewProps, isDarkMode: boolean, version: number[]): PreviewProps {
//     // Customize your pluggable widget appearance for Studio Pro.
//     return {
//         type: "Container",
//         children: []
//     }
// }

// export function getCustomCaption(values: AdvanceInputsPreviewProps, platform: Platform): string {
//     return "AdvanceInputs";
// }
