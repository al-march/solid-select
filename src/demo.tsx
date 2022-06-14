import { Component } from 'solid-js';
import { Select } from './select/Select';
import { Option } from './select/Option';

export const App: Component = () => {

    function valueChange(v: number) {
        console.log(v);
    }

    return (
        <main class="p-2">
            <div class="max-w-xs mx-auto">
                <Select
                    placeholder="select your option"
                    onValueChange={valueChange}
                    value={4}
                >
                    <Option value={1}>Option 1</Option>
                    <Option value={2}>Option 2</Option>
                    <Option value={3}>Option 3</Option>
                    <Option value={4}>Option 4</Option>
                    <Option value={5}>Option 5</Option>
                    <Option value={6}>Option 6</Option>
                    <Option value={7}>Option 7</Option>
                </Select>
            </div>
        </main>
    );
};
