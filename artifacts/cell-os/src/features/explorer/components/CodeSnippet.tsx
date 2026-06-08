interface CodeSnippetProps {
  filename: string;
  language?: string;
  sourceUrl?: string;
  children: string;
}

/**
 * CodeSnippet — renders a styled code block with a filename header.
 *
 * Pass `sourceUrl` to add a live "↗ view source" link to the actual
 * repository (android.googlesource.com, github.com, etc.).
 * Pass `language` to override the label in the top-right corner.
 *
 * Intentionally no third-party syntax highlighter — colour is applied
 * via span wrapping at the call site for the lines that matter.
 */
export function CodeSnippet({ filename, language = "typescript", sourceUrl, children }: CodeSnippetProps) {
  return (
    <div
      className="rounded-xl overflow-hidden border border-white/[0.06]"
      style={{ background: "#06060c" }}
    >
      {/* Header bar */}
      <div
        className="flex items-center justify-between px-4 py-2.5 border-b border-white/[0.05]"
        style={{ background: "#09090f" }}
      >
        <span className="text-[11px] font-mono tracking-wide" style={{ color: "rgba(148,163,184,0.45)" }}>
          {filename}
        </span>

        <div className="flex items-center gap-3">
          <span className="text-[10px] font-mono tracking-widest uppercase" style={{ color: "rgba(148,163,184,0.18)" }}>
            {language}
          </span>

          {sourceUrl && (
            <a
              href={sourceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-[10px] font-mono tracking-wide transition-colors duration-300"
              style={{ color: "rgba(148,163,184,0.28)" }}
              onMouseEnter={e => (e.currentTarget.style.color = "rgba(148,163,184,0.75)")}
              onMouseLeave={e => (e.currentTarget.style.color = "rgba(148,163,184,0.28)")}
            >
              <span>↗ view source</span>
            </a>
          )}
        </div>
      </div>

      {/* Code body */}
      <pre
        className="overflow-x-auto px-5 py-4 text-[12px] leading-[1.75] font-mono"
        style={{ color: "#7b8fb0" }}
      >
        <code>{children}</code>
      </pre>
    </div>
  );
}
