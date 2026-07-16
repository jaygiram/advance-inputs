import { ChangeEvent, ReactElement } from "react";

import { AdvanceInputsContainerProps } from "../typings/AdvanceInputsProps";

import "./ui/AdvanceInputs.css";

export function AdvanceInputs({
    valueAttribute,
    placeholder,
    class: className,
    style,
    tabIndex
}: AdvanceInputsContainerProps): ReactElement {
    const value = valueAttribute.value ?? "";
    const isReadOnly = valueAttribute.readOnly;

    const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
        if (!isReadOnly) {
            valueAttribute.setValue(event.target.value);
        }
    };

    return (
        <div className={`advance-inputs ${className || ""}`} style={style}>
            <input
                className="advance-inputs__input"
                type="text"
                value={value}
                placeholder={placeholder || ""}
                readOnly={isReadOnly}
                tabIndex={tabIndex}
                onChange={handleChange}
                aria-invalid={valueAttribute.validation ? true : undefined}
            />

            {valueAttribute.validation && (
                <div className="advance-inputs__validation" role="alert">
                    {valueAttribute.validation}
                </div>
            )}
        </div>
    );
}