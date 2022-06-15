import { createMemo, ParentProps } from 'solid-js';
import { TestSelectors, useSelect } from './Select';
import { isObject } from './utils/utils';

type OptionProps<T> = {
    value: T;
    disabled?: boolean;
    onCheck?: (v: T) => void;
}

export const Option = <T extends any>(props: ParentProps<OptionProps<T>>) => {
    const ctx = useSelect<T>();
    let ref: HTMLElement;

    const active = createMemo(() => {
        if (ctx.state.compareKey) {
            return ctx.state.compareKey(ctx.state.value) === ctx.state.compareKey(props.value);
        }
        return ctx.state.value === props.value;
    });

    const checkOption = () => {
        let value: any = props.value;
        if (isObject(props.value)) {
            value = {...props.value as object};
        }
        ctx.setValue(value);
        props.onCheck?.(value);
    };

    const onKeyDown = (e: KeyboardEvent) => {
        switch (e.code) {
            case 'Space':
            case 'Enter':
                e.preventDefault();
                checkOption();
                break;
        }
    };

    return (
        <button
            data-testid={TestSelectors.OPTION}
            ref={el => ref = el}
            tabIndex={0}
            class="option"
            classList={{
                'option-active': active(),
            }}
            disabled={!!props.disabled}
            onClick={checkOption}
            onKeyDown={onKeyDown}
        >
            {props.children}
        </button>
    );
};
