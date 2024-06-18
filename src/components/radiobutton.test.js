import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import RadioButton from './radiobutton';
import "@testing-library/jest-dom";

describe('RadioButton Component', () => {
  test('renders without crashing', () => {
    render(
      <RadioButton
        defaultValue=""
        handleEdit={() => {}}
        onDelete={() => {}}
        isDeleteButtonDisable={true}
      />
    );
  });

  test('updates input value correctly when changed', () => {
    const { getByPlaceholderText } = render(
      <RadioButton
        defaultValue=""
        handleEdit={() => {}}
        onDelete={() => {}}
        isDeleteButtonDisable={true}
      />
    );

    const inputField = getByPlaceholderText('Option');
    fireEvent.change(inputField, { target: { value: 'New Option' } });

    expect(inputField.value).toBe('New Option');
  });

  test('calls handleEdit function with correct value when input value changes', () => {
    const mockHandleEdit = jest.fn();
    const { getByPlaceholderText } = render(
      <RadioButton
        defaultValue=""
        handleEdit={mockHandleEdit}
        onDelete={() => {}}
        isDeleteButtonDisable={true}
      />
    );

    const inputField = getByPlaceholderText('Option');
    fireEvent.change(inputField, { target: { value: 'New Option' } });

    expect(mockHandleEdit).toHaveBeenCalledWith('New Option');
  });

  test('renders and enables delete button when isDeleteButtonDisable is false', () => {
    const { getByRole } = render(
      <RadioButton
        defaultValue=""
        handleEdit={() => {}}
        onDelete={() => {}}
        isDeleteButtonDisable={false}
      />
    );

    const deleteButton = document.querySelector(".deletebt");
    expect(deleteButton).toBeInTheDocument();
    expect(deleteButton).toBeEnabled();
  });

  test('does not render delete button when isDeleteButtonDisable is true', () => {
    const { queryByRole } = render(
      <RadioButton
        defaultValue=""
        handleEdit={() => {}}
        onDelete={() => {}}
        isDeleteButtonDisable={true}
      />
    );

    const deleteButton = queryByRole('button', { name: 'Delete' });
    expect(deleteButton).not.toBeInTheDocument();
  });
});
