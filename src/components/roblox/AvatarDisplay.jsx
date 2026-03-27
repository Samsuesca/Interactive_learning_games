import { useMemo } from "react";
import {
  HAIR_STYLES,
  FACE_STYLES,
  HAT_STYLES,
  GLASSES_STYLES,
} from "../../data/avatarParts";

function findPart(list, id) {
  return list.find((p) => p.id === id) || list[0];
}

export default function AvatarDisplay({ avatar, size = 120, glow = false }) {
  const scale = size / 120;
  const h = Math.round(160 * scale);
  const w = size;

  const svg = useMemo(() => {
    const a = avatar || {};
    const bodyColor = a.bodyColor || "#6C63FF";
    const shirtColor = a.shirtColor || "#ff1493";
    const hairColor = a.hairColor || "#6C63FF";

    const hair = findPart(HAIR_STYLES, a.hair);
    const face = findPart(FACE_STYLES, a.face);
    const hat = findPart(HAT_STYLES, a.hat);
    const glasses = findPart(GLASSES_STYLES, a.glasses);

    return `
      <!-- Body -->
      <rect x="36" y="70" width="48" height="50" rx="8" fill="${shirtColor}"/>
      <!-- Arms -->
      <rect x="20" y="74" width="18" height="36" rx="8" fill="${bodyColor}"/>
      <rect x="82" y="74" width="18" height="36" rx="8" fill="${bodyColor}"/>
      <!-- Legs -->
      <rect x="40" y="116" width="16" height="30" rx="6" fill="#1a1a3e"/>
      <rect x="64" y="116" width="16" height="30" rx="6" fill="#1a1a3e"/>
      <!-- Shoes -->
      <rect x="36" y="138" width="22" height="10" rx="5" fill="#667eea"/>
      <rect x="62" y="138" width="22" height="10" rx="5" fill="#667eea"/>
      <!-- Head -->
      <rect x="32" y="22" width="56" height="52" rx="14" fill="${bodyColor}"/>
      <!-- Face -->
      ${face.render()}
      <!-- Hair -->
      ${hair.render(hairColor)}
      <!-- Hat -->
      ${hat.render(bodyColor)}
      <!-- Glasses -->
      ${glasses.render()}
    `;
  }, [avatar]);

  return (
    <div
      style={{
        display: "inline-block",
        filter: glow ? "drop-shadow(0 0 12px rgba(102,126,234,0.6))" : "none",
        transition: "filter 0.3s",
      }}
    >
      <svg
        width={w}
        height={h}
        viewBox="0 0 120 160"
        xmlns="http://www.w3.org/2000/svg"
        dangerouslySetInnerHTML={{ __html: svg }}
      />
    </div>
  );
}
