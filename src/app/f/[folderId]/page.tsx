import DriveContent from "./drive-content";
import { QUERIES } from "~/server/db/queries";


export default async function GoogleDriveClone(props: {
    params: Promise<{folderId: string}>
}) {
    const params = await props.params;
    const parsedFolderId = parseInt(params.folderId);
    if(isNaN(parsedFolderId)) {
        return <div>Invalid Folder Id</div>
    }

    const [folders, files, parents] = await Promise.all([
        QUERIES.getFolders(parsedFolderId),
        QUERIES.getFiles(parsedFolderId),
        QUERIES.getAllParentsForFolder(parsedFolderId)
    ]);

    return (
        <DriveContent  files={files} folders={folders} parents={parents} />
    );
}