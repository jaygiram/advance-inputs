import { ReactElement } from "react";

export interface HelperTextProps {
    show: boolean;
    text: string;
    id: string;
    className?: string;
}

export function HelperText({ show, text, id, className }: HelperTextProps): ReactElement | null {
    if (!show || !text) {
        return null;
    }

    const helperTextClassName = ["advance-inputs__helper-text", className].filter(Boolean).join(" ");

    return (
        <div id={id} className={helperTextClassName}>
            {text}
        </div>
    );
}
