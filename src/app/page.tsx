import { QUERIES } from "~/server/db/queries";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function Home() {
  const user = await auth();

  const folder = await QUERIES.getRootFolderForUser(user.userId!);

  redirect(`/f/${folder?.id}`);

  return (
    <div>Home Page</div>
  );
}