import { fireEvent, getByTestId, render, screen } from 'solid-testing-library';
import { Select, SelectProps, TestSelectors } from '../Select';
import { For } from 'solid-js';
import { Option } from '../Option';
import { tick } from '../utils/utils';

const options = new Array(10).fill(0);

const TestSelect = (props: SelectProps<any>) => (
    <Select {...props}>
        <For each={options}>{
            opt => <Option value={opt}>{opt}</Option>
        }</For>
    </Select>
);

describe('Select', () => {
    test('should rendered', () => {
        render(() => <TestSelect/>);
        expect(screen.getByTestId(TestSelectors.SELECT)).toBeInTheDocument();
    });
    test('should be opened by props', () => {
        render(() => <TestSelect show/>);
        expect(screen.getByTestId(TestSelectors.DROPDOWN)).toBeInTheDocument();
    });
    test('should be opened dropdown by click', () => {
        render(() => <TestSelect/>);
        const select = screen.getByTestId(TestSelectors.SELECT);
        select.click();
        expect(getByTestId(document.body, TestSelectors.DROPDOWN)).toBeInTheDocument();
    });
    test('should be opened by enter key down', async () => {
        render(() => <TestSelect/>);
        const select = screen.getByTestId(TestSelectors.SELECT);
        fireEvent.keyDown(select, {
            code: 'Enter',
        });
        expect(getByTestId(document.body, TestSelectors.DROPDOWN)).toBeInTheDocument();
    });
    test('should by closed by esc', async () => {
        render(() => <TestSelect show/>);
        const dropdown = screen.getByTestId(TestSelectors.DROPDOWN);
        dropdown.focus();
        fireEvent.keyDown(dropdown, {
            code: 'Escape',
        });
        await tick();
        expect(dropdown).not.toBeInTheDocument();
    });
    test('should show placeholder', () => {
        const placeholder = 'placeholder';
        render(() => <TestSelect placeholder={placeholder}/>);
        expect(screen.getByTestId(TestSelectors.PLACEHOLDER)).toHaveTextContent(placeholder);
    });
    test('should close dropdown if option is checked', async () => {
        render(() => (
            <Select show={true}>
                <Option value={1}>1</Option>
            </Select>
        ));
        const dropdown = screen.getByTestId(TestSelectors.DROPDOWN);
        const [option] = screen.getAllByTestId(TestSelectors.OPTION);
        option.click();
        await tick();
        expect(dropdown).not.toBeInTheDocument();
    });
    test('should emit event if option is selected', () => {
        const fn = jest.fn();
        render(() => (
            <Select show={true} onValueChange={fn}>
                <Option value={2}>2</Option>
            </Select>
        ));
        const [option] = screen.getAllByTestId(TestSelectors.OPTION);
        option.click();
        expect(fn).toBeCalled();
        expect(fn).toBeCalledWith(2);
    });
    test('should show value if it is not empty', () => {
        const value = 'value';
        render(() => (
            <Select value={value}/>
        ));
        expect(screen.getByTestId(TestSelectors.VALUE)).toHaveTextContent(value);
    });
    test('should set new value if option is checked', () => {
        const value = 'new value';
        render(() => (
            <Select show={true}>
                <Option value={value}></Option>
            </Select>
        ));
        const [option] = screen.getAllByTestId(TestSelectors.OPTION);
        option.click();
        expect(screen.getByTestId(TestSelectors.VALUE)).toHaveTextContent(value);
    });
});
