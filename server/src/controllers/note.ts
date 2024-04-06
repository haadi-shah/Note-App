import { RequestHandler } from "express";
import Note, { NoteDocument } from "../models/note";

interface IncomingBody {
  title: string;
  description: string;
}

export const create: RequestHandler = async (req, res) => {
  // const newNote = new Note<NoteDocument>({
  //   title : (req.body as IncomingBody).title,
  //   description : (req.body as IncomingBody).description
  // })
  // await newNote.save();

  // another method to do the same task
  const newNote = await Note.create<NoteDocument>({
    title: (req.body as IncomingBody).title,
    description: (req.body as IncomingBody).description,
  });
  res.json({
    note: {
      id: newNote._id,
      title: newNote.title,
      description: newNote.description,
    },
  });
};

export const updateSingleNote: RequestHandler = async (req, res) => {
  //   const { noteId } = req.params;
  //   const note = await Note.findById(noteId);
  //   if (!note) return res.json({ error: "no note found" });
  //   const { title, description } = req.body as IncomingBody;
  //   if(title) note.title = req.body.title;
  //   if(description) note.description = req.body.description;
  //   await note.save();
  // res.json({note});
  //we write if in the 3rd and 4th last line because we have made the title require true
  // but if the user only update the description and do not provide the tile its gonna give us an error
  // in this case it checks wether the user have provided the tile or not if not its only gonna updata description
  // because of the if condition

  //another method to update data

  const { noteId } = req.params;
  const { title, description } = req.body as IncomingBody;
  const note = await Note.findByIdAndUpdate(
    noteId,
    { title, description },
    { new: true }
  ).exec();
  if (!note) return res.json({ error: "no note found" });
  res.json({ note: {id: note._id, title: note.title ,description: note.description} });
};

export const removeSingleNote: RequestHandler = async (req, res) => {
  const { noteId } = req.params;
  const deletedNote = await Note.findByIdAndDelete(noteId);
  if (!deletedNote) return res.json({ error: "could not delete the note" });
  res.json({ message: "deleted the record successfully!", id: noteId });
};

export const getAllNotes: RequestHandler = async (req, res) => {
  const notes = await Note.find().exec();
  res.json({ notes: notes.map((note)=> {
    return{
      id: note._id,
      title:note.title,
      description: note.description
    }
  }) });
};

export const getSingleNote: RequestHandler = async (req, res) => {
  const { id } = req.params;
  const note = await Note.findById(id).exec();
  if (!note)
    return res.json({ error: "no record with the specified id available " });
  res.json({ note });
};
