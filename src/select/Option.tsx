import { createMemo, onMount, ParentProps } from 'solid-js';
import { TestSelectors, useSelect } from './Select';

type OptionProps<T> = {
    value: T
}

export const Option = <T extends any>(props: ParentProps<OptionProps<T>>) => {
    const ctx = useSelect<T>();
    let ref: HTMLElement;

    const active = createMemo(() => ctx.state.value === props.value);

    onMount(() => {
        if (active()) {
            ref.focus();
        }
    });

    const checkOption = () => {
        if (ctx.state.value === props.value) {
            return;
        }
        ctx.setValue(props.value);
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
        <li
            data-testid={TestSelectors.OPTION}
            ref={el => ref = el}
            tabIndex={0}
            class="option"
            classList={{
                'option-active': active()
            }}
            onClick={checkOption}
            onKeyDown={onKeyDown}
        >
            <div class="flex items-center">
                {props.children}
            </div>
        </li>
    );
};
