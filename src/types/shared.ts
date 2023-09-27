export interface DisableSuspenseContext {
    /**
     * If not using Suspense (I.E. disableSuspense = true) then this lets the consumer handle the loading state.
     */
    isLoading: boolean;
}

export interface DisableSuspenseHook {
    /**
     * By default we are using React suspense to handle loading
     * states, but if we need to disable that, set this to true.
     * Default = false
     */
    disableSuspense?: boolean;
}

export interface DisableSuspenseHookData {
    /**
     * If not using Suspense (I.E. disableSuspense = true) then this lets the consumer handle the loading state.
     */
    isLoading: boolean;
}

export interface DisableHook {
    /**
     * If a hook that supports it should be enabled/disabled.
     *
     * Default = enabled if unset.
     */
    disabled?: boolean;
}

export interface Invalidatable {

    invalidate: () => void;
}