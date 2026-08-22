import type { Metadata } from "next";
import { BoothStage } from "@/components/booth/booth-stage";

export const metadata: Metadata = {
  title: "Two frames. One moment. — MomentUS",
  description: "A staged photobooth. The shutter is real; the second phone is the next chapter.",
};

export default function BoothPage() {
  return <BoothStage />;
}
