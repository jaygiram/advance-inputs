import type { FactoryArg } from "imask";

export type MaskType =
    | "date"
    | "phone"
    | "pan"
    | "gst"
    | "ssn"
    | "custom";

export interface InputMaskSettings {
    enabled: boolean;
    type: MaskType;
    dateFormat?: string;
    phoneFormat?: string;
    customMask?: string;
    placeholderChar?: string;
    lazy?: boolean;
}

export function buildInputMask(
    settings: InputMaskSettings
): FactoryArg | undefined {
    if (!settings.enabled) {
        return undefined;
    }

    switch (settings.type) {
        case "phone":
            switch (settings.phoneFormat) {
                case "india":
                    return {
                        mask: "+{91} 00000 00000",
                        lazy: settings.lazy ?? true,
                        placeholderChar: settings.placeholderChar ?? "_"
                    };

                case "us":
                    return {
                        mask: "(000) 000-0000",
                        lazy: settings.lazy ?? true,
                        placeholderChar: settings.placeholderChar ?? "_"
                    };

                case "international":
                    return {
                        mask: "+000000000000000",
                        lazy: settings.lazy ?? true,
                        placeholderChar: settings.placeholderChar ?? "_"
                    };

                default:
                    return {
                        mask: "+{91} 00000 00000"
                    };
            }

        case "pan":
            return {
                mask: "aaaaa0000a",
                prepare: (value: string) => value.toUpperCase(),
                lazy: settings.lazy ?? true,
                placeholderChar: settings.placeholderChar ?? "_"
            };

        case "gst":
            return {
                mask: "00aaaaa0000a0a0",
                prepare: (value: string) => value.toUpperCase(),
                lazy: settings.lazy ?? true,
                placeholderChar: settings.placeholderChar ?? "_"
            };

        case "ssn":
            return {
                mask: "000-00-0000",
                lazy: settings.lazy ?? true,
                placeholderChar: settings.placeholderChar ?? "_"
            };

        case "date":
            switch (settings.dateFormat) {
                case "MMddyyyy":
                    return {
                        mask: "00/00/0000"
                    };

                case "yyyyMMdd":
                    return {
                        mask: "0000-00-00"
                    };

                default:
                    return {
                        mask: "00/00/0000"
                    };
            }

        case "custom":
            if (settings.customMask) {
                return {
                    mask: settings.customMask,
                    lazy: settings.lazy ?? true,
                    placeholderChar: settings.placeholderChar ?? "_"
                };
            }
            return undefined;

        default:
            return undefined;
    }
}