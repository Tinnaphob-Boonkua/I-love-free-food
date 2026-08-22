import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { GiftExperience } from "@/components/gift/gift-experience";
import { buildGift, giftSlugs, slugToKind } from "@/lib/gift";
import { demoSpace } from "@/lib/mock-space";

type Params = { params: Promise<{ slug: string }> };
type Query = { searchParams: Promise<Record<string, string | string[] | undefined>> };

export function generateStaticParams() {
  return Object.values(giftSlugs).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const kind = slugToKind[slug];
  if (!kind) return { title: "MomentUS — Moment of Us" };

  const gift = buildGift(demoSpace, kind);
  return { title: `${gift.headline} — MomentUS`, description: gift.dedication };
}

export default async function GiftPage({ params, searchParams }: Params & Query) {
  const { slug } = await params;
  const kind = slugToKind[slug];
  if (!kind) notFound();

  const { from } = await searchParams;
  const spaceId = typeof from === "string" && from ? from : demoSpace.id;

  return <GiftExperience initial={buildGift(demoSpace, kind)} kind={kind} spaceId={spaceId} />;
}
