import { useCallback, useState } from "react";

export interface UsePasswordVisibilityResult {
    isPasswordVisible: boolean;
    togglePasswordVisibility: () => void;
    resetPasswordVisibility: () => void;
}

export function usePasswordVisibility(): UsePasswordVisibilityResult {
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);

    const togglePasswordVisibility = useCallback(() => {
        setIsPasswordVisible(currentValue => !currentValue);
    }, []);

    const resetPasswordVisibility = useCallback(() => {
        setIsPasswordVisible(false);
    }, []);

    return {
        isPasswordVisible,
        togglePasswordVisibility,
        resetPasswordVisibility
    };
}
