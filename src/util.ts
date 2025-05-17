import { formatEther } from "viem";

export function shortAddr(a: string) {
  return `${a.substring(0, 4)}...${a.substring(a.length - 4)}`;
}

export function isZeroAddr(a: string) {
  return a == "0x0000000000000000000000000000000000000000";
}

export function toEther(wei: bigint): string {
  return `Ξ ${formatEther(wei)}`;
}
