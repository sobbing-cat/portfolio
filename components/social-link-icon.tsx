"use client";

import type React from "react";

import { useMemo } from "react";
import Link from "next/link";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import {
  IconBrandTwitterFilled as Twitter,
  IconBrandFacebookFilled as Facebook,
  IconBrandInstagramFilled as Instagram,
  IconBrandLinkedinFilled as Linkedin,
  IconBrandGithubFilled as Github,
  IconBrandYoutubeFilled as Youtube,
  IconBrandTiktokFilled as Tiktok,
  IconBrandReddit as Reddit,
  IconBrandPinterestFilled as Pinterest,
  IconBrandDiscordFilled as Discord,
  IconBrandTwitch as Twitch,
  IconBrandMastodon as Mastodon,
  IconWorld as Globe,
  IconQuestionMark as QuestionMark,
  IconBrandXFilled as XCircle,
  IconBrandBluesky as Feather,
} from "@tabler/icons-react";

interface SocialLinkIconProps {
  link: string;
}

type SocialPlatformConfig = {
  name: string;
  icon: React.ElementType;
  hostnameRegex: RegExp; // Matches the hostname (e.g., twitter.com, github.com)
  userPathRegex?: RegExp; // Optional: Matches a valid user/account path
};

const socialPlatforms: SocialPlatformConfig[] = [
  {
    name: "Twitter/X",
    icon: Twitter,
    hostnameRegex: /(^|\.)(x|twitter)\.com$/,
    userPathRegex: /^\/[a-zA-Z0-9_]{1,15}(\/)?$/, // Matches /username
  },
  {
    name: "Facebook",
    icon: Facebook,
    hostnameRegex: /(^|\.)facebook\.com$/,
    // Facebook's user paths are complex. We'll handle generic paths separately.
  },
  {
    name: "Instagram",
    icon: Instagram,
    hostnameRegex: /(^|\.)instagram\.com$/,
    userPathRegex: /^\/[a-zA-Z0-9_.]+(\/)?$/, // Matches /username
  },
  {
    name: "LinkedIn",
    icon: Linkedin,
    hostnameRegex: /(^|\.)linkedin\.com$/,
    userPathRegex: /^\/(in|company)\/[a-zA-Z0-9_-]+(\/)?$/, // Matches /in/username or /company/companyname
  },
  {
    name: "GitHub",
    icon: Github,
    hostnameRegex: /(^|\.)github\.com$/,
    userPathRegex: /^\/[a-zA-Z0-9_-]+(\/)?$/, // Matches /username
  },
  {
    name: "YouTube",
    icon: Youtube,
    hostnameRegex: /(^|\.)youtube\.com$/,
    userPathRegex: /^\/(@|channel\/|user\/)[a-zA-Z0-9_-]+(\/)?$/, // Matches /@username, /channel/UC..., /user/username
  },
  {
    name: "TikTok",
    icon: Tiktok,
    hostnameRegex: /(^|\.)tiktok\.com$/,
    userPathRegex: /^\/@([a-zA-Z0-9_.]){2,24}(\/)?$/, // Matches /@username
  },
  {
    name: "Reddit",
    icon: Reddit,
    hostnameRegex: /(^|\.)reddit\.com$/,
    userPathRegex: /^\/(user|r)\/[a-zA-Z0-9_.-]+(\/)?$/, // Matches /user/username or /r/subreddit
  },
  {
    name: "Pinterest",
    icon: Pinterest,
    hostnameRegex: /(^|\.)pinterest\.com$/,
    userPathRegex: /^\/[a-zA-Z0-9_.-]+(\/)?$/, // Matches /username
  },
  {
    name: "Discord",
    icon: Discord,
    hostnameRegex: /(^|\.)discord\.(gg|com)$/,
    userPathRegex: /^\/(invite\/)?[a-zA-Z0-9_-]+(\/)?$/, // Matches discord.gg/invitecode or discord.com/users/id
  },
  {
    name: "Twitch",
    icon: Twitch,
    hostnameRegex: /(^|\.)twitch\.tv$/,
    userPathRegex: /^\/[a-zA-Z0-9_]+(\/)?$/, // Matches /username
  },
  {
    name: "Mastodon",
    icon: Mastodon,
    hostnameRegex: /\.social$/, // Matches any .social domain
    userPathRegex: /^\/@([a-zA-Z0-9_.-]+)(\/)?$/, // Matches /@username
  },
  {
    name: "Bluesky",
    icon: Feather, // Placeholder icon
    hostnameRegex: /(^|\.)bsky\.app$/,
    userPathRegex: /^\/profile\/[a-zA-Z0-9_.-]+\.bsky\.social(\/)?$/, // Matches /profile/handle.bsky.social
  },
];

export function SocialLinkIcon({ link }: SocialLinkIconProps) {
  const { Icon, tooltipText, isError, isLink, href } = useMemo(() => {
    if (!link) {
      return {
        Icon: QuestionMark,
        tooltipText: "No link provided (empty string)",
        isError: false,
        isLink: false,
        href: "#", // Non-functional link
      };
    }

    let url: URL;
    try {
      url = new URL(link);
      // Ensure protocol is specified and is http/https
      if (!url.protocol.startsWith("http")) {
        throw new Error("Protocol not specified or invalid.");
      }
    } catch (e) {
      return {
        Icon: Globe,
        tooltipText: `Invalid URL format or protocol missing: ${link}`,
        isError: true,
        isLink: false,
        href: "#",
      };
    }

    const hostname = url.hostname.toLowerCase();
    const pathname = url.pathname;

    let detectedSocial: SocialPlatformConfig | undefined;
    for (const platform of socialPlatforms) {
      if (hostname.match(platform.hostnameRegex)) {
        detectedSocial = platform;
        break;
      }
    }

    if (detectedSocial) {
      let isUserAccount = true;

      // Special handling for Facebook due to complex URL structures
      if (detectedSocial.name === "Facebook") {
        const genericFacebookPaths = [
          "/pages/",
          "/groups/",
          "/events/",
          "/marketplace/",
          "/watch/",
          "/gaming/",
          "/help/",
          "/login/",
          "/recover/",
          "/public/",
          "/business/",
          "/ads/",
          "/privacy/",
          "/legal/",
          "/about/",
          "/careers/",
          "/developers/",
          "/policies/",
          "/community/",
          "/settings/",
          "/notifications/",
          "/messages/",
          "/friends/",
          "/search/",
          "/hashtag/",
          "/stories/",
          "/reels/",
          "/live/",
          "/jobs/",
          "/fundraisers/",
          "/weather/",
          "/news/",
          "/saved/",
          "/onthisday/",
          "/memories/",
          "/games/",
          "/apps/",
        ];
        // If it's the root path or starts with a common generic prefix, it's likely not a user account
        if (
          pathname === "/" ||
          genericFacebookPaths.some((prefix) => pathname.startsWith(prefix))
        ) {
          isUserAccount = false;
        }
      } else if (detectedSocial.userPathRegex) {
        // For other platforms with a defined userPathRegex, test against it
        isUserAccount = detectedSocial.userPathRegex.test(pathname);
      } else if (pathname === "/") {
        // For socials without specific userPathRegex, if it's just the root domain, treat as not a user
        isUserAccount = false;
      }

      if (!isUserAccount) {
        // It's a social platform domain, but the path doesn't match a user/account pattern
        return {
          Icon: XCircle,
          tooltipText: `Not a specific account on ${detectedSocial.name}: ${link}`,
          isError: true,
          isLink: false,
          href: "#", // Non-functional link
        };
      }
      // Valid social link
      return {
        Icon: detectedSocial.icon,
        tooltipText: link,
        isError: false,
        isLink: true,
        href: link,
      };
    }

    // Not a social link, but a valid general URL
    return {
      Icon: Globe,
      tooltipText: link,
      isError: false,
      isLink: true,
      href: link,
    };
  }, [link]);

  const IconComponent = Icon;

  return (
    <Tooltip delayDuration={400}>
      <TooltipTrigger asChild>
        {isLink ? (
          <Link
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center p-2 rounded-lg  hover:bg-secondary transition-colors"
          >
            <IconComponent
              className={cn(
                "h-6 w-6",
                isError && "text-red-500",
                Icon === QuestionMark && "text-blue-500"
              )}
            />
          </Link>
        ) : (
          <div className="inline-flex items-center justify-center p-2 rounded-full">
            <IconComponent
              className={cn(
                "h-6 w-6",
                isError && "text-red-500",
                Icon === QuestionMark && "text-blue-500"
              )}
            />
          </div>
        )}
      </TooltipTrigger>
      {/* <TooltipContent className="text-white font-semibold">
        {tooltipText}
      </TooltipContent> */}
    </Tooltip>
  );
}
