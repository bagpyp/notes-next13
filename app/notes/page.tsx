import Link from "next/link";
import styles from "./Notes.module.css";
import CreateNote from "./CreateNote";

const getNotes = async () => {
  // const db = new PocketBase("http://127.0.0.1:8090");
  // const data = await db["records"].getList("notes");
  const res = await fetch(
    "http://127.0.0.1:8090/api/" +
      "collections/notes/records" +
      "?page=1&perPage=30",
    { cache: "no-store" }
  );
  const data = await res.json();
  return data?.items as any[];
};

const NotesPage = async () => {
  const notes = await getNotes();

  return (
    <div>
      <h1>Notes</h1>
      <div>
        {notes?.map((note) => {
          return <Note key={note.id} note={note} />;
        })}
      </div>
      <CreateNote />
    </div>
  );
};

const Note = ({ note }: any) => {
  const { id, title, content, created } = note || {};

  return (
    <Link href={`http://127.0.0.1:3000/notes/${id}`}>
      <div className={styles.note}>
        <h2>{title}</h2>
        <h5>{content}</h5>
        <p>{created}</p>
      </div>
    </Link>
  );
};

export default NotesPage;
