import { createPopper, Instance, Options } from '@popperjs/core';
import { Accessor, createEffect, createSignal, onCleanup } from 'solid-js';

export const usePopper = (
    refAccessor: Accessor<HTMLElement | undefined | null>,
    popperAccessor: Accessor<HTMLElement | undefined | null>,
    options: Partial<Options> = {}
): Accessor<Instance | undefined> => {
    const [instance, setInstance] = createSignal<Instance>();

    createEffect(() => {
        setInstance(undefined);
        const ref = refAccessor();
        const popper = popperAccessor();

        if (ref && popper) {
            const instance = createPopper(ref, popper, options);
            setInstance(instance);

            onCleanup(() => {
                instance.destroy();
            });
        }
    });

    return instance;
};
