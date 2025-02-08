"use server"

import { db } from "./db";
import { auth } from "@clerk/nextjs/server";
import { files_table } from "./db/schema";
import { and, eq } from "drizzle-orm";
import { UTApi } from "uploadthing/server";
import { cookies } from "next/headers";

const utApi = new UTApi();

export async function deleteFile(fileId: number) {
    const user = await auth();

    if(!user.userId) throw new Error("Unauthorized");

    const file = await db
        .select()
        .from(files_table)
        .where(
            and(
                eq(files_table.id, fileId),
                eq(files_table.ownerId, user.userId!)
            )
        );

    if(!file[0]) throw new Error("File not found");

    await utApi.deleteFiles(file[0].key);

    await db.delete(files_table).where(eq(files_table.id, fileId));
    
    // Refresh the cache on the client aka the browser
    const c = await cookies();
    c.set("force-refresh", JSON.stringify(Math.random()));

    return {success: true};
}