import { notFound } from "next/navigation";
import { demoSpace } from "@/lib/mock-space";
import { Studio } from "@/components/studio/studio";

export default async function SpacePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  // Only the seeded demo Space exists this round. Everything else 404s honestly.
  if (id !== demoSpace.id) notFound();

  return <Studio spaceId={id} />;
}
