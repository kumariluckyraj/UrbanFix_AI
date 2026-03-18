export async function POST(req) {
  try {
    const { topic } = await req.json();

    const apiKey = process.env.YOUTUBE_API_KEY;

    const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${encodeURIComponent(
      topic + " tutorial"
    )}&type=video&maxResults=1&key=${apiKey}`;

    const ytRes = await fetch(url);
    const data = await ytRes.json();

    if (!data.items || data.items.length === 0) {
      return Response.json({
        error: "No video found",
      });
    }

    const videoId = data.items[0].id.videoId;

    const embedUrl = `https://www.youtube.com/embed/${videoId}`;

    return Response.json({
      video: embedUrl,
    });

  } catch (error) {
    console.error(error);

    return Response.json({
      error: "Failed to fetch video",
    });
  }
}