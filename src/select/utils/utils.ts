export const isObject = (v: unknown) => (
    v && !Array.isArray(v) && typeof v === 'object'
);

export const isArray = (v: unknown) => Array.isArray(v);

export const toArray = <T>(v: T | T[]): T[] => {
    if (isArray(v)) {
        return v as T[];
    }
    return [v] as T[];
};

export const tick = () => Promise.resolve();

export const isChecked = (option: HTMLElement) => (
    option && option.classList.contains('option-active')
);

export const isDisabled = (option: HTMLButtonElement) => (
    option && option.disabled
);

export const findOption = (
    el: HTMLButtonElement,
    direction: 'prev' | 'next'
): HTMLButtonElement | undefined => {
    const optionRef = direction === 'prev'
        ? el.previousElementSibling as HTMLButtonElement
        : el.nextElementSibling as HTMLButtonElement;

    if (!optionRef) {
        return;
    }
    if (optionRef && !isDisabled(optionRef)) {
        return optionRef;
    }
    return findOption(optionRef, direction);
};
