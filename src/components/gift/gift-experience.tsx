"use client";

import { useEffect, useState } from "react";
import { buildGift, type GiftKind, type GiftPayload } from "@/lib/gift";
import { loadSpace } from "@/lib/storage";
import { GiftFooter } from "./gift-chrome";
import { SmoothScroll } from "./smooth-scroll";
import { AnniversaryGift } from "./templates/anniversary";
import { BirthdayGift } from "./templates/birthday";
import { ThankYouGift } from "./templates/thankyou";
import { WeddingGift } from "./templates/wedding";

/**
 * The server hands us a payload built from the seeded Space so the first paint
 * is real. On mount we rebuild from whatever the visitor's Space actually holds,
 * which is how a moment added in the studio a minute ago shows up here.
 *
 * Either way the content comes from buildGift and nowhere else.
 */
export function GiftExperience({
  initial,
  kind,
  spaceId,
}: {
  initial: GiftPayload;
  kind: GiftKind;
  spaceId: string;
}) {
  const [gift, setGift] = useState<GiftPayload>(initial);

  useEffect(() => {
    setGift(buildGift(loadSpace(spaceId), kind));
  }, [kind, spaceId]);

  return (
    <>
      <SmoothScroll />
      <main className="overflow-x-clip">
        {kind === "anniversary" ? <AnniversaryGift gift={gift} /> : null}
        {kind === "birthday" ? <BirthdayGift gift={gift} /> : null}
        {kind === "wedding" ? <WeddingGift gift={gift} /> : null}
        {kind === "thankyou" ? <ThankYouGift gift={gift} /> : null}
        <GiftFooter gift={gift} />
      </main>
    </>
  );
}
