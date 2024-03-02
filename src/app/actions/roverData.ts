"use server";

export async function getManifest(rover: string) {
  const manifest = await fetch(
    `https://api.nasa.gov/mars-photos/api/v1/manifests/${rover}?api_key=${process.env.NASA_API_KEY}`
  );
  return manifest.json();
}
