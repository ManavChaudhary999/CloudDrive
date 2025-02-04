import { mockFiles, mockFolders } from "~/lib/mock-data";
import { db } from "~/server/db";
import { files_table, folders_table } from "~/server/db/schema";


export default function SandboxPage() {
    return (
        <div className="flex flex-col">
            Seed Function

            <form action={async () => {
                'use server';

                await db.insert(folders_table).values(mockFolders.map(folder => ({
                    name: folder.name,
                    ownerId: "123",
                    parent: 1,
                })));

                await db.insert(files_table).values(mockFiles.map(file => ({
                    ownerId: "123",                    
                    name: file.name,
                    size: 500,
                    url: file.url,
                    parent: 1,
                })));

                console.log("Pushing Data to DB");
            }}>
                <button type="submit">Seed</button>
            </form>
        </div>
    );
}