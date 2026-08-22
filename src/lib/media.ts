/**
 * SHARED CONTRACT — Lane A owns this file.
 *
 * Turning a file a visitor picks into something the demo can actually keep.
 *
 * A blob: URL dies the moment the page reloads, and the whole point of the demo
 * is that a judge adds a photo and it is still there on the gift page. So we
 * downscale on a canvas and store a data URL, which survives in localStorage.
 */

"use client";

/** Above this we refuse the file rather than blow the storage quota. */
export const MAX_UPLOAD_MB = 10;

/** Longest edge after downscaling. Big enough for a full-bleed gift frame. */
const MAX_EDGE = 1280;
const QUALITY = 0.72;

export type PreparedImage = {
  /** A data: URL, safe to put straight on Moment.mediaUrl. */
  dataUrl: string;
  width: number;
  height: number;
};

/**
 * Rejects with a message written for a person, not a log. Show `error.message`
 * directly — it names the problem and the way out, per docs/CONTENT.md.
 */
export async function prepareImage(file: File): Promise<PreparedImage> {
  if (!file.type.startsWith("image/")) {
    throw new Error("That is not an image. Try a photo instead.");
  }

  if (file.size > MAX_UPLOAD_MB * 1024 * 1024) {
    throw new Error(`That file is bigger than ${MAX_UPLOAD_MB}MB. Try a smaller photo.`);
  }

  const bitmap = await loadBitmap(file);
  const scale = Math.min(1, MAX_EDGE / Math.max(bitmap.width, bitmap.height));
  const width = Math.max(1, Math.round(bitmap.width * scale));
  const height = Math.max(1, Math.round(bitmap.height * scale));

  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;

  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("This browser would not open that photo. Try another one.");

  ctx.drawImage(bitmap, 0, 0, width, height);
  if ("close" in bitmap) bitmap.close();

  return { dataUrl: canvas.toDataURL("image/jpeg", QUALITY), width, height };
}

async function loadBitmap(file: File): Promise<ImageBitmap | HTMLImageElement> {
  if (typeof createImageBitmap === "function") {
    try {
      return await createImageBitmap(file);
    } catch {
      // Safari refuses some HEIC-ish files here; fall through to <img>.
    }
  }

  const url = URL.createObjectURL(file);
  try {
    return await new Promise<HTMLImageElement>((resolve, reject) => {
      const img = new window.Image();
      img.onload = () => resolve(img);
      img.onerror = () => reject(new Error("That photo would not open. Try another one."));
      img.src = url;
    });
  } finally {
    URL.revokeObjectURL(url);
  }
}
