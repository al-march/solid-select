import { createMemo, onMount, ParentProps } from 'solid-js';
import { useSelect } from './Select';

type OptionProps<T> = {
    value: T
}

export const Option = <T extends any>(props: ParentProps<OptionProps<T>>) => {
    const ctx = useSelect<T>();
    let ref: HTMLElement;

    const active = createMemo(() => ctx.state.value === props.value);

    onMount(() => {
        if (active()) {
            ref.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });

    const checkOption = () => {
        if (ctx.state.value === props.value) {
            return;
        }
        ctx.setValue(props.value);
    };

    return (
        <li
            ref={el => ref = el}
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
