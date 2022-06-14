import { createContext, createMemo, JSXElement, ParentProps, Show, useContext } from 'solid-js';
import { createStore } from 'solid-js/store';
import { DropdownIcon } from './assets/DropdownIcon';
import { Dropdown } from './Dropdown';
import { isArray, isObject } from './utils/utils';

type SelectState<T> = {
    value?: T;
}

type SelectContext<T = any> = {
    state: SelectState<T>;
    setValue: (v: T) => void;
    reset: () => void;
}

const SelectContext = createContext<SelectContext>();

export const useSelect = <T extends any>() => {
    const ctx = useContext(SelectContext);
    if (ctx) {
        return ctx;
    }
    throw new Error('context for Select not found');
};

export type SelectProps<T> = {
    placeholder?: string;
    value?: T;
    onValueChange?: (v: T) => void;
}

export function Select<T extends any>(props: ParentProps<SelectProps<T>>) {

    const [state, setState] = createStore<SelectState<T>>({
        value: props.value
    });

    const setValue = (v: T) => {
        setState('value', v);
    };

    const reset = () => {
        setState('value', undefined);
    };

    const defaultValueView = createMemo<JSXElement>(() => {
        const value = state.value;
        if (isObject(value)) {
            return <span>{(value as object).toString()}</span>;
        }
        if (isArray(value)) {
            return (value as T[]).map(v => <span>{v as string}</span>);
        }
        return <span>{value as string}</span>;
    });

    return (
        <SelectContext.Provider value={{
            state,
            setValue,
            reset
        }}>
            <div class="relative">
                <button class="select">
                    <span class="flex items-center">
                        <Show
                            when={state.value}
                            fallback={<span>{props.placeholder} &nbsp;</span>}
                        >
                            {defaultValueView()}
                        </Show>
                    </span>
                    <span class="select-icon">
                        <DropdownIcon/>
                    </span>
                </button>

                <Dropdown>
                    {props.children}
                </Dropdown>
            </div>
        </SelectContext.Provider>
    );
}
