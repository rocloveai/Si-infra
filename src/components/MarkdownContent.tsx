"use client";

import ReactMarkdown from "react-markdown";
import { YoutubeEmbed, BilibiliEmbed, isYoutubeLink, isBilibiliLink } from "./VideoEmbed";

const linkRegex = /^(https?:\/\/[^\s]+)$/;

export function MarkdownContent({ content }: { content: string }) {
  return (
    <div className="markdown-body">
      <ReactMarkdown
        components={{
          a: ({ href, children }) => {
            if (!href) return <>{children}</>;
            const url = href.trim();
            if (isYoutubeLink(url)) return <YoutubeEmbed url={url} />;
            if (isBilibiliLink(url)) return <BilibiliEmbed url={url} />;
            return (
              <a href={href} target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">
                {children}
              </a>
            );
          },
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
