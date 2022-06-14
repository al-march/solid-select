import { ParentProps } from 'solid-js';
import { Transition } from 'solid-transition-group';

type Props = {
    onDone?: () => void;
}

export const Fade = (props: ParentProps<Props>) => {
    return (
        <Transition
            appear={true}
            onBeforeEnter={(el) => ((el as HTMLElement).style.opacity = '0')}
            onEnter={(el, done) => {
                const a = el.animate?.([{
                    opacity: 0,
                    transform: 'scale(0.8) translateY(-20px)',
                }, {
                    opacity: 1,
                    transform: 'scale(1) translateX(0) translateY(0)'
                }], {
                    duration: 140,
                    easing: 'cubic-bezier(0, 0, 0.2, 1)'
                }).finished || Promise.resolve();
                a.then(done);
            }}
            onAfterEnter={(el) => ((el as HTMLElement).style.opacity = '1')}
            onExit={(el, done) => {
                const a = el.animate?.([{
                    opacity: 1,
                }, {
                    opacity: 0,
                }], {
                    duration: 100,
                    easing: 'linear'
                }).finished || Promise.resolve();
                a.then(() => {
                    props.onDone?.();
                    done();
                });
            }}
        >
            {props.children}
        </Transition>
    );
};
