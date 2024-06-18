import React from "react";
import { render, fireEvent } from "@testing-library/react";
import Text from "./text";
import "@testing-library/jest-dom";

describe("Text Component", () => {
  const defaultProps = {
    handleEdit: jest.fn()
  };
  test("renders without crashing", () => {
    render(
      <Text
        defaultValue=""
        placeholder="Enter text"
        handleEdit={() => {}}
        onDelete={() => {}}
        forCheckBox={false}
      />
    );
  });

  test("updates input value correctly when changed", () => {
    const { getByPlaceholderText } = render(
      <Text
        defaultValue=""
        placeholder="Enter text"
        handleEdit={() => {}}
        onDelete={() => {}}
        forCheckBox={false}
      />
    );

    const inputField = getByPlaceholderText("Enter text");
    fireEvent.change(inputField, { target: { value: "New Value" } });

    expect(inputField.value).toBe("New Value");
  });

  test("calls handleEdit function with correct value when input value changes", () => {
    const { getByPlaceholderText } = render(
      <Text
        {...defaultProps}
        defaultValue=""
        placeholder="Enter text"
        onDelete={() => {}}
        forCheckBox={true}
      />
    );

    const inputField = getByPlaceholderText("Enter text");

    expect(inputField).toBeInTheDocument();

    fireEvent.change(inputField, { target: { value: "New Value" } });

    expect(defaultProps.handleEdit).toHaveBeenCalledWith("New Value");
    expect(inputField.value).toBe("New Value");
  });

  test("renders delete button when forCheckBox is true", () => {
    const { getByRole } = render(
      <Text
        defaultValue=""
        placeholder="Enter text"
        handleEdit={() => {}}
        onDelete={() => {}}
        forCheckBox={true}
      />
    );

    const deleteButton = document.querySelector(".deletebt");
    expect(deleteButton).toBeInTheDocument();
  });

  test("does not render delete button when forCheckBox is false", () => {
    const { queryByRole } = render(
      <Text
        defaultValue=""
        placeholder="Enter text"
        handleEdit={() => {}}
        onDelete={() => {}}
        forCheckBox={false}
      />
    );

    const deleteButton = queryByRole("button", { name: "Delete" });
    expect(deleteButton).not.toBeInTheDocument();
  });
});
