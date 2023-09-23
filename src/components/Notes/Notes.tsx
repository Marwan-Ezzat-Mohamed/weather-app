import React, { useState } from "react";
import { BiSave } from "react-icons/bi";
import { Button } from "@components/common/Button";
import { Textarea } from "@components/common/TextArea";
import { Note } from "@/types";
import { NoteItem } from "./NoteItem";
interface NotesSectionProps {
  notes: Note[] | undefined;
  onSaveNote: (note: string) => void;
  onEditNote: (noteId: string, content: string) => void;
  onDeleteNote: (noteId: string) => void;
}

const Notes: React.FC<NotesSectionProps> = ({
  notes,
  onSaveNote,
  onEditNote,
  onDeleteNote,
}) => {
  const [note, setNote] = useState<string>("");
  const [editNoteId, setEditNoteId] = useState<string | null>(null);
  const [editedNote, setEditedNote] = useState<string>("");

  const handleSaveNote = () => {
    if (!note) return;
    onSaveNote(note);
    setNote("");
  };

  const handleCancelEdit = () => {
    setEditNoteId(null);
    setNote("");
    setEditedNote("");
  };

  const handleUpdateNote = () => {
    if (!editedNote || !editNoteId) return;
    onEditNote(editNoteId, editedNote);
    setEditNoteId(null);
    setNote("");
  };

  const onEditNoteClick = (noteId: string, content: string) => {
    setEditNoteId(noteId);
    setEditedNote(content);
  };

  return (
    <div className="w-full space-y-2">
      <h1 className="text-3xl font-semibold text-gray-700 dark:text-gray-200">
        Notes
      </h1>
      <div className="flex items-end rounded bg-slate-100 p-1 dark:bg-secondary">
        <Textarea
          className="w-full resize-none bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0"
          placeholder="Write some notes"
          rows={2}
          value={note}
          onChange={(e) => setNote(e.target.value)}
        />
        <Button
          variant="ghost"
          className="p-0 text-3xl text-primary"
          onClick={handleSaveNote}
          data-testid="save-note"
        >
          <BiSave />
        </Button>
      </div>

      <div className="flex flex-wrap justify-start gap-2">
        {notes?.map((note) => (
          <NoteItem
            key={note.id}
            note={note}
            onEditNote={onEditNoteClick}
            onDeleteNote={onDeleteNote}
            onCancelEdit={handleCancelEdit}
            onUpdateNote={handleUpdateNote}
            setEditedNote={setEditedNote}
            isEditing={editNoteId === note.id}
            editedNote={editedNote}
          />
        ))}
      </div>
    </div>
  );
};

export default Notes;
