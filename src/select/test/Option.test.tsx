import { fireEvent, render, screen } from 'solid-testing-library';
import { Select, TestSelectors } from '../Select';
import { Option } from '../Option';
import { isChecked, isDisabled } from '../utils/utils';

describe('Option', () => {
    test('should be rendered', () => {
        render(() => (
            <Select show>
                <Option value={1}>1</Option>
            </Select>
        ));
        expect(screen.getByTestId(TestSelectors.OPTION)).toBeInTheDocument();
    });
    test('should be active', () => {
        render(() => (
            <Select show value={1}>
                <Option value={1}>1</Option>
            </Select>
        ));
        const option = screen.getByTestId(TestSelectors.OPTION);
        expect(isChecked(option)).toBeTruthy();
    });
    test('should be disabled', () => {
        render(() => (
            <Select show value={1}>
                <Option value={1} disabled>1</Option>
            </Select>
        ));
        const option = screen.getByTestId(TestSelectors.OPTION);
        expect(isDisabled(option as HTMLButtonElement)).toBeTruthy();
    });
    test('should emit onCheck by click', () => {
        const fn = jest.fn();
        render(() => (
            <Select show>
                <Option value={1} onCheck={fn}>1</Option>
            </Select>
        ));
        const option = screen.getByTestId(TestSelectors.OPTION);
        option.click();
        expect(fn).toBeCalled();
        expect(fn).toBeCalledWith(1);
    });
    test('should not emit onCheck if disabled', () => {
        const fn = jest.fn();
        render(() => (
            <Select show value={1}>
                <Option value={1} onCheck={fn} disabled>1</Option>
            </Select>
        ));
        const option = screen.getByTestId(TestSelectors.OPTION);
        option.click();
        expect(fn).not.toBeCalled();
    });
    test('should be checked by keyDown [enter]', () => {
        const fn = jest.fn();
        render(() => (
            <Select show value={1}>
                <Option value={1} onCheck={fn}>1</Option>
            </Select>
        ));
        const option = screen.getByTestId(TestSelectors.OPTION);
        fireEvent.keyDown(option, {
            code: 'Enter'
        });
        expect(fn).toBeCalled();
    });
    test('should be checked by keyDown [space]', () => {
        const fn = jest.fn();
        render(() => (
            <Select show value={1}>
                <Option value={1} onCheck={fn}>1</Option>
            </Select>
        ));
        const option = screen.getByTestId(TestSelectors.OPTION);
        fireEvent.keyDown(option, {
            code: 'Space'
        });
        expect(fn).toBeCalled();
    });
});
