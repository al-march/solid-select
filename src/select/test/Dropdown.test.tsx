import { fireEvent, render, screen } from 'solid-testing-library';
import { Select, TestSelectors } from '../Select';
import { tick } from '../utils/utils';
import { createSignal } from 'solid-js';
import { Option } from '../Option';

describe('Dropdown', () => {
    test('should render', () => {
        render(() => <Select show/>);
        expect(screen.getByTestId(TestSelectors.DROPDOWN)).toBeInTheDocument();
    });
    test('should toggle by prop', async () => {
        const [show, setShow] = createSignal(true);
        render(() => <Select show={show()}/>);
        const dropdown = screen.getByTestId(TestSelectors.DROPDOWN);
        expect(dropdown).toBeInTheDocument();
        setShow(false);
        await tick();
        expect(dropdown).not.toBeInTheDocument();
    });
    test('should focus active option', async () => {
        render(() => (
            <Select value={2} show>
                <Option value={2}>2</Option>
            </Select>
        ));
        const option = screen.getByTestId(TestSelectors.OPTION);
        expect(option).toHaveFocus();
    });
    test('should focus first option by default', () => {
        render(() => (
            <Select show>
                <Option value={1}>1</Option>
                <Option value={2}>2</Option>
            </Select>
        ));
        const [option] = screen.getAllByTestId(TestSelectors.OPTION);
        expect(option).toHaveFocus();
    })
    test('should focus option by arrows', async () => {
        render(() => (
            <Select value={1} show>
                <Option value={1}>1</Option>
                <Option value={2}>2</Option>
            </Select>
        ));
        const options = screen.getAllByTestId(TestSelectors.OPTION);
        let option = options.find(opt => opt === document.activeElement);
        expect(option).toBeInTheDocument();

        fireEvent.keyDown(option!, {
            code: 'ArrowDown'
        });

        option = options.find(opt => opt === document.activeElement);
        expect(option).toBeInTheDocument();
        expect(option).toHaveTextContent('2');

        fireEvent.keyDown(option!, {
            code: 'ArrowUp'
        });

        option = options.find(opt => opt === document.activeElement);
        expect(option).toBeInTheDocument();
        expect(option).toHaveTextContent('1');
    });
});
