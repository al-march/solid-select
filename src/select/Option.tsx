import { createMemo, ParentProps } from 'solid-js';
import { TestSelectors, useSelect } from './Select';

type OptionProps<T> = {
    value: T;
    disabled?: boolean;
    onCheck?: (v: T) => void;
}

export const Option = <T extends any>(props: ParentProps<OptionProps<T>>) => {
    const ctx = useSelect<T>();
    let ref: HTMLElement;

    const active = createMemo(() => ctx.state.value === props.value);

    const checkOption = () => {
        ctx.setValue(props.value);
        props.onCheck?.(props.value);
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
