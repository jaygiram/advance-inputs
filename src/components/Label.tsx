import { ReactElement } from "react";

export interface LabelProps {
    show: boolean;
    text: string;
    required: boolean;
    requiredIndicator: string;
    htmlFor: string;
    className?: string;
}

export function Label({
    show,
    text,
    required,
    requiredIndicator,
    htmlFor,
    className
}: LabelProps): ReactElement | null {
    if (!show) {
        return null;
    }

    const labelClassName = ["advance-inputs__label", className].filter(Boolean).join(" ");

    return (
        <label htmlFor={htmlFor} className={labelClassName}>
            {text}
            {required && requiredIndicator ? (
                <span className="advance-inputs__required-indicator" aria-hidden="true">
                    {requiredIndicator}
                </span>
            ) : null}
        </label>
    );
}
