import { ReactElement } from "react";
import { AdvanceInputsPreviewProps } from "../typings/AdvanceInputsProps";

export function preview({
    valueAttribute,
    placeholder,
    showLabel,
    labelText,
    required,
    requiredIndicator,
    validationType,
    enableMaxLength,
    maxLength,
    showCharacterCounter,
    showHelperText,
    helperText
}: AdvanceInputsPreviewProps): ReactElement {
    const attribute = valueAttribute?.trim();

    const formattedAttribute = attribute
        ? attribute
              .replace(/[\[\]]/g, "")
              .replace(/\//g, " / ")
        : "";

    const label =
        labelText?.trim() ||
        formattedAttribute ||
        "Configure input field";

    const validationParts: string[] = [];

    if (required) {
        validationParts.push("Required");
    }

    if (validationType !== "none") {
        validationParts.push(
            validationType.charAt(0).toUpperCase() +
                validationType.slice(1)
        );
    }

    if (enableMaxLength && maxLength) {
        validationParts.push(`Maximum ${maxLength} characters`);
    }

    const showValidation = validationParts.length > 0;

    const showCounter =
        showCharacterCounter &&
        enableMaxLength &&
        Boolean(maxLength);

    return (
        <div className="advance-inputs-design-preview">
            {showLabel ? (
                <div className="advance-inputs-design-preview__label">
                    {label}

                    {required ? (
                        <span className="advance-inputs-design-preview__required">
                            {" "}
                            {requiredIndicator || "*"}
                        </span>
                    ) : null}
                </div>
            ) : null}

            <div className="advance-inputs-design-preview__control">
                {placeholder?.trim() ||
                    (attribute
                        ? `[${formattedAttribute}]`
                        : "No attribute selected")}
            </div>

            <div className="advance-inputs-design-preview__footer">
                <div className="advance-inputs-design-preview__message">
                    {showHelperText && helperText?.trim()
                        ? helperText
                        : showValidation
                          ? `Validation: ${validationParts.join(", ")}`
                          : ""}
                </div>

                {showCounter ? (
                    <div className="advance-inputs-design-preview__counter">
                        0 / {maxLength}
                    </div>
                ) : null}
            </div>
        </div>
    );
}

export function getPreviewCss(): string {
    return `
        .advance-inputs-design-preview {
            width: 100%;
            padding: 8px;
            box-sizing: border-box;
            font-family: inherit;
        }

        .advance-inputs-design-preview__label {
            margin-bottom: 5px;
            font-size: 13px;
            font-weight: 600;
            line-height: 1.3;
        }

        .advance-inputs-design-preview__required {
            color: #d14343;
        }

        .advance-inputs-design-preview__control {
            width: 100%;
            min-height: 36px;
            padding: 8px 10px;
            border: 1px solid #aeb4bc;
            border-radius: 6px;
            background: transparent;
            box-sizing: border-box;
            font-size: 12px;
            line-height: 18px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
        }

        .advance-inputs-design-preview__footer {
            display: flex;
            align-items: flex-start;
            justify-content: space-between;
            gap: 10px;
            min-height: 14px;
            margin-top: 4px;
        }

        .advance-inputs-design-preview__message {
            flex: 1;
            min-width: 0;
            font-size: 10px;
            line-height: 1.4;
            opacity: 0.75;
        }

        .advance-inputs-design-preview__counter {
            flex-shrink: 0;
            font-size: 10px;
            line-height: 1.4;
            opacity: 0.75;
            white-space: nowrap;
        }
    `;
}