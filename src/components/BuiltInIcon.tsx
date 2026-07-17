import { ReactElement, SVGProps } from "react";

export type BuiltInIconName = "clear" | "eye" | "eyeOff";

export interface BuiltInIconProps {
    name: BuiltInIconName;
    className?: string;
}

export function BuiltInIcon({
    name,
    className
}: BuiltInIconProps): ReactElement {
    const commonProps: SVGProps<SVGSVGElement> = {
        width: "1em",
        height: "1em",
        viewBox: "0 0 24 24",
        fill: "none",
        stroke: "currentColor",
        strokeWidth: 2,
        strokeLinecap: "round",
        strokeLinejoin: "round",
        focusable: false,
        "aria-hidden": true,
        className
    };

    switch (name) {
        case "eye":
            return (
                <svg {...commonProps}>
                    <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12Z" />
                    <circle cx="12" cy="12" r="3" />
                </svg>
            );

        case "eyeOff":
            return (
                <svg {...commonProps}>
                    <path d="M3 3l18 18" />
                    <path d="M10.6 10.6A3 3 0 0 0 13.4 13.4" />
                    <path d="M9.2 5.2A10.9 10.9 0 0 1 12 5c6.5 0 10 7 10 7a19.7 19.7 0 0 1-4.1 5.1" />
                    <path d="M6.4 6.4A19.9 19.9 0 0 0 2 12s3.5 7 10 7a10.8 10.8 0 0 0 4.2-.8" />
                </svg>
            );

        case "clear":
        default:
            return (
                <svg {...commonProps}>
                    <path d="M6 6l12 12" />
                    <path d="M18 6L6 18" />
                </svg>
            );
    }
}