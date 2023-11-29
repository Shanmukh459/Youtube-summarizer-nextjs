import { NextResponse } from "next/server";
import { zfd } from "zod-form-data";

import { YoutubeLoader } from "langchain/document_loaders/web/youtube";

const schema = zfd.formData({
  videoUrl: zfd.text(),
});

// POST request handler for loading
// YouTube video with given video-id
export async function POST(request) {
  console.log(request.method)
  const { videoUrl } = schema.parse(await request.formData());
  console.log(`Requested YouTube video-url: ${videoUrl}`);
  const loader = YoutubeLoader.createFromUrl(videoUrl, {
    language: "en",
    addVideoInfo: true,
  });

  const transcribedVideoDocsList = await loader.load();
  console.log(transcribedVideoDocsList);
  return NextResponse.json(transcribedVideoDocsList);
}
