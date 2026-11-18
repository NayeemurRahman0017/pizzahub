export async function uploadToImgBB(file: File): Promise<string> {
  const key = process.env.NEXT_PUBLIC_IMGBB_API_KEY;
  if (!key) throw new Error("ImgBB API key is missing.");
  const body = new FormData();
  body.append("image", file);
  const res = await fetch(`https://api.imgbb.com/1/upload?key=${key}`, { method: "POST", body });
  const json = await res.json().catch(() => null);
  if (!res.ok || !json?.success) throw new Error(json?.error?.message ?? "Image upload failed.");
  return json.data.url as string;
}