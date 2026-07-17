import { useCallback, useState } from "react";
import type { ActionValue } from "mendix";

export interface UseActionHandlerOptions {
    action?: ActionValue;
    disabled?: boolean;
}

export interface UseActionHandlerResult {
    execute: () => void;
    isExecuting: boolean;
    canExecute: boolean;
}

export function useActionHandler({
    action,
    disabled = false
}: UseActionHandlerOptions): UseActionHandlerResult {
    const [isExecutingLocally, setIsExecutingLocally] = useState(false);

    const isExecuting = isExecutingLocally || Boolean(action?.isExecuting);

    const canExecute =
        Boolean(action) &&
        Boolean(action?.canExecute) &&
        !disabled &&
        !isExecuting;

    const execute = useCallback((): void => {
        if (
            !action ||
            !action.canExecute ||
            disabled ||
            action.isExecuting ||
            isExecutingLocally
        ) {
            return;
        }

        setIsExecutingLocally(true);

        try {
            action.execute();
        } finally {
            const resetExecutionState = (): void => {
                setIsExecutingLocally(false);
            };

            if (typeof queueMicrotask === "function") {
                queueMicrotask(resetExecutionState);
            } else {
                setTimeout(resetExecutionState, 0);
            }
        }
    }, [action, disabled, isExecutingLocally]);

    return {
        execute,
        isExecuting,
        canExecute
    };
}