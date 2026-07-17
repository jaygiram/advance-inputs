import { ReactElement } from "react";
import type { WebIcon } from "mendix";

export function renderWebIcon(
    icon?: WebIcon,
    className = "advance-inputs__icon"
): ReactElement | null {
    if (!icon) {
        return null;
    }

    if (icon.type === "glyph") {
        return (
            <span
                className={[className, icon.iconClass].filter(Boolean).join(" ")}
                aria-hidden="true"
            />
        );
    }

    if (icon.type === "image") {
        return (
            <img
                className={className}
                src={icon.iconUrl}
                alt=""
                aria-hidden="true"
                draggable={false}
            />
        );
    }

    return null;
}
