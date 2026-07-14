/* eslint-disable @next/next/no-img-element -- ImageResponse usa o elemento img conforme a API do Satori. */
import { readFile } from "node:fs/promises";
import { join } from "node:path";

import { ImageResponse } from "next/og";

import { profile } from "@/data/profile";
import { displaySiteAddress } from "@/lib/site-url";

export const alt = `Cartão profissional de ${profile.name}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function CardOpenGraphImage() {
  const photo = await readFile(join(process.cwd(), "public", "marco.jpeg"), "base64");

  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        background: "linear-gradient(135deg, #020817 0%, #08203b 58%, #020817 100%)",
        color: "white",
        padding: "58px 68px",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <div
        style={{
          width: 360,
          height: 510,
          display: "flex",
          overflow: "hidden",
          borderRadius: 34,
          border: "2px solid rgba(103,232,249,0.35)",
        }}
      >
        <img
          src={`data:image/jpeg;base64,${photo}`}
          alt=""
          width={360}
          height={510}
          style={{ objectFit: "cover", objectPosition: "top" }}
        />
      </div>
      <div style={{ display: "flex", flex: 1, flexDirection: "column", paddingLeft: 58 }}>
        <div
          style={{
            display: "flex",
            alignSelf: "flex-start",
            border: "1px solid rgba(103,232,249,0.35)",
            borderRadius: 999,
            color: "#67e8f9",
            fontSize: 20,
            padding: "10px 20px",
            textTransform: "uppercase",
            letterSpacing: 3,
          }}
        >
          Cartão profissional
        </div>
        <div style={{ display: "flex", marginTop: 24, fontSize: 52, fontWeight: 700, lineHeight: 1.04 }}>
          {profile.name}
        </div>
        <div style={{ display: "flex", marginTop: 22, color: "#a5f3fc", fontSize: 29, lineHeight: 1.22 }}>
          Perícia Digital, Computação Forense e Evidências Digitais
        </div>
        <div style={{ display: "flex", marginTop: 34, color: "#cbd5e1", fontSize: 22 }}>
          {displaySiteAddress("/cartao")}
        </div>
      </div>
    </div>,
    size,
  );
}
