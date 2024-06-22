import { Suspense } from "react";
import { Orbit } from "@/components/loading";
import { getDigitalArt, getDrawings, getPaintings } from "@/server/db/query";
import clsx from "clsx";
import { GalleryCard } from "@/components/art/card";
import { ArtModal } from "@/components/art/modal";

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
          <ArtModal id={itemId} category={category} />
        </Suspense>
      )}
    </div>
  );
}
