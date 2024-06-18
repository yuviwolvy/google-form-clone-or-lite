import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import TextArea from './textarea';

describe('TextArea component', () => {
  test('renders the textarea element', () => {
    render(<TextArea />);
    const textareaElement = screen.getByRole('textbox');
    expect(textareaElement).toBeInTheDocument();
  });

  test('has the correct placeholder text', () => {
    render(<TextArea />);
    const textareaElement = screen.getByPlaceholderText('Long answer text');
    expect(textareaElement).toBeInTheDocument();
  });

  test('has the correct class names', () => {
    render(<TextArea />);
    const textareaElement = screen.getByRole('textbox');
    expect(textareaElement).toHaveClass('bg-transparent w-full border-b-2');
  });

  test('has the correct number of rows', () => {
    render(<TextArea />);
    const textareaElement = screen.getByRole('textbox');
    expect(textareaElement).toHaveAttribute('rows', '1');
  });
});
