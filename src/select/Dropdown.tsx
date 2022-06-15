import { Accessor, createEffect, createSignal, onCleanup, ParentProps, Show } from 'solid-js';
import { Portal } from 'solid-js/web';
import { usePopper } from './popper/usePopper';
import { Fade } from './assets/Fade';
import { TestSelectors, useSelect } from './Select';

type DropdownProps = {
    reference: Accessor<HTMLElement | undefined>;
    show: boolean;
}

export const Dropdown = (props: ParentProps<DropdownProps>) => {
    const select = useSelect();
    const [show, setShow] = createSignal(props.show);
    const [dropdown, setDropdown] = createSignal<HTMLElement>();

    createEffect(() => {
        if (props.show) {
            setShow(true);
        }
    });

    onCleanup(() => {
        instance()?.destroy();
    });

    const instance = usePopper(props.reference, dropdown, {
        modifiers: [{
            name: 'offset',
            options: {
                offset: [0, 8],
            },
        }]
    });

    const close = () => setShow(false);

    const onKeyDown = (e: KeyboardEvent) => {
        const option = e.target as HTMLElement;
        switch (e.code) {
            case 'Escape':
                e.preventDefault();
                select.close();
                break;
            case 'ArrowDown':
                e.preventDefault();
                const nextOption = option.nextElementSibling as HTMLElement;
                nextOption?.focus();
                break;
            case 'ArrowUp':
                e.preventDefault();
                const prevOption = option.previousElementSibling as HTMLElement;
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
                            <ul data-testid={TestSelectors.DROPDOWN} class="dropdown" onKeyDown={onKeyDown}>
                                {props.children}
                            </ul>
                        </Show>
                    </Fade>
                </div>
            </Portal>
        </Show>
    );
};
