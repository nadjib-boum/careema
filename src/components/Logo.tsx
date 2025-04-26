import Link from "next/link";
import { Sour_Gummy } from "next/font/google";
import { HeartPulse } from "lucide-react";

const logoFont = Sour_Gummy({
  variable: "--font-logo-font",
  weight: ["400"],
});

const Logo = ({ size, secondaryColor = "#555" }: { size?: "sm" | "md", secondaryColor?: string }) => {

  const fontSize = size === "sm" ? "1.5rem" : "2.5rem";

  return (
    <Link href="/">
      <div>
        <div className={`${logoFont.className} flex items-center justify-center gap-.5`}>
          <HeartPulse color={"var(--color-1)"} size={40} />
          <div style={{ fontSize, fontWeight: "bold" }}>
            <span style={{ color: "var(--color-1)" }}>Care</span>
            <span style={{ color: secondaryColor }}>ema</span>
          </div>
        </div>
      </div>
    </Link>
  );

}

export default Logo;
