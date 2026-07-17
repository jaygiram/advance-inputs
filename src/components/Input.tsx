import { FocusEvent, KeyboardEvent, ReactElement } from "react";

export interface InputProps {
    id: string;
    value: string;
    placeholder?: string;
    inputType: "text" | "password" | "email" | "tel" | "url" | "search";
    autocomplete: string;
    inputMode: "text" | "email" | "tel" | "url" | "numeric" | "decimal" | "search" | "none";
    spellCheck: boolean;
    autoFocus: boolean;
    maxLength?: number;
    tabIndex?: number;
    readOnly?: boolean;
    disabled?: boolean;
    required?: boolean;
    ariaInvalid?: boolean;
    ariaDescribedBy?: string;
    className?: string;
    onChange: (value: string) => void;
    onFocus?: (event: FocusEvent<HTMLInputElement>) => void;
    onBlur?: (event: FocusEvent<HTMLInputElement>) => void;
    onKeyDown?: (event: KeyboardEvent<HTMLInputElement>) => void;
}

export function Input({
    id,
    value,
    placeholder,
    inputType,
    autocomplete,
    inputMode,
    spellCheck,
    autoFocus,
    maxLength,
    tabIndex,
    readOnly,
    disabled,
    required,
    ariaInvalid,
    ariaDescribedBy,
    className,
    onChange,
    onFocus,
    onBlur,
    onKeyDown
}: InputProps): ReactElement {
    const inputClassName = ["advance-inputs__input", className]
        .filter(Boolean)
        .join(" ");

    return (
        <input
            id={id}
            type={inputType}
            value={value}
            placeholder={placeholder}
            autoComplete={autocomplete}
            inputMode={inputMode}
            spellCheck={spellCheck}
            autoFocus={autoFocus}
            maxLength={maxLength}
            tabIndex={tabIndex}
            readOnly={readOnly}
            disabled={disabled}
            required={required}
            aria-required={required ? true : undefined}
            aria-invalid={ariaInvalid ? true : undefined}
            aria-readonly={readOnly || undefined}
            aria-describedby={ariaDescribedBy || undefined}
            className={inputClassName}
            onChange={event => onChange(event.target.value)}
            onFocus={onFocus}
            onBlur={onBlur}
            onKeyDown={onKeyDown}
        />
    );
}