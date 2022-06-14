import { Accessor, createEffect, createSignal, onCleanup, ParentProps, Show } from 'solid-js';
import { Portal } from 'solid-js/web';
import { usePopper } from './popper/usePopper';
import { Fade } from './assets/Fade';

type DropdownProps = {
    reference: Accessor<HTMLElement | undefined>;
    show: boolean;
}

export const Dropdown = (props: ParentProps<DropdownProps>) => {
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

    const close = () => setShow(false);

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
                    <Fade onDone={close}>
                        <Show when={props.show}>
                            <ul class="dropdown">
                                {props.children}
                            </ul>
                        </Show>
                    </Fade>
                </div>
            </Portal>
        </Show>
    );
};
