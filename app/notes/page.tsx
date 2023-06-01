// import PocketBase from "pocketbase";
import Link from "next/link";
import styles from "./Notes.module.css";

// export const dynamic = "auto",
//   dynamicParams = true,
//   revalidate = 0,
//   fetchCache = "auto",
//   runtime = "nodejs",
//   preferredRegion = "auto";

interface INote {
  id: string;
  title: string;
  content: string;
  created: Date;
  updated: Date;
}

const getNotes = async (): Promise<INote[]> => {
  // const db = new PocketBase("http://127.0.0.1:8090");
  // const data = await db["records"].getList("notes");
  const res = await fetch(
    "http://127.0.0.1:8090/api/" +
      "collections/notes/records" +
      "?page=1&perPage=30",
    { cache: "no-store" }
  );
  const data = await res.json();
  return data?.items;
};

const NotesPage = async () => {
  const notes = await getNotes();

  return (
    <div>
      <h1>Notes</h1>
      <div>
        {notes?.map((note) => {
          console.log("notes: ", notes);
          return <Note key={note.id} note={note} />;
        })}
      </div>
    </div>
  );
};

const Note = ({ note }: any) => {
  const { id, title, content, created } = note || {};

  return (
    <Link href={`/notes/${id}`}>
      <div className={styles.note}>
        <h2>{title}</h2>
        <h5>{content}</h5>
        <p>{created}</p>
      </div>
    </Link>
  );
};

export default NotesPage;
