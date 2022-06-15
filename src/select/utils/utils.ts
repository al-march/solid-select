export const isObject = (v: unknown) => (
    v && !Array.isArray(v) && typeof v === 'object'
)

export const isArray = (v: unknown) => Array.isArray(v);

export const tick = () => Promise.resolve();

export const isOptionChecked = (option: HTMLElement) => (
    option && option.classList.contains('option-active')
)
