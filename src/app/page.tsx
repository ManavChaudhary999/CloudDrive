import { db } from "~/server/db";
import DriveContent from "./drive-content";
import { files_table, folders_table } from "~/server/db/schema";


export default async function GoogleDriveClone() {
  const files = await db.select().from(files_table);
  const folders = await db.select().from(folders_table);

  return (
    <DriveContent  files={files} folders={folders} />
  );
}