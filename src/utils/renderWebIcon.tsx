import { ReactElement } from "react";
import type { WebIcon } from "mendix";

type SupportedWebIcon =
    | WebIcon
    | {
          type: "icon";
          iconClass: string;
      };

export function renderWebIcon(
    icon?: SupportedWebIcon,
    className = "advance-inputs__icon"
): ReactElement | null {
    if (!icon) {
        return null;
    }

    if (icon.type === "glyph" || icon.type === "icon") {
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