import { db } from "~/server/db";
import { files_table, folders_table } from "~/server/db/schema";
import { eq } from "drizzle-orm";
import DriveContent from "./drive-content";

async function getAllParentsForFolder(folderId: number) {
    const parents = [];
    let currentId: number | null = folderId;
    while (currentId !== null) {
      const folder = await db
        .selectDistinct()
        .from(folders_table)
        .where(eq(folders_table.id, currentId));

      if (!folder[0]) {
        // throw new Error("Parent folder not found");
        currentId = null;
        return parents;
      }

      parents.unshift(folder[0]);
      currentId = folder[0]?.parent;
    }

    return parents;
};

export default async function GoogleDriveClone(props: {
    params: Promise<{folderId: string}>
}) {
    const params = await props.params;
    const parsedFolderId = parseInt(params.folderId);
    if(isNaN(parsedFolderId)) {
        return <div>Invalid Folder Id</div>
    }

    const foldersPromise = db
    .select()
    .from(folders_table)
    .where(eq(folders_table.parent, parsedFolderId));
    
    const filesPromise = db
    .select()
    .from(files_table)
    .where(eq(files_table.parent, parsedFolderId));
    
    const parentsPromise = getAllParentsForFolder(parsedFolderId);

    const [folders, files, parents] = await Promise.all([foldersPromise, filesPromise, parentsPromise]);

    return (
        <DriveContent  files={files} folders={folders} parents={parents} />
    );
}