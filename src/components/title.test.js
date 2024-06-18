import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Title from './title';

describe('Title component', () => {
  test('renders with default title and description when no props are provided', () => {
    render(<Title />);
    const titleInput = screen.getByDisplayValue('Untitled Form');
    const descriptionInput = screen.getByPlaceholderText('Your description comes here');

    expect(titleInput).toBeInTheDocument();
    expect(descriptionInput).toBeInTheDocument();
    expect(descriptionInput.value).toBe('');
  });

  test('renders with provided title and description props', () => {
    render(<Title title="My Title" description="My Description" />);
    const titleInput = screen.getByDisplayValue('My Title');
    const descriptionInput = screen.getByDisplayValue('My Description');

    expect(titleInput).toBeInTheDocument();
    expect(descriptionInput).toBeInTheDocument();
  });

  test('updates title and description on input change', () => {
    const mockOnTitleChange = jest.fn();
    const mockOnDescriptionChange = jest.fn();
    render(<Title onTitleChange={mockOnTitleChange} onDescriptionChange={mockOnDescriptionChange} />);

    const titleInput = screen.getByDisplayValue('Untitled Form');
    const descriptionInput = screen.getByPlaceholderText('Your description comes here');

    fireEvent.change(titleInput, { target: { value: 'New Title' } });
    expect(titleInput.value).toBe('New Title');
    expect(mockOnTitleChange).toHaveBeenCalledWith('New Title');

    fireEvent.change(descriptionInput, { target: { value: 'New Description' } });
    expect(descriptionInput.value).toBe('New Description');
    expect(mockOnDescriptionChange).toHaveBeenCalledWith('New Description');
  });

  test('updates title and description when props change', () => {
    const { rerender } = render(<Title title="Initial Title" description="Initial Description" />);
    let titleInput = screen.getByDisplayValue('Initial Title');
    let descriptionInput = screen.getByDisplayValue('Initial Description');

    expect(titleInput).toBeInTheDocument();
    expect(descriptionInput).toBeInTheDocument();

    rerender(<Title title="Updated Title" description="Updated Description" />);
    titleInput = screen.getByDisplayValue('Updated Title');
    descriptionInput = screen.getByDisplayValue('Updated Description');

    expect(titleInput).toBeInTheDocument();
    expect(descriptionInput).toBeInTheDocument();
  });
});
