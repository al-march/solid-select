import { Component, For } from 'solid-js';
import { Select } from './select/Select';
import { Option } from './select/Option';
import { COUNTRIES, Country } from './countries.mock';

export const App: Component = () => {

    function valueChange(v: Country) {
        console.log(v);
    }

    return (
        <main class="p-2">
            <div style="width: 240px" class="max-w-xs mx-auto">
                <Select<Country>
                    placeholder="select your option"
                    onValueChange={valueChange}
                    compareKey={v => v?.name}
                    customView={v => (
                        <span class="text-left truncate">
                            {v.unicodeFlag} {v.iso2}
                        </span>
                    )}
                >
                    <For each={COUNTRIES}>
                        {(country) => (
                            <Option value={country}>
                                <span style="width: 200px" class="text-left truncate">
                                    {country.unicodeFlag} {country.name}
                                </span>
                            </Option>
                        )}
                    </For>
                </Select>
            </div>
        </main>
    );
};
