interface CodeSnippetProps {
  filename: string;
  children: string;
}

/**
 * CodeSnippet — renders a styled code block with a filename header.
 *
 * Intentionally no third-party syntax highlighter — colour is applied via
 * span wrapping at the call site for the lines that matter. The component
 * only owns layout and the chrome around the code.
 */
export function CodeSnippet({ filename, children }: CodeSnippetProps) {
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
        <span className="text-[10px] font-mono tracking-widest uppercase" style={{ color: "rgba(148,163,184,0.18)" }}>
          typescript
        </span>
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
