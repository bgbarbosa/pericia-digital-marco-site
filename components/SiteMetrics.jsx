"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { articlePrefix, metricReferrer, metricsOptOut, metricsOrigin } from "@/lib/metrics";

function sendMetric(event, path, source) {
  if (metricsOptOut()) return;
  void fetch("/api/medicao", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ event, path, source }),
    keepalive: true,
    credentials: "omit",
    referrerPolicy: "origin",
  }).catch(() => {});
}

function clickEvent(target, path) {
  if (!(target instanceof Element)) return null;
  if (target.closest("[data-metrics-contact]")) return "contact_click";
  const anchor = target.closest("a[href]");
  if (!(anchor instanceof HTMLAnchorElement)) return null;
  const destination = new URL(anchor.href);
  if (destination.protocol === "mailto:" || destination.hostname === "wa.me") return "contact_click";
  if (destination.origin !== metricsOrigin) return null;
  if (destination.pathname === "/contato") return "contact_click";
  if (!path.startsWith(articlePrefix)) return null;
  if (destination.pathname === "/areas-da-pericia") return "guide_click";
  if (destination.pathname === "/perfil") return "profile_click";
  return null;
}

export default function SiteMetrics({ paths }) {
  const pathname = usePathname();
  const previous = useRef(null);
  const tracked = paths.includes(pathname);

  useEffect(() => {
    if (!pathname || window.location.origin !== metricsOrigin) return;
    function recordView() {
      if (document.visibilityState !== "visible" || pathname === previous.current) return;
      const source = previous.current ? "internal" : metricReferrer(document.referrer);
      previous.current = pathname;
      if (tracked) sendMetric("view", pathname, source);
    }
    recordView();
    document.addEventListener("visibilitychange", recordView);
    return () => document.removeEventListener("visibilitychange", recordView);
  }, [pathname, tracked]);

  useEffect(() => {
    if (!tracked || window.location.origin !== metricsOrigin) return;
    function recordClick(event) {
      const metric = clickEvent(event.target, pathname);
      if (metric) sendMetric(metric, pathname, "internal");
    }
    document.addEventListener("click", recordClick, true);
    return () => document.removeEventListener("click", recordClick, true);
  }, [pathname, tracked]);

  return null;
}
