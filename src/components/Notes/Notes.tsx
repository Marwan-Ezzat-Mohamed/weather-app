import React, { useState } from "react";
import { BiSave, BiEditAlt, BiTrash } from "react-icons/bi";
import { VscDiscard } from "react-icons/vsc";
import { Button } from "@components/common/Button";
import { Textarea } from "@components/common/TextArea";
import { Note } from "@/types";
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

  return (
    <div className="w-full space-y-2">
      <h1 className="text-3xl font-semibold text-gray-700 dark:text-gray-200">
        Notes
      </h1>
      <div className="flex items-end rounded bg-slate-100 p-1 dark:bg-slate-800">
        <Textarea
          className="w-full resize-none bg-transparent dark:bg-transparent"
          placeholder="Write some notes"
          rows={2}
          value={note}
          onChange={(e) => setNote(e.target.value)}
        />
        <Button
          variant="ghost"
          className="p-0 text-3xl"
          onClick={handleSaveNote}
        >
          <BiSave />
        </Button>
      </div>

      <div className="flex flex-wrap justify-center gap-2">
        {notes?.map((note) => (
          <div
            className="flex w-[calc(50%-4px)] items-end rounded bg-slate-100 p-1 dark:bg-slate-800"
            key={note.id}
          >
            <Textarea
              className="w-full resize-none bg-transparent dark:bg-transparent"
              rows={2}
              cols={5}
              id={note.id}
              value={editNoteId === note.id ? editedNote : note.content}
              readOnly={editNoteId !== note.id}
              onChange={(e) => setEditedNote(e.target.value)}
            />

            <div>
              {editNoteId === note.id ? (
                <div className="flex gap-2">
                  <Button
                    variant="ghost"
                    className="p-0 text-3xl outline-none "
                    onClick={handleUpdateNote}
                  >
                    <BiSave />
                  </Button>
                  <Button
                    variant="ghost"
                    className="p-0 text-3xl"
                    onClick={handleCancelEdit}
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
                      setEditNoteId(note.id);
                      setEditedNote(note.content);
                    }}
                  >
                    <BiEditAlt />
                  </Button>
                  <Button
                    variant="ghost"
                    className="p-0 text-3xl text-red-500 dark:text-red-500 dark:hover:text-red-700"
                    onClick={() => onDeleteNote(note.id)}
                  >
                    <BiTrash />
                  </Button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Notes;
