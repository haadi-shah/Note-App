import { Schema, model } from "mongoose";


//interface setting types for our data that we will send in note
export interface NoteDocument {
  title: string;
  description?: string;
}

const noteSchema = new Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    trim: true,
  },
});

export default model<NoteDocument>("Note", noteSchema);

//first model name then the schema for which we are creating it
