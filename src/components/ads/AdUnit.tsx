import { useEffect, useRef } from "react";
import { SITE } from "@/lib/site";
import { cn } from "@/lib/utils";

type AdUnitProps = {
  slot: string;
  label?: string;
  className?: string;
};

const LIVE =
  import.meta.env.PROD &&
  import.meta.env.VITE_ADSENSE_LIVE === "true" &&
  Boolean(SITE.pub);

export function AdUnit({ slot, label, className }: AdUnitProps) {
  const pushed = useRef(false);

  useEffect(() => {
    if (!LIVE || !slot || pushed.current) return;
    try {
      // @ts-expect-error adsbygoogle is injected
      (window.adsbygoogle = window.adsbygoogle || []).push({});
      pushed.current = true;
    } catch {
      /* empty until Ready */
    }
  }, [slot]);

  if (!LIVE) {
    return (
      <div
        className={cn(
          "flex min-h-[100px] items-center justify-center border border-dashed border-line bg-surface text-center text-xs text-faint",
          className,
        )}
        data-ad-slot={slot || "empty"}
        data-ad-live="false"
        aria-hidden="true"
      >
        {label || `Ad placeholder · ${slot}`}
      </div>
    );
  }

  if (!slot) return null;

  return (
    <div className={className} data-ad-live="true">
      <ins
        className="adsbygoogle"
        style={{ display: "block" }}
        data-ad-client={SITE.pub}
        data-ad-slot={slot}
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </div>
  );
}

export function AfterSuccessAd() {
  return (
    <AdUnit
      slot={import.meta.env.VITE_ADSENSE_SLOT_AFTER_SUCCESS || ""}
      label="After success"
      className="my-8"
    />
  );
}

export function MidContentAd() {
  return (
    <AdUnit
      slot={import.meta.env.VITE_ADSENSE_SLOT_MID || ""}
      label="Mid content"
      className="my-10"
    />
  );
}

export function FooterAd() {
  return (
    <AdUnit
      slot={import.meta.env.VITE_ADSENSE_SLOT_FOOTER || ""}
      label="Footer"
      className="mt-8 mb-4"
    />
  );
}
