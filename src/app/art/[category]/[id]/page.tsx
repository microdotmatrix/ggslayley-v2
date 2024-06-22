import { Suspense } from "react";
import { Orbit } from "@/components/loading";
import Image from "next/image";
import {
  getDigitalArtById,
  getDrawingById,
  getPaintingById,
} from "@/server/db/query";

export default function Page({
  params: { category, id },
}: {
  params: { category: string; id: string };
}) {
  return (
    <Suspense
      fallback={
        <div className="flex h-full items-center justify-center">
          <Orbit />
        </div>
      }
    >
      <ImageView category={category} id={id} />
    </Suspense>
  );
}

async function ImageView({ category, id }: { category: string; id: string }) {
  let art: any = [];

  if (category === "paintings") {
    art = await getPaintingById(id);
  }
  if (category === "drawings") {
    art = await getDrawingById(id);
  }
  if (category === "digital") {
    art = await getDigitalArtById(id);
  }
  if (!category || category === undefined) {
    return null;
  }

  return (
    <div>
      <Image
        src={art.url}
        alt={art.title}
        height={1024}
        width={1024}
        className="size-full object-cover"
      />
    </div>
  );
}
