import { CSSProperties, ReactElement, ReactNode } from "react";
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

    /**
     * Optional additional class used for visual variants such as
     * the configurable prefix or suffix button appearance.
     */
    className?: string;

    /**
     * Optional inline styles supplied by the parent component.
     * This is used for Mendix-configured background and icon colors.
     */
    style?: CSSProperties;
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
    children,
    className,
    style
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
        position === "prefix"
            ? "advance-inputs__prefix"
            : "advance-inputs__suffix",
        `advance-inputs__affix--${appearance}`,
        disabled || isExecuting
            ? "advance-inputs__affix-button--disabled"
            : undefined,
        isExecuting
            ? "advance-inputs__affix-button--loading"
            : undefined,
        className
    ]
        .filter(Boolean)
        .join(" ");

    const resolvedAriaLabel =
        ariaLabel?.trim() ||
        (position === "prefix" ? "Prefix action" : "Suffix action");

    const handleClick = (): void => {
        if (disabled || isExecuting) {
            return;
        }

        onClick();
    };

    return (
        <button
            type="button"
            className={buttonClassName}
            style={style}
            aria-label={resolvedAriaLabel}
            title={tooltip || undefined}
            disabled={disabled || isExecuting}
            aria-disabled={disabled || isExecuting || undefined}
            aria-busy={isExecuting || undefined}
            onClick={handleClick}
        >
            {children ??
                (contentType === "icon"
                    ? renderWebIcon(icon)
                    : text)}

            {isExecuting ? (
                <span
                    className="advance-inputs__affix-loader"
                    aria-hidden="true"
                />
            ) : null}
        </button>
    );
}