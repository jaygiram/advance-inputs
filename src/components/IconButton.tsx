import { ReactElement, ReactNode } from "react";
import type { WebIcon } from "mendix";

import { renderWebIcon } from "../utils/renderWebIcon";

export interface IconButtonProps {
    icon?: WebIcon;
    text?: string;
    contentType: "icon" | "text";
    position: "prefix" | "suffix";
    appearance: "plain" | "soft" | "outlined" | "filled" | "attached";
    ariaLabel: string;
    tooltip?: string;
    disabled?: boolean;
    isExecuting?: boolean;
    onClick: () => void;
    children?: ReactNode;
}

export function IconButton({
    icon,
    text,
    contentType,
    position,
    appearance,
    ariaLabel,
    tooltip,
    disabled,
    isExecuting,
    onClick,
    children
}: IconButtonProps): ReactElement | null {
    const hasChildren = Boolean(children);
    const shouldRender =
        hasChildren ||
        (contentType === "icon" && Boolean(icon)) ||
        (contentType === "text" && Boolean(text && text.trim()));

    if (!shouldRender) {
        return null;
    }

    const buttonClassName = [
        "advance-inputs__affix",
        "advance-inputs__affix-button",
        position === "prefix" ? "advance-inputs__prefix" : "advance-inputs__suffix",
        `advance-inputs__affix--${appearance}`,
        isExecuting ? "advance-inputs__affix-button--loading" : null
    ].filter(Boolean).join(" ");

    return (
        <button
            type="button"
            className={buttonClassName}
            aria-label={ariaLabel}
            title={tooltip || undefined}
            disabled={disabled || isExecuting}
            aria-busy={isExecuting || undefined}
            onClick={onClick}
            onMouseDown={event => event.preventDefault()}
        >
            {children ?? (contentType === "icon" ? renderWebIcon(icon) : text)}
            {isExecuting ? <span className="advance-inputs__affix-loader" aria-hidden="true" /> : null}
        </button>
    );
}
