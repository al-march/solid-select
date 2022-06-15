import {
    Accessor,
    children,
    createEffect,
    createSignal,
    on,
    onMount,
    ParentProps,
    Show
} from 'solid-js';
import { Portal } from 'solid-js/web';
import { usePopper } from './popper/usePopper';
import { Fade } from './assets/Fade';
import { TestSelectors, useSelect } from './Select';
import { findOption, isArray, isChecked } from './utils/utils';

type DropdownProps = {
    reference: Accessor<HTMLElement | undefined>;
    show: boolean;
}

export const Dropdown = (props: ParentProps<DropdownProps>) => {
    const select = useSelect();
    const [show, setShow] = createSignal();
    const [dropdown, setDropdown] = createSignal<HTMLElement>();

    onMount(() => usePopper(props.reference, dropdown, {
        modifiers: [{
            name: 'offset',
            options: {
                offset: [0, 4],
            },
        }]
    }));

    createEffect(() => {
        if (props.show) {
            setShow(true);
        }
    });

    createEffect(on(show, (isShow) => {
        const items = options();
        const opts = isArray(items) ? items : [items];
        isShow && focusOption(opts as HTMLButtonElement[]);
    }, {defer: true}));

    const options = children(() => props.children);

    const focusOption = (options: HTMLButtonElement[]) => {
        if (!(options && !!options.length)) {
            return;
        }
        const option = findCheckedOption(options);
        option?.focus();
    };

    const findCheckedOption = (options: HTMLButtonElement[]) => {
        for (let option of options) {
            if (isChecked(option)) {
                return option;
            }
        }
        return options[0];
    };

    const close = () => setShow(false);

    const onKeyDown = (e: KeyboardEvent) => {
        const option = e.target as HTMLButtonElement;
        switch (e.code) {
            case 'Escape':
                e.preventDefault();
                select.close();
                break;
            case 'ArrowDown':
                e.preventDefault();
                const nextOption = findOption(option, 'next');
                nextOption?.focus();
                break;
            case 'ArrowUp':
                e.preventDefault();
                const prevOption = findOption(option, 'prev');
                prevOption?.focus();
                break;
        }
    };

    return (
        <Show when={show()}>
            <Portal>
                <div
                    ref={setDropdown}
                    class="z-50 inline-flex"
                    style={{'min-width': props.reference()?.offsetWidth + 'px'}}
                >
                    <Fade onDone={close}>
                        <Show when={props.show}>
                            <div
                                data-testid={TestSelectors.DROPDOWN}
                                class="dropdown"
                                onKeyDown={onKeyDown}
                            >
                                {options()}
                            </div>
                        </Show>
                    </Fade>
                </div>
            </Portal>
        </Show>
    );
};
