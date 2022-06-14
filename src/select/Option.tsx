import { createMemo, ParentProps } from 'solid-js';
import { useSelect } from './Select';

type OptionProps<T> = {
    value: T
}

export const Option = <T extends any>(props: ParentProps<OptionProps<T>>) => {
    const ctx = useSelect<T>();

    const active = createMemo(() => ctx.state.value === props.value);

    const checkOption = () => {
        if (ctx.state.value === props.value) {
            return;
        }
        ctx.setValue(props.value);
    };

    return (
        <li
            class="option"
            classList={{
                'option-active': active()
            }}
            onClick={checkOption}
        >
            <div class="flex items-center">
                {props.children}
            </div>
        </li>
    );
};
