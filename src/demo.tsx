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
                    value={-1}
                >
                    <Option
                        value={-1}
                    >
                        <div class="inline-flex flex-col items-start max-w-xs">
                            <strong>Lorem ipsum.</strong>
                            <span class="inline-block w-full truncate">Lorem ipsum dolor sit amet, consectetur adipisicing elit.!</span>
                        </div>
                    </Option>
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
