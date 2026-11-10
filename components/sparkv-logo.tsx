import Image from "next/image";

export function SparkVLogo({ className = "" }: { className?: string }) {
  return <Image className={`sparkv-logo ${className}`} src="/sparkv-logo.webp" alt="SparkV" width={2000} height={524} priority />;
}
