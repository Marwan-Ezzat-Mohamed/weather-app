import React from "react";
import { BiSave, BiEditAlt, BiTrash } from "react-icons/bi";
import { VscDiscard } from "react-icons/vsc";
import { Button } from "@components/common/Button";
import { Textarea } from "@components/common/TextArea";
import { Note } from "@/types";

interface NoteItemProps {
  note: Note;
  onEditNote: (noteId: string, content: string) => void;
  onDeleteNote: (noteId: string) => void;
  onCancelEdit: () => void;
  onUpdateNote: () => void;
  isEditing: boolean;
  editedNote?: string;
  setEditedNote: React.Dispatch<React.SetStateAction<string>>;
}

const NoteItem: React.FC<NoteItemProps> = ({
  note,
  onEditNote,
  onDeleteNote,
  onCancelEdit,
  onUpdateNote,
  setEditedNote,
  isEditing,
  editedNote = "",
}) => {
  return (
    <div
      className="flex w-[calc(50%-4px)] items-end rounded bg-slate-100 p-1 dark:bg-secondary"
      key={note.id}
    >
      <Textarea
        className="w-full resize-none bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 disabled:text-primary disabled:opacity-60"
        rows={2}
        cols={5}
        id={note.id}
        value={isEditing ? editedNote : note.content}
        disabled={!isEditing}
        onChange={(e) => setEditedNote(e.target.value)}
        data-testid={`textarea-${note.id}`}
      />

      <div>
        {isEditing ? (
          <div className="flex gap-2">
            <Button
              variant="ghost"
              className="p-0 text-3xl"
              onClick={onUpdateNote}
              data-testid={`save-note-${note.id}`}
            >
              <BiSave />
            </Button>
            <Button
              variant="ghost"
              className="p-0 text-3xl"
              onClick={onCancelEdit}
              data-testid={`cancel-edit-${note.id}`}
            >
              <VscDiscard />
            </Button>
          </div>
        ) : (
          <div className="flex gap-2">
            <Button
              variant="ghost"
              className="p-0 text-3xl text-blue-500 dark:text-blue-500 dark:hover:text-blue-700"
              onClick={() => {
                onEditNote(note.id, note.content);
              }}
              data-testid={`edit-note-${note.id}`}
            >
              <BiEditAlt />
            </Button>
            <Button
              variant="ghost"
              className="p-0 text-3xl text-red-500 dark:text-red-500 dark:hover:text-red-700"
              onClick={() => onDeleteNote(note.id)}
              data-testid={`delete-note-${note.id}`}
            >
              <BiTrash />
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default NoteItem;
