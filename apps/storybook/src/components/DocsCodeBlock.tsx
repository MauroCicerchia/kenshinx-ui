import * as React from "react";
import { Check, Copy } from "lucide-react";
import { Button } from "@kenshinx/ui";

interface DocsCodeBlockProps {
  code: string;
}

export function DocsCodeBlock({ code }: DocsCodeBlockProps) {
  const [copied, setCopied] = React.useState(false);

  const handleCopy = React.useCallback(async () => {
    if (typeof navigator === "undefined" || !navigator.clipboard) {
      return;
    }

    await navigator.clipboard.writeText(code);
    setCopied(true);

    window.setTimeout(() => {
      setCopied(false);
    }, 1500);
  }, [code]);

  return (
    <div className="kx-docs-code-block">
      <Button
        className="kx-docs-copy-button"
        onClick={handleCopy}
        size="sm"
        type="button"
        variant="outline"
      >
        {copied ? <Check /> : <Copy />}
        {copied ? "Copied" : "Copy"}
      </Button>
      <pre className="kx-docs-code">
        <code>{code}</code>
      </pre>
    </div>
  );
}
