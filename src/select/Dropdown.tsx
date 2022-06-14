import { Accessor, createEffect, createSignal, onCleanup, ParentProps, Show } from 'solid-js';
import { Portal } from 'solid-js/web';
import { usePopper } from './popper/usePopper';

type DropdownProps = {
    reference: Accessor<HTMLElement | undefined>;
    show: boolean;
}

export const Dropdown = (props: ParentProps<DropdownProps>) => {
    const [show, setShow] = createSignal(props.show);
    const [dropdown, setDropdown] = createSignal<HTMLElement>();

    createEffect(() => {
        setShow(props.show);
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

    return (
        <Show when={show()}>
            <Portal>
                <div
                    ref={setDropdown}
                    class="z-50 inline-flex"
                    style={{'min-width': props.reference()?.offsetWidth + 'px'}}
                >
                    <ul class="dropdown">
                        {props.children}
                    </ul>
                </div>
            </Portal>
        </Show>
    );
};
