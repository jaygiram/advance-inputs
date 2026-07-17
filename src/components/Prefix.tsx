import { ReactElement } from "react";
import type { WebIcon } from "mendix";

import { IconButton } from "./IconButton";
import { renderWebIcon } from "../utils/renderWebIcon";

export interface PrefixProps {
    show: boolean;
    contentType: "icon" | "text";
    icon?: WebIcon;
    text: string;
    appearance: "plain" | "soft" | "outlined" | "filled" | "attached";
    interactive: boolean;
    ariaLabel: string;
    tooltip?: string;
    disabled?: boolean;
    isExecuting?: boolean;
    onClick?: () => void;
}

export function Prefix({
    show,
    contentType,
    icon,
    text,
    appearance,
    interactive,
    ariaLabel,
    tooltip,
    disabled,
    isExecuting,
    onClick
}: PrefixProps): ReactElement | null {
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

    if (interactive) {
        return (
            <IconButton
                icon={contentType === "icon" ? icon : undefined}
                text={contentType === "text" ? text : undefined}
                contentType={contentType}
                position="prefix"
                appearance={appearance}
                ariaLabel={ariaLabel}
                tooltip={tooltip}
                disabled={disabled}
                isExecuting={isExecuting}
                onClick={onClick || (() => undefined)}
            />
        );
    }

    return (
        <span
            className={[
                "advance-inputs__affix",
                "advance-inputs__prefix",
                `advance-inputs__affix--${appearance}`
            ].join(" ")}
            aria-hidden="true"
            role="presentation"
        >
            {content}
        </span>
    );
}