import '@testing-library/jest-dom';

// Extend Jest matchers
declare global {
  namespace jest {
    interface Matchers<R> {
      toBeInTheDocument(): R;
      toBeVisible(): R;
      toBeDisabled(): R;
      toBeEnabled(): R;
      toBeChecked(): R;
      toHaveClass(className: string): R;
      toHaveAttribute(attr: string, value?: string): R;
      toHaveTextContent(text: string | RegExp): R;
      toHaveValue(value: string | string[] | number): R;
      toHaveDisplayValue(value: string | RegExp | (string | RegExp)[]): R;
      toBeInvalid(): R;
      toBeValid(): R;
      toHaveDescription(text?: string | RegExp): R;
      toHaveErrorMessage(text?: string | RegExp): R;
    }
  }
}
