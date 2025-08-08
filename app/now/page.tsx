import CornerFrame from "@/components/corner-frame";
import { Badge } from "@/components/ui/badge";
import {
  IconActivity,
  IconCalendarFilled,
  IconHeadphonesFilled,
  IconSparkles,
  IconTarget,
  IconTool,
} from "@tabler/icons-react";
import DoingNow from "@/content/doing-now.json";
import { SpotifyEmbed } from "@/components/spotify-embed";

export const metadata = {
  title: DoingNow.title,
  description: DoingNow.summary,
};

export default function Now() {
  return (
    <>
      <div className="w-full h-50 bg-gradient-to-b from-foreground/10 to-transparent absolute -z-10" />
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col gap-22 pt-30 pb-20">
        <CornerFrame className="min-h-60">
          <div className="flex flex-col items-center gap-20 text-center">
            <div className="w-full h-8 section-stripes" aria-hidden="true" />
            <div className="space-y-2">
              {DoingNow.title && (
                <h1 className="text-4xl font-bold tracking-tight">
                  {DoingNow.title}
                </h1>
              )}

              {DoingNow.summary && (
                <p className="text-foreground/90">{DoingNow.summary}</p>
              )}
              {DoingNow.lastUpdated && (
                <div className="inline-flex items-center gap-2 text-sm text-foreground/80">
                  <IconCalendarFilled className="size-4" aria-hidden="true" />
                  <span>{DoingNow.lastUpdated}</span>
                </div>
              )}
            </div>
            <div className="w-full h-8 section-stripes" aria-hidden="true" />
          </div>
        </CornerFrame>
        {DoingNow.currently.length > 0 && (
          <CornerFrame>
            <div className="flex flex-col gap-6">
              <div className="flex items-center gap-2">
                <IconSparkles className="size-5" aria-hidden="true" />
                <h2 className="text-2xl font-semibold tracking-tight">
                  Currently
                </h2>
              </div>
              <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {DoingNow.currently.map((currently, index) => (
                  <li key={index} className="rounded-md border p-4">
                    <p className="font-medium">{currently.title}</p>
                    <p className="text-sm text-foreground/90">
                      {currently.description}
                    </p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {currently.tags.map((tech, index) => (
                        <Badge key={index} variant="secondary">
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </CornerFrame>
        )}
        {DoingNow.listening.spotifyUrl && (
          <CornerFrame>
            <div className="flex flex-col gap-6">
              <div className="flex items-center gap-2">
                <IconHeadphonesFilled className="size-5" aria-hidden="true" />
                <h2 className="text-2xl font-semibold tracking-tight">
                  Listening
                </h2>
              </div>
              <SpotifyEmbed url={DoingNow.listening.spotifyUrl} height="500" />
            </div>
          </CornerFrame>
        )}
        {DoingNow.stackUpdates.length > 0 && (
          <CornerFrame>
            <div className="flex flex-col gap-6">
              <div className="flex items-center gap-2">
                <IconTool className="size-5" aria-hidden="true" />
                <h2 className="text-2xl font-semibold tracking-tight">
                  Stack updates
                </h2>
              </div>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {DoingNow.stackUpdates.map((update, index) => (
                  <div key={index} className="rounded-md border p-4">
                    <p className="font-medium">{update.area}</p>
                    <p className="text-sm text-foreground/90">
                      {update.description}
                    </p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {update.tags.map((tag, index) => (
                        <Badge key={index} variant="secondary">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </CornerFrame>
        )}
        {DoingNow.healthLife.length > 0 && (
          <CornerFrame>
            <div className="flex flex-col gap-6">
              <div className="flex items-center gap-2">
                <IconActivity className="size-5" aria-hidden="true" />
                <h2 className="text-2xl font-semibold tracking-tight">
                  Health & life
                </h2>
              </div>
              <ul className="list-disc space-y-2 pl-5 text-foreground/90">
                {DoingNow.healthLife.map((life, index) => (
                  <li key={index}>{life}</li>
                ))}
              </ul>
            </div>
          </CornerFrame>
        )}
        {DoingNow.next.goals.length > 0 && (
          <CornerFrame>
            <div className="flex flex-col items-start gap-6">
              <div className="flex items-center gap-2">
                <IconTarget className="size-5" aria-hidden="true" />
                <h2 className="text-2xl font-semibold tracking-tight">
                  What&apos;s next
                </h2>
              </div>
              <ul className="list-disc space-y-2 pl-5 text-foreground/90">
                {DoingNow.next.goals.map((goal, index) => (
                  <li key={index}>{goal}</li>
                ))}
              </ul>
            </div>
          </CornerFrame>
        )}
      </div>
    </>
  );
}
