import { render, fireEvent, screen } from "@testing-library/react";
import Notes from "./Notes";

describe("Notes Component", () => {
  const sampleNotes = [
    { id: "1", content: "Note 1" },
    { id: "2", content: "Note 2" },
  ];

  const onSaveNoteMock = jest.fn();
  const onEditNoteMock = jest.fn();
  const onDeleteNoteMock = jest.fn();

  beforeEach(() => {
    onSaveNoteMock.mockClear();
    onEditNoteMock.mockClear();
    onDeleteNoteMock.mockClear();
  });

  it("renders the component with initial notes", () => {
    render(
      <Notes
        notes={sampleNotes}
        onSaveNote={onSaveNoteMock}
        onEditNote={onEditNoteMock}
        onDeleteNote={onDeleteNoteMock}
      />
    );

    // Ensure that initial notes are rendered
    expect(screen.getByText("Note 1")).toBeInTheDocument();
    expect(screen.getByText("Note 2")).toBeInTheDocument();
  });

  it("handles saving a new note", () => {
    render(
      <Notes
        notes={sampleNotes}
        onSaveNote={onSaveNoteMock}
        onEditNote={onEditNoteMock}
        onDeleteNote={onDeleteNoteMock}
      />
    );

    // Type a new note
    const input = screen.getByPlaceholderText("Write some notes");
    fireEvent.change(input, { target: { value: "New Note" } });

    // Click the "Save" button
    const saveButton = screen.getByText("Save");
    fireEvent.click(saveButton);

    // Ensure that onSaveNoteMock was called with the new note
    expect(onSaveNoteMock).toHaveBeenCalledWith("New Note");

    // Ensure that the input field is cleared
    expect(input).toHaveValue("");
  });

  it("handles editing a note", () => {
    render(
      <Notes
        notes={sampleNotes}
        onSaveNote={onSaveNoteMock}
        onEditNote={onEditNoteMock}
        onDeleteNote={onDeleteNoteMock}
      />
    );

    // Click the "Edit" button of the first note
    const editButton = screen.getAllByText("Edit")[0];
    fireEvent.click(editButton);

    // Modify the content of the first note
    const editableNote = screen.getByDisplayValue("Note 1");
    fireEvent.change(editableNote, { target: { value: "Edited Note" } });

    // Click the "Update" button
    const updateButton = screen.getAllByText("Update")[0];
    fireEvent.click(updateButton);

    // Ensure that onEditNoteMock was called with the edited content
    expect(onEditNoteMock).toHaveBeenCalledWith("1", "Edited Note");
  });

  it("handles deleting a note", () => {
    render(
      <Notes
        notes={sampleNotes}
        onSaveNote={onSaveNoteMock}
        onEditNote={onEditNoteMock}
        onDeleteNote={onDeleteNoteMock}
      />
    );

    // Click the "Delete" button of the first note
    const deleteButton = screen.getAllByText("Delete")[0];
    fireEvent.click(deleteButton);

    // Ensure that onDeleteNoteMock was called with the correct note id
    expect(onDeleteNoteMock).toHaveBeenCalledWith("1");
  });

  it("handles cancelling edit", () => {
    render(
      <Notes
        notes={sampleNotes}
        onSaveNote={onSaveNoteMock}
        onEditNote={onEditNoteMock}
        onDeleteNote={onDeleteNoteMock}
      />
    );

    // Click the "Edit" button of the first note
    const editButton = screen.getAllByText("Edit")[0];
    fireEvent.click(editButton);

    // Modify the content of the first note
    const editableNote = screen.getByDisplayValue("Note 1");
    fireEvent.change(editableNote, { target: { value: "Edited Note" } });

    // Click the "Cancel" button
    const cancelButton = screen.getAllByText("Cancel")[0];
    fireEvent.click(cancelButton);

    // Ensure that the note content is reverted back to the original
    expect(screen.getByText("Note 1")).toBeInTheDocument();
  });
});
