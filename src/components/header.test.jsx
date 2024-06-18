import { render, fireEvent, screen } from '@testing-library/react';
import Header from './header';
import "@testing-library/jest-dom";

describe('Header component', () => {
  test('renders all buttons', () => {
    render(
      <Header
        onAddQuestion={() => {}}
        onClickSaveOrDraft={() => {}}
        onClickPublish={() => {}}
        goToHome={() => {}}
        onClickPreview={() => {}}
      />
    );

    const publishButton = screen.getByText('Publish');
    const draftButton = screen.getByText('Draft');
    const previewButton = screen.getByText('Preview');
    const homeButton = screen.getByText('Home');
    const addQuestionButton = screen.getByText('Add Question');

    expect(publishButton).toBeInTheDocument();
    expect(draftButton).toBeInTheDocument();
    expect(previewButton).toBeInTheDocument();
    expect(homeButton).toBeInTheDocument();
    expect(addQuestionButton).toBeInTheDocument();
  });

  test('calls onClickPublish when Publish button is clicked', () => {
    const onClickPublishMock = jest.fn();
    render(
      <Header
        onAddQuestion={() => {}}
        onClickSaveOrDraft={() => {}}
        onClickPublish={onClickPublishMock}
        goToHome={() => {}}
        onClickPreview={() => {}}
      />
    );

    const publishButton = screen.getByText('Publish');
    fireEvent.click(publishButton);

    expect(onClickPublishMock).toHaveBeenCalled();
  });

  test('calls onClickSaveOrDraft when Draft button is clicked', () => {
    const onClickSaveOrDraftMock = jest.fn();
    render(
      <Header
        onAddQuestion={() => {}}
        onClickSaveOrDraft={onClickSaveOrDraftMock}
        onClickPublish={() => {}}
        goToHome={() => {}}
        onClickPreview={() => {}}
      />
    );

    const draftButton = screen.getByText('Draft');
    fireEvent.click(draftButton);

    expect(onClickSaveOrDraftMock).toHaveBeenCalled();
  });

  test('calls onClickPreview when Preview button is clicked', () => {
    const onClickPreviewMock = jest.fn();
    render(
      <Header
        onAddQuestion={() => {}}
        onClickSaveOrDraft={() => {}}
        onClickPublish={() => {}}
        goToHome={() => {}}
        onClickPreview={onClickPreviewMock}
      />
    );

    const previewButton = screen.getByText('Preview');
    fireEvent.click(previewButton);

    expect(onClickPreviewMock).toHaveBeenCalled();
  });

  test('calls goToHome when Home button is clicked', () => {
    const goToHomeMock = jest.fn();
    render(
      <Header
        onAddQuestion={() => {}}
        onClickSaveOrDraft={() => {}}
        onClickPublish={() => {}}
        goToHome={goToHomeMock}
        onClickPreview={() => {}}
      />
    );

    const homeButton = screen.getByText('Home');
    fireEvent.click(homeButton);

    expect(goToHomeMock).toHaveBeenCalled();
  });

  test('calls onAddQuestion when Add Question button is clicked', () => {
    const onAddQuestionMock = jest.fn();
    render(
      <Header
        onAddQuestion={onAddQuestionMock}
        onClickSaveOrDraft={() => {}}
        onClickPublish={() => {}}
        goToHome={() => {}}
        onClickPreview={() => {}}
      />
    );

    const addQuestionButton = screen.getByText('Add Question');
    fireEvent.click(addQuestionButton);

    expect(onAddQuestionMock).toHaveBeenCalled();
  });
});
