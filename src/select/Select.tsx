import { createContext, createMemo, createSignal, JSXElement, ParentProps, Show, useContext } from 'solid-js';
import { createStore } from 'solid-js/store';
import { DropdownIcon } from './assets/DropdownIcon';
import { Dropdown } from './Dropdown';
import { isArray, isObject } from './utils/utils';

type SelectState<T> = {
    value?: T;
    show: boolean;
}

type SelectContext<T = any> = {
    state: SelectState<T>;
    setValue: (v: T) => void;
    reset: () => void;
    open: () => void;
    close: () => void;
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
    show?: boolean;
    value?: T;
    onValueChange?: (v: T) => void;
}

export function Select<T extends any>(props: ParentProps<SelectProps<T>>) {

    const [ref, setRef] = createSignal<HTMLElement>();
    const [state, setState] = createStore<SelectState<T>>({
        value: props.value,
        show: props.show || false,
    });

    const setValue = (v: T) => {
        setState('value', v);
        close();
    };

    const reset = () => {
        setState('value', undefined);
    };

    const open = () => {
        setState('show', true);
    };

    const close = () => {
        setState('show', false);
    };

    const toggle = () => {
        setState('show', !state.show);
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
            reset,
            open,
            close,
        }}>
            <div class="relative" ref={setRef}>
                <button class="select" onClick={toggle}>
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
            </div>

            <Dropdown reference={ref} show={state.show}>
                {props.children}
            </Dropdown>

        </SelectContext.Provider>
    );
}
