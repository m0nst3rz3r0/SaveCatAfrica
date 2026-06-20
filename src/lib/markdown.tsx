export function parseYoutubeId(url: string): string | null {
  const trimmed = url.trim();
  const patterns = [
    /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([a-zA-Z0-9_-]{11})/,
    /^([a-zA-Z0-9_-]{11})$/,
  ];
  for (const pattern of patterns) {
    const match = trimmed.match(pattern);
    if (match) return match[1];
  }
  return null;
}

function isYoutubeUrl(line: string): boolean {
  const trimmed = line.trim();
  return (
    trimmed.includes("youtube.com") ||
    trimmed.includes("youtu.be")
  );
}

function isDirectVideoUrl(url: string): boolean {
  return /\.(mp4|webm|ogg)(\?|$)/i.test(url.trim());
}

type MarkdownContentProps = {
  body: string;
  className?: string;
};

export function MarkdownContent({ body, className = "" }: MarkdownContentProps) {
  const lines = body.split("\n");

  return (
    <div className={`space-y-4 ${className}`}>
      {lines.map((line, index) => {
        const trimmed = line.trim();
        if (!trimmed) return null;

        if (trimmed.startsWith("## ")) {
          return (
            <h2
              key={index}
              className="text-2xl font-bold text-navy mt-8 mb-4"
            >
              {trimmed.slice(3)}
            </h2>
          );
        }

        const imageMatch = trimmed.match(/^!\[([^\]]*)\]\(([^)]+)\)$/);
        if (imageMatch) {
          const [, alt, src] = imageMatch;
          return (
            <img
              key={index}
              src={src}
              alt={alt}
              className="w-full rounded-xl shadow-md"
              referrerPolicy="no-referrer"
            />
          );
        }

        if (isYoutubeUrl(trimmed)) {
          const videoId = parseYoutubeId(trimmed);
          if (videoId) {
            return (
              <div
                key={index}
                className="relative w-full aspect-video rounded-xl overflow-hidden shadow-md"
              >
                <iframe
                  src={`https://www.youtube.com/embed/${videoId}`}
                  title="Video"
                  className="absolute inset-0 w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            );
          }
        }

        return (
          <p key={index} className="text-muted leading-relaxed">
            {trimmed}
          </p>
        );
      })}
    </div>
  );
}

export function isYoutubeVideoUrl(url: string): boolean {
  return parseYoutubeId(url) !== null;
}

export function isDirectVideoFileUrl(url: string): boolean {
  return isDirectVideoUrl(url);
}
