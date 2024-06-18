import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import CheckBox from "./checkbox";
import "@testing-library/jest-dom";

describe('CheckBox Component', () => {
  const defaultProps = {
    defaultValue: 'Test',
    handleEdit: jest.fn(),
    onDelete: jest.fn(),
    isDeleteButtonDisable: false,
  };

  it('should render the component with default props', () => {
    render(<CheckBox {...defaultProps} />);
    
    expect(screen.getByPlaceholderText('Option')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Option').value).toBe(defaultProps.defaultValue);
    expect(screen.getByRole('checkbox')).toBeInTheDocument();
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('should change the input value and call handleEdit', () => {
    render(<CheckBox {...defaultProps} />);
    
    const input = screen.getByPlaceholderText('Option');
    fireEvent.change(input, { target: { value: 'New Value' } });
    
    expect(input.value).toBe('New Value');
    expect(defaultProps.handleEdit).toHaveBeenCalledWith('New Value');
  });

  it('should conditionally render the delete button', () => {
    const { rerender } = render(<CheckBox {...defaultProps} isDeleteButtonDisable={true} />);
    
    expect(screen.queryByRole('button')).not.toBeInTheDocument();
    
    rerender(<CheckBox {...defaultProps} isDeleteButtonDisable={false} />);
    
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('should call onDelete when delete button is clicked', () => {
    render(<CheckBox {...defaultProps} />);
    
    const button = screen.getByRole('button');
    fireEvent.click(button);
    
    expect(defaultProps.onDelete).toHaveBeenCalled();
  });
});
