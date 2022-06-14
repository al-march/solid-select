import { ParentProps } from 'solid-js';

export const Dropdown = (props: ParentProps) => {
    return (
        <ul class="dropdown">
            {props.children}
        </ul>
    );
};
