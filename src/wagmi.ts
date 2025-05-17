import { getDefaultConfig } from "@rainbow-me/rainbowkit";
import { anvil, arbitrum, mainnet, sepolia } from "wagmi/chains";

export const config = getDefaultConfig({
  appName: "RainbowKit demo",
  projectId: "YOUR_PROJECT_ID",
  chains: [
    mainnet,
    arbitrum,
    anvil,
    // ...(process.env.NEXT_PUBLIC_ENABLE_TESTNETS === "true"
    //   ? [sepolia, anvil]
    //   : []),
  ],
  ssr: true,
});
