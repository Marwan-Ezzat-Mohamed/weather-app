import React from "react";
import { render, fireEvent } from "@testing-library/react";
import NoteItem from "./NoteItem";

describe("NoteItem", () => {
  const note = {
    id: "1",
    content: "Test note content",
  };

  const onEditNoteMock = jest.fn();
  const onDeleteNoteMock = jest.fn();
  const onCancelEditMock = jest.fn();
  const onUpdateNoteMock = jest.fn();

  it("matches snapshot", () => {
    const { container } = render(
      <NoteItem
        note={note}
        onEditNote={onEditNoteMock}
        onDeleteNote={onDeleteNoteMock}
        onCancelEdit={onCancelEditMock}
        onUpdateNote={onUpdateNoteMock}
        setEditedNote={() => {}}
        isEditing={false}
      />
    );
    expect(container).toMatchSnapshot();
  });

  it("renders note content when not in edit mode", () => {
    const { getByText } = render(
      <NoteItem
        note={note}
        onEditNote={onEditNoteMock}
        onDeleteNote={onDeleteNoteMock}
        onCancelEdit={onCancelEditMock}
        onUpdateNote={onUpdateNoteMock}
        setEditedNote={() => {}}
        isEditing={false}
      />
    );

    const noteContentElement = getByText(note.content);
    expect(noteContentElement).toBeInTheDocument();
  });

  it("renders edit and delete buttons when not in edit mode", () => {
    const { getByTestId } = render(
      <NoteItem
        note={note}
        onEditNote={onEditNoteMock}
        onDeleteNote={onDeleteNoteMock}
        onCancelEdit={onCancelEditMock}
        onUpdateNote={onUpdateNoteMock}
        setEditedNote={() => {}}
        isEditing={false}
      />
    );

    const editButton = getByTestId(`edit-note-${note.id}`);
    const deleteButton = getByTestId(`delete-note-${note.id}`);

    expect(editButton).toBeInTheDocument();
    expect(deleteButton).toBeInTheDocument();
  });

  it("calls onEditNote when edit button is clicked", () => {
    const { getByTestId } = render(
      <NoteItem
        note={note}
        onEditNote={onEditNoteMock}
        onDeleteNote={onDeleteNoteMock}
        onCancelEdit={onCancelEditMock}
        onUpdateNote={onUpdateNoteMock}
        setEditedNote={() => {}}
        isEditing={false}
      />
    );

    const editButton = getByTestId(`edit-note-${note.id}`);
    fireEvent.click(editButton);

    expect(onEditNoteMock).toHaveBeenCalledWith(note.id, note.content);
  });

  it("calls onDeleteNote when delete button is clicked", () => {
    const { getByTestId } = render(
      <NoteItem
        note={note}
        onEditNote={onEditNoteMock}
        onDeleteNote={onDeleteNoteMock}
        onCancelEdit={onCancelEditMock}
        onUpdateNote={onUpdateNoteMock}
        setEditedNote={() => {}}
        isEditing={false}
      />
    );

    const deleteButton = getByTestId(`delete-note-${note.id}`);
    fireEvent.click(deleteButton);

    expect(onDeleteNoteMock).toHaveBeenCalledWith(note.id);
  });

  it("renders edit and cancel buttons when in edit mode", () => {
    const { getByTestId } = render(
      <NoteItem
        note={note}
        onEditNote={onEditNoteMock}
        onDeleteNote={onDeleteNoteMock}
        onCancelEdit={onCancelEditMock}
        onUpdateNote={onUpdateNoteMock}
        setEditedNote={() => {}}
        isEditing={true}
      />
    );

    const saveButton = getByTestId(`save-note-${note.id}`);
    const cancelButton = getByTestId(`cancel-edit-${note.id}`);

    expect(saveButton).toBeInTheDocument();
    expect(cancelButton).toBeInTheDocument();
  });

  it("calls onUpdateNote when save button is clicked in edit mode", () => {
    const { getByTestId } = render(
      <NoteItem
        note={note}
        onEditNote={onEditNoteMock}
        onDeleteNote={onDeleteNoteMock}
        onCancelEdit={onCancelEditMock}
        onUpdateNote={onUpdateNoteMock}
        setEditedNote={() => {}}
        isEditing={true}
      />
    );

    const saveButton = getByTestId(`save-note-${note.id}`);
    fireEvent.click(saveButton);

    expect(onUpdateNoteMock).toHaveBeenCalled();
  });

  it("calls onCancelEdit when cancel button is clicked in edit mode", () => {
    const { getByTestId } = render(
      <NoteItem
        note={note}
        onEditNote={onEditNoteMock}
        onDeleteNote={onDeleteNoteMock}
        onCancelEdit={onCancelEditMock}
        onUpdateNote={onUpdateNoteMock}
        setEditedNote={() => {}}
        isEditing={true}
      />
    );

    const cancelButton = getByTestId(`cancel-edit-${note.id}`);
    fireEvent.click(cancelButton);

    expect(onCancelEditMock).toHaveBeenCalled();
  });

  it("displays edited note content when in edit mode", () => {
    const editedNote = "Edited note content";
    const { getByText } = render(
      <NoteItem
        note={note}
        onEditNote={onEditNoteMock}
        onDeleteNote={onDeleteNoteMock}
        onCancelEdit={onCancelEditMock}
        onUpdateNote={onUpdateNoteMock}
        setEditedNote={() => {}}
        isEditing={true}
        editedNote={editedNote}
      />
    );

    const editedNoteContentElement = getByText(editedNote);
    expect(editedNoteContentElement).toBeInTheDocument();
  });

  it("displays the original note content when not in edit mode", () => {
    const editedNote = "Edited note content";
    const { getByText } = render(
      <NoteItem
        note={note}
        onEditNote={onEditNoteMock}
        onDeleteNote={onDeleteNoteMock}
        onCancelEdit={onCancelEditMock}
        onUpdateNote={onUpdateNoteMock}
        setEditedNote={() => {}}
        isEditing={false}
        editedNote={editedNote}
      />
    );

    const noteContentElement = getByText(note.content);
    expect(noteContentElement).toBeInTheDocument();
  });
});
