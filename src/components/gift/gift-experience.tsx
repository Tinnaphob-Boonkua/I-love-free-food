"use client";

import { useMemo } from "react";
import { buildGift, type GiftKind, type GiftPayload } from "@/lib/gift";
import { useSpace } from "@/lib/use-space";
import { GiftFooter } from "./gift-chrome";
import { SmoothScroll } from "./smooth-scroll";
import { AnniversaryGift } from "./templates/anniversary";
import { BirthdayGift } from "./templates/birthday";
import { ThankYouGift } from "./templates/thankyou";
import { WeddingGift } from "./templates/wedding";

/**
 * Server paints `initial` from the seeded Space so markup matches.
 * Then useSpace rebuilds from the live Space, so a moment added in the
 * studio shows up here — including a gift tab already open.
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
  const { space, isReady } = useSpace(spaceId);
  const gift = useMemo(
    () => (isReady ? buildGift(space, kind) : initial),
    [isReady, space, kind, initial],
  );

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
