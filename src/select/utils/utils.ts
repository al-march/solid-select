export const isObject = (v: unknown) => v && !Array.isArray(v) && typeof v === 'object';
export const isArray = (v: unknown) => Array.isArray(v);
