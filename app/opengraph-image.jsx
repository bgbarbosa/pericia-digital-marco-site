/* eslint-disable @next/next/no-img-element -- ImageResponse usa o elemento img conforme a API do Satori. */
import { readFile } from "node:fs/promises";
import { join } from "node:path";

import { ImageResponse } from "next/og";

import { profile } from "@/data/profile";
import { displaySiteAddress } from "@/lib/site-url";

export const alt = `${profile.name} — Perícia Digital e Computação Forense`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpenGraphImage() {
  const photo = await readFile(join(process.cwd(), "public", "marco.jpeg"), "base64");

  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        background: "linear-gradient(120deg, #020817 0%, #071a33 55%, #020817 100%)",
        color: "white",
        padding: "58px 66px",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <div style={{ display: "flex", flex: 1, flexDirection: "column", paddingRight: 54 }}>
        <div
          style={{
            display: "flex",
            color: "#67e8f9",
            fontSize: 22,
            letterSpacing: 4,
            textTransform: "uppercase",
          }}
        >
          Perícia digital e tecnologia forense
        </div>
        <div style={{ display: "flex", marginTop: 22, fontSize: 56, fontWeight: 700, lineHeight: 1.05 }}>
          {profile.name}
        </div>
        <div style={{ display: "flex", marginTop: 24, color: "#a5f3fc", fontSize: 31, lineHeight: 1.2 }}>
          Perícia Digital, Computação Forense e Evidências Digitais
        </div>
        <div style={{ display: "flex", marginTop: 36, color: "#cbd5e1", fontSize: 22 }}>
          {displaySiteAddress()}
        </div>
      </div>
      <div
        style={{
          width: 350,
          height: 500,
          display: "flex",
          overflow: "hidden",
          borderRadius: 34,
          border: "2px solid rgba(103,232,249,0.35)",
          boxShadow: "0 0 55px rgba(8,145,178,0.22)",
        }}
      >
        <img
          src={`data:image/jpeg;base64,${photo}`}
          alt=""
          width={350}
          height={500}
          style={{ objectFit: "cover", objectPosition: "top" }}
        />
      </div>
    </div>,
    size,
  );
}
