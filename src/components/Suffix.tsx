import { CSSProperties, ReactElement } from "react";
import type { WebIcon } from "mendix";

import { IconButton } from "./IconButton";
import { renderWebIcon } from "../utils/renderWebIcon";

export interface SuffixProps {
    show: boolean;
    contentType: "icon" | "text";
    icon?: WebIcon;
    text: string;
    showAsButton?: boolean;
    buttonBackgroundColor?: string;
    buttonIconColor?: string;
    interactive: boolean;
    ariaLabel: string;
    tooltip?: string;
    disabled?: boolean;
    isExecuting?: boolean;
    onClick?: () => void;
}

export function Suffix({
    show,
    contentType,
    icon,
    text,
    showAsButton = false,
    buttonBackgroundColor,
    buttonIconColor,
    interactive,
    ariaLabel,
    tooltip,
    disabled,
    isExecuting,
    onClick
}: SuffixProps): ReactElement | null {
    if (!show) {
        return null;
    }

    const content =
        contentType === "icon"
            ? renderWebIcon(icon, "advance-inputs__icon")
            : text.trim()
              ? text
              : null;

    if (!content) {
        return null;
    }

    const resolvedBackgroundColor = buttonBackgroundColor?.trim();
    const resolvedIconColor = buttonIconColor?.trim();

    const customStyle: CSSProperties | undefined = showAsButton
        ? {
              backgroundColor: resolvedBackgroundColor || undefined,
              color: resolvedIconColor || undefined
          }
        : undefined;

    const customClassName = showAsButton
        ? "advance-inputs__affix--button-style"
        : "advance-inputs__affix--simple-icon";

    if (interactive) {
        return (
            <IconButton
                icon={contentType === "icon" ? icon : undefined}
                text={contentType === "text" ? text : undefined}
                contentType={contentType}
                position="suffix"
                ariaLabel={ariaLabel}
                tooltip={tooltip}
                disabled={disabled}
                isExecuting={isExecuting}
                onClick={onClick || (() => undefined)}
                className={customClassName}
                style={customStyle}
            />
        );
    }

    return (
        <span
            className={[
                "advance-inputs__affix",
                "advance-inputs__suffix",
                customClassName
            ]
                .filter(Boolean)
                .join(" ")}
            style={customStyle}
            aria-hidden="true"
            role="presentation"
        >
            {content}
        </span>
    );
}