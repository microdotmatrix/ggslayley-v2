import { Suspense } from "react";
import { Orbit } from "@/components/loading";
import {
  getDigitalArt,
  getDrawings,
  getPaintings,
  getPaintingById,
  getDrawingById,
  getDigitalArtById,
} from "@/server/db/query";
import clsx from "clsx";
import { GalleryCard } from "@/components/art/card";
import { ArtModal } from "@/components/art/modal";
import Image from "next/image";

type searchParams = Record<string, string> | null | undefined;

export default function Page({
  params: { category },
  searchParams,
}: {
  params: { category: string };
  searchParams: searchParams;
}) {
  return (
    <Suspense
      fallback={
        <div className="flex h-full items-center justify-center">
          <Orbit />
        </div>
      }
    >
      <Artwork category={category} searchParams={searchParams} />
    </Suspense>
  );
}

type ArtProps = {
  id: string;
  title: string;
  url: string;
  description: string;
  createdAt: string;
  uv?: string;
  productUrl?: string;
};

async function Artwork({
  category,
  searchParams,
}: {
  category: string;
  searchParams: searchParams;
}) {
  let art: any = [];

  if (category === "paintings") {
    art = await getPaintings();
  }
  if (category === "drawings") {
    art = await getDrawings();
  }
  if (category === "digital") {
    art = await getDigitalArt();
  }
  if (!category || category === undefined) {
    return null;
  }

  const showModal = searchParams?.modal === "true";
  const itemId = searchParams?.id;

  return (
    <div>
      {art.length > 0 ? (
        <ul
          className={clsx(
            "columns-1 gap-1",
            art.length === 2
              ? `md:columns-1 xl:columns-2`
              : art.length === 3
                ? `md:columns-2 xl:columns-3 min-[2800px]:columns-4`
                : "md:columns-2 xl:columns-3 min-[2800px]:columns-4",
          )}
        >
          {art.map((item: ArtProps, i: number) => (
            <li key={i}>
              <GalleryCard
                item={item}
                category={category}
                searchParams={searchParams}
              />
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-center">No {category} found</p>
      )}
      {showModal && (
        <Suspense
          fallback={
            <div className="fixed left-0 top-0 z-50 m-auto grid h-full w-full place-content-center">
              <Orbit />
            </div>
          }
        >
          <div className="z-100 fixed inset-0 grid h-full w-full place-content-center bg-black/50 backdrop-blur-md">
            <ImageView id={itemId} category={category} />
          </div>
        </Suspense>
      )}
    </div>
  );
}

async function ImageView({ id, category }: { id: string; category: string }) {
  let art;
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
        src={`${art?.url}?tr=w-960,h-960`}
        alt={art?.title}
        height={960}
        width={960}
        loading="lazy"
        className="max-h-[80vh] max-w-full overflow-hidden object-contain"
        sizes="(min-width: 1024px) 960px, (min-width: 768px) 800px, 100vw"
      />
    </div>
  );
}
