import Link from "next/link";
import { Image } from "@/components/image";
import { Card } from "@/components/ui/card";
import { getURL } from "@/lib/utils";

type ArtProps = {
  id: string;
  title: string;
  url: string;
  description: string;
  createdAt: string;
  uv?: string;
  productUrl?: string;
};

export const GalleryCard = ({
  item,
  category,
  searchParams,
}: {
  item: ArtProps;
  category: string;
  searchParams: Record<string, string> | null | undefined;
}) => {
  const path = getURL(`/art/${category}`);
  const url = new URL(path);

  url.searchParams.set("modal", "true");
  url.searchParams.set("id", item.id.toString());
  return (
    <Link href={url.toString()} scroll={false}>
      <Card className="mb-1 overflow-hidden" style={{ maxBlockSize: "780px" }}>
        <figure className="relative overflow-hidden">
          <Image
            src={`${item.url}?tr=w-540,h-540`}
            alt={item.title}
            height={540}
            width={540}
            sizes="(min-width: 1024px) 540px, (min-width: 768px) 450px, 100vw"
            className="h-full w-full object-cover"
          />
        </figure>
      </Card>
    </Link>
  );
};
