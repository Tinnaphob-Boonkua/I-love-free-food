#!/usr/bin/env bash
# One-off: generates the seeded Chiang Mai story photographs, one per moment in
# demoSpace that has no contributed photograph of its own.
# Not part of the build. Re-running skips anything already on disk.
set -u

OUT="$(cd "$(dirname "$0")/.." && pwd)/public/demo/story"
mkdir -p "$OUT"

LOOK="Shot on 35mm colour film, warm tungsten and deep shadow, visible grain, slightly imperfect handheld framing, candid documentary snapshot taken by a friend. No posing for the camera, no stock-photo smiles, no watermark, no text, no logos, no readable writing anywhere in frame."

gen() {
  local name="$1" prompt="$2"
  if [ -s "$OUT/$name.jpg" ] || [ -s "$OUT/$name.png" ]; then echo "SKIP $name"; return; fi
  echo "GEN $name"
  gpt-bridge worker image --prompt "$prompt $LOOK" --output-path "$OUT/$name.png" --brief 2>&1 | tail -3
}

gen "temple-rain" "Three young friends in their late twenties sheltering under the wooden eaves of an old forest temple in northern Thailand during heavy monsoon rain. Wet dark stone steps, dripping moss, dense green trees behind. One of them stands barefoot on the step holding a pair of soaked canvas sneakers, laughing at the other two. Overcast afternoon light. Landscape orientation."

gen "rooftop-countdown" "New Year's Eve seen from an unlit rooftop in Chiang Mai. Three friends photographed from behind as dark silhouettes at a low concrete parapet, looking out over a small low-rise city. Distant fireworks throw a brief gold light across the rooftop. A warm tungsten bulb glows in an open stairwell doorway behind them. Night, very dark, handheld. Landscape orientation."

gen "first-morning" "Early morning in a small Thai guest house kitchen on New Year's Day. Two chipped mugs of iced coffee sweating on a scratched wooden table, a half-packed backpack slumped on a plastic chair, a fan in the corner. Nobody in the frame. Low sun through a window with a bent screen. Quiet and still. Landscape orientation."

gen "birthday-later" "A small birthday cake with a single lit candle on a dark kitchen table in a dim room. Beside it, a phone propped against a glass shows a video call with two friends in another city, their faces lit blue by their own screens. The candle is the only warm light. Nobody else in the room. Portrait orientation."

gen "orange-van" "Inside an old shared minibus climbing a highway in northern Thailand in late afternoon. A mesh bag of pomelo is being passed back between rows of worn seats; several hands are on it at once, none of the faces fully visible. Dusty window light, curtains half drawn, luggage stacked at the back. Nobody is holding a phone. Landscape orientation."

gen "night-market" "A crowded night market street in Chiang Mai. Steam rising off a noodle stall under bare bulbs and tangled string lights, a vendor's hands over a wok, blurred shoulders of people pushing past in the foreground. Very warm light against a dark street. Motion blur, handheld, shot at a slow shutter. Landscape orientation."

gen "two-am" "A phone lying face up on rumpled bedsheets in a completely dark bedroom at two in the morning. The screen glow is the only light in the frame and is blown out to pure white, illegible, spilling across the creases of the sheet. Nobody in the frame. Very dark, quiet. Portrait orientation."

echo "DONE"
ls -la "$OUT"
