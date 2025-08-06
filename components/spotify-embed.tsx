"use client"

import { useMemo } from "react"

interface SpotifyEmbedProps {
  url: string
  width?: string // e.g., "100%", "300px"
  height?: string // e.g., "352", "152", "200px"
}

export function SpotifyEmbed({ url, width = "100%", height }: SpotifyEmbedProps) {
  const embedHtml = useMemo(() => {
    const getSpotifyIdAndTypeFromUrl = (inputUrl: string): { id: string; type: string } | null => {
      try {
        // Handle open.spotify.com URLs
        const urlObj = new URL(inputUrl)
        const pathParts = urlObj.pathname.split("/").filter(Boolean) // Remove empty strings
        if (urlObj.hostname === "open.spotify.com" && pathParts.length >= 2) {
          const type = pathParts[0] // e.g., 'playlist', 'track'
          const id = pathParts[1]
          const validTypes = ["playlist", "track", "album", "artist", "episode", "show"]
          if (validTypes.includes(type)) {
            return { id, type }
          }
        }

        // Handle spotify: URI format
        const uriParts = inputUrl.split(":")
        if (uriParts.length === 3 && uriParts[0] === "spotify") {
          const type = uriParts[1]
          const id = uriParts[2]
          const validTypes = ["playlist", "track", "album", "artist", "episode", "show"]
          if (validTypes.includes(type)) {
            return { id, type }
          }
        }
      } catch (e) {
        // Invalid URL
      }
      return null
    }

    const spotifyItem = getSpotifyIdAndTypeFromUrl(url)

    if (!spotifyItem) {
      return null // Or return an error message/placeholder
    }

    const defaultHeight = spotifyItem.type === "track" ? "152" : "352"
    const finalHeight = height || defaultHeight

    return `<iframe style="border-radius:12px" src="https://open.spotify.com/embed/${spotifyItem.type}/${spotifyItem.id}?utm_source=generator" width="${width}" height="${finalHeight}" frameBorder="0" allowfullscreen="" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>`
  }, [url, width, height])

  if (!embedHtml) {
    return (
      <div className="text-red-500 text-sm">
        Invalid Spotify URL. Please provide a valid link for a playlist, song, album, artist, podcast, or show.
      </div>
    )
  }

  return <div dangerouslySetInnerHTML={{ __html: embedHtml }} />
}
