import React, { useState } from "react";
import { GetStaticProps } from "next";
import { Container, Grid } from "@material-ui/core";
import NoteCard from "../components/NoteCard";
import { Note } from "../models/Note";

interface Props {
  notes: Array<Note>;
}

const Notes: React.FC<Props> = ({ notes: initialNotes }) => {
  const [notes, setNotes] = useState(initialNotes);

  const handleDelete = async (id: number) => {
    await fetch(`http://localhost:8000/notes/${id}`, {
      method: "DELETE",
    });

    const remainingNotes = notes.filter((note) => note.id !== id);
    setNotes(remainingNotes);
  };

  return (
    <Container>
      <Grid container spacing={3}>
        {notes.map((note) => (
          <Grid item key={note.id} xs={12} md={6} lg={4}>
            <NoteCard note={note} handleDelete={handleDelete} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const response = await fetch("http://localhost:8000/notes");
  const data = (await response.json()) as Props;

  return {
    props: { notes: data },
  };
};

export default Notes;
