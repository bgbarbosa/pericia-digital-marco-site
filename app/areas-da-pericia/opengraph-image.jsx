/* eslint-disable @next/next/no-img-element -- ImageResponse usa img conforme a API do Satori. */
import { readFile } from "node:fs/promises";
import { join } from "node:path";

import { ImageResponse } from "next/og";

import { profile } from "@/data/profile";
import { guide } from "@/lib/forensics";

export const alt = guide.title;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function GuideOpenGraphImage() {
  const logo = await readFile(join(process.cwd(), "public/marca/marco-barbosa-logo-oficial.jpg"), "base64");

  return new ImageResponse(
    <div style={{
      width: "100%",
      height: "100%",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      padding: "64px 76px",
      background: "linear-gradient(120deg, #020817, #071a33)",
      color: "white",
      fontFamily: "Arial, sans-serif",
    }}>
      <img src={`data:image/jpeg;base64,${logo}`} alt={profile.displayName} width={255} height={85} style={{ objectFit: "contain" }} />
      <div style={{ display: "flex", marginTop: 48, color: "#67e8f9", fontSize: 26 }}>Guia técnico</div>
      <div style={{ display: "flex", marginTop: 14, fontSize: 66, maxWidth: 900 }}>{guide.title}</div>
      <div style={{ display: "flex", marginTop: 22, fontSize: 27, color: "#cbd5e1", maxWidth: 900 }}>{guide.description}</div>
    </div>,
    size,
  );
}
