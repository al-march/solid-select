import { createMemo, ParentProps } from 'solid-js';
import { TestSelectors, useSelect } from './Select';

type OptionProps<T> = {
    value: T;
    disabled?: boolean;
}

export const Option = <T extends any>(props: ParentProps<OptionProps<T>>) => {
    const ctx = useSelect<T>();
    let ref: HTMLElement;

    const active = createMemo(() => ctx.state.value === props.value);

    const checkOption = () => {
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
