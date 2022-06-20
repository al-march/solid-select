import { ParentProps } from 'solid-js';

type Props = {
    onRemove?: () => void;
}

export const SelectValue = (props: ParentProps<Props>) => {
    const onClick = (e: Event) => {
        e.stopPropagation();
        props.onRemove?.();
    };

    return (
        <span class="inline-flex gap-2 rounded bg-sky-700 px-1 text-white">
            <button
                class="border-none transition-all"
                type="button"
                onClick={onClick}
            >
                &#x2715;
            </button>
            {props.children}
        </span>
    );
};
