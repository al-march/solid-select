import {
    createContext,
    createEffect,
    createMemo,
    createSignal,
    JSXElement,
    ParentProps,
    Show,
    useContext
} from 'solid-js';
import { createStore } from 'solid-js/store';
import { DropdownIcon } from './assets/DropdownIcon';
import { Dropdown } from './Dropdown';
import { isArray, isObject } from './utils/utils';

export const enum TestSelectors {
    SELECT = 'select',
    PLACEHOLDER = 'placeholder',
    VALUE = 'value',
    DROPDOWN = 'dropdown',
    OPTION = 'option',
}

type SelectState<T> = {
    value?: T;
    show: boolean;
    compareKey?: (v: T) => any;
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
    customView?: (v: T) => JSXElement;
    compareKey?: (v?: T) => any;
}

export function Select<T extends any>(props: ParentProps<SelectProps<T>>) {

    const [ref, setRef] = createSignal<HTMLElement>();
    const [selectRef, setSelectRef] = createSignal<HTMLElement>();
    const [state, setState] = createStore<SelectState<T>>({
        value: props.value,
        show: props.show || false,
        compareKey: props.compareKey
    });

    createEffect(() => {
        if (props.show) {
            open();
        } else {
            close();
        }
    });

    const setValue = (v: T) => {
        setState('value', v);
        props.onValueChange?.(v);
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
        focusSelect();
    };

    const toggle = () => {
        setState('show', !state.show);
    };

    const focusSelect = () => {
        selectRef()?.focus();
    };

    const createView = (v: string) => {
        return <span>{v}</span>;
    };

    const selectValue = createMemo<JSXElement>(() => {
        const isCustom = !!props.customView;
        const value = state.value;

        if (isCustom && value) {
            return props.customView?.(value);
        }

        if (isObject(value)) {
            return createView((value as object).toString());
        }
        if (isArray(value)) {
            return (value as T[]).map(v => createView(v as string));
        }
        return createView(value as string);
    });

    const onKeyDown = (e: KeyboardEvent) => {
        switch (e.code) {
            case 'Space':
            case 'Enter':
                e.preventDefault();
                open();
                break;
            case 'Escape':
                e.preventDefault();
                close();
                break;
        }
    };

    return (
        <SelectContext.Provider value={{
            state,
            setValue,
            reset,
            open,
            close,
        }}>
            <div class="relative" ref={setRef}>
                <button
                    data-testid={TestSelectors.SELECT}
                    class="select"
                    tabIndex={1}
                    ref={setSelectRef}
                    onClick={toggle}
                    onKeyDown={onKeyDown}
                >
                    <span class="flex items-center" data-testid={TestSelectors.VALUE}>
                        <Show
                            when={state.value}
                            fallback={
                                <span data-testid={TestSelectors.PLACEHOLDER}>
                                    {props.placeholder} &nbsp;
                                </span>
                            }
                        >
                            {selectValue()}
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
