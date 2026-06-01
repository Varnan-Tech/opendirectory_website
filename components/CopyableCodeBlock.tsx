"use client";

import React, { useMemo, useState } from "react";
import { Check, Copy } from "lucide-react";

interface CopyableCodeBlockProps {
  children?: React.ReactNode;
  code?: string;
  className?: string;
  buttonLabel?: string;
}

function getNodeText(node: React.ReactNode): string {
  if (typeof node === "string" || typeof node === "number") {
    return String(node);
  }

  if (Array.isArray(node)) {
    return node.map(getNodeText).join("");
  }

  if (React.isValidElement<{ children?: React.ReactNode }>(node)) {
    return getNodeText(node.props.children);
  }

  return "";
}

export function CopyableCodeBlock({
  children,
  code,
  className = "",
  buttonLabel = "Copy",
}: CopyableCodeBlockProps) {
  const [copied, setCopied] = useState(false);
  const textToCopy = useMemo(() => (code ?? getNodeText(children)).trim(), [children, code]);

  const copyToClipboard = () => {
    if (!textToCopy) return;

    void navigator.clipboard.writeText(textToCopy).then(() => {
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    });
  };

  return (
    <div className="group/code relative not-prose my-3 overflow-hidden rounded-xl border border-white/10 bg-black shadow-inner">
      <pre className={`m-0 overflow-x-auto whitespace-pre-wrap break-words bg-transparent p-4 pr-14 font-mono text-sm leading-relaxed text-white ${className}`}>
        {children ?? code}
      </pre>
      <button
        type="button"
        onClick={copyToClipboard}
        className="absolute right-2 top-2 inline-flex h-8 w-8 items-center justify-center rounded-lg border border-white/10 bg-white/10 text-white/75 backdrop-blur transition-all hover:bg-white/15 hover:text-white active:scale-95"
        aria-label={`${buttonLabel}: ${textToCopy}`}
        title={buttonLabel}
      >
        {copied ? <Check className="h-3.5 w-3.5 text-green-300" /> : <Copy className="h-3.5 w-3.5" />}
      </button>
    </div>
  );
}
