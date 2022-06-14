import { Component, For } from 'solid-js';
import { Select } from './select/Select';
import { Option } from './select/Option';

export const App: Component = () => {

    function valueChange(v: number) {
        console.log(v);
    }

    const options = new Array(20).fill(0);

    return (
        <main class="p-2">
            <div class="max-w-xs mx-auto">
                <Select
                    placeholder="select your option"
                    onValueChange={valueChange}
                    value={10}
                >
                    <For each={options}>
                        {(_, i) => (
                            <Option value={i() + 1}>Option {i() + 1}</Option>
                        )}
                    </For>
                </Select>
            </div>
        </main>
    );
};
