import React from "react";
import { render, fireEvent, getByTestId } from "@testing-library/react";
import Notes from "./Notes";

describe("Notes", () => {
  const notes = [
    { id: "1", content: "Note 1" },
    { id: "2", content: "Note 2" },
    { id: "3", content: "Note 3" },
  ];

  const onSaveNoteMock = jest.fn();
  const onEditNoteMock = jest.fn();
  const onDeleteNoteMock = jest.fn();

  it("renders notes section with a title", () => {
    const { getByText } = render(
      <Notes
        notes={notes}
        onSaveNote={onSaveNoteMock}
        onEditNote={onEditNoteMock}
        onDeleteNote={onDeleteNoteMock}
      />
    );

    const titleElement = getByText("Notes");
    expect(titleElement).toBeInTheDocument();
  });

  it("renders a textarea for adding new notes", () => {
    const { getByPlaceholderText } = render(
      <Notes
        notes={notes}
        onSaveNote={onSaveNoteMock}
        onEditNote={onEditNoteMock}
        onDeleteNote={onDeleteNoteMock}
      />
    );

    const textareaElement = getByPlaceholderText("Write some notes");
    expect(textareaElement).toBeInTheDocument();
  });

  it("calls onSaveNote when save button is clicked", () => {
    const { getByTestId, getByPlaceholderText } = render(
      <Notes
        notes={notes}
        onSaveNote={onSaveNoteMock}
        onEditNote={onEditNoteMock}
        onDeleteNote={onDeleteNoteMock}
      />
    );

    const textareaElement = getByPlaceholderText("Write some notes");
    fireEvent.change(textareaElement, { target: { value: "New Note" } });

    const saveButton = getByTestId("save-note");
    fireEvent.click(saveButton);

    expect(onSaveNoteMock).toHaveBeenCalledWith("New Note");
  });

  it("renders note items for each note in the list", () => {
    const { getAllByTestId } = render(
      <Notes
        notes={notes}
        onSaveNote={onSaveNoteMock}
        onEditNote={onEditNoteMock}
        onDeleteNote={onDeleteNoteMock}
      />
    );

    const noteItems = getAllByTestId(/^textarea-/);
    expect(noteItems.length).toBe(notes.length);
  });

  it("calls onEditNote when edit button is clicked", () => {
    const { getByTestId } = render(
      <Notes
        notes={notes}
        onSaveNote={onSaveNoteMock}
        onEditNote={onEditNoteMock}
        onDeleteNote={onDeleteNoteMock}
      />
    );

    const editButton = getByTestId("edit-note-1");
    fireEvent.click(editButton);

    const saveButton = getByTestId("save-note-1");
    fireEvent.click(saveButton);

    expect(onEditNoteMock).toHaveBeenCalledWith("1", "Note 1");
  });

  it("calls onDeleteNote when delete button is clicked", () => {
    const { getByTestId } = render(
      <Notes
        notes={notes}
        onSaveNote={onSaveNoteMock}
        onEditNote={onEditNoteMock}
        onDeleteNote={onDeleteNoteMock}
      />
    );

    const deleteButton = getByTestId("delete-note-1");
    fireEvent.click(deleteButton);

    expect(onDeleteNoteMock).toHaveBeenCalledWith("1");
  });

  it("does not call onEditNote when cancel button is clicked in edit mode", () => {
    const { getByTestId } = render(
      <Notes
        notes={notes}
        onSaveNote={onSaveNoteMock}
        onEditNote={onEditNoteMock}
        onDeleteNote={onDeleteNoteMock}
      />
    );

    const editButton = getByTestId("edit-note-1");
    fireEvent.click(editButton);

    const cancelButton = getByTestId("cancel-edit-1");
    fireEvent.click(cancelButton);

    expect(onEditNoteMock).not.toHaveBeenCalled();
  });

  it("calls onUpdateNote when save button is clicked in edit mode", () => {
    const { getByTestId } = render(
      <Notes
        notes={notes}
        onSaveNote={onSaveNoteMock}
        onEditNote={onEditNoteMock}
        onDeleteNote={onDeleteNoteMock}
      />
    );

    const editButton = getByTestId("edit-note-1");
    fireEvent.click(editButton);

    const saveButton = getByTestId("save-note-1");
    fireEvent.click(saveButton);

    expect(onEditNoteMock).toHaveBeenCalledWith("1", "Note 1");
  });

  it("displays edited note content when in edit mode", () => {
    const { getByTestId } = render(
      <Notes
        notes={notes}
        onSaveNote={onSaveNoteMock}
        onEditNote={onEditNoteMock}
        onDeleteNote={onDeleteNoteMock}
      />
    );

    const editButton = getByTestId("edit-note-1");
    fireEvent.click(editButton);

    const textareaElement = getByTestId("textarea-1");
    fireEvent.change(textareaElement, { target: { value: "Edited Note" } });

    const saveButton = getByTestId("save-note-1");
    fireEvent.click(saveButton);

    expect(onEditNoteMock).toHaveBeenCalledWith("1", "Edited Note");
  });
});
