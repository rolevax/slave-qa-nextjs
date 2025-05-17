"use client";

import { wagmiContractConfig } from "@/contracts";
import { shortAddr } from "@/util";
import { Box, Button, Skeleton, Typography } from "@mui/material";
import { useReadContract } from "wagmi";

export default function SlaveBrief(props: {
  slaveAddress: `0x${string}`;
  showSlavePageButton: boolean;
}) {
  const {
    data: slave,
    error,
    isPending,
  } = useReadContract({
    ...wagmiContractConfig,
    functionName: "getOrDefault",
    args: [props.slaveAddress],
  });

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      paddingTop={2}
      paddingBottom={2}
    >
      <Skeleton
        animation={false}
        variant="rectangular"
        width={100}
        height={150}
        sx={{ mr: 4 }}
      />
      <Box flexDirection="column">
        <Typography variant="h5">{shortAddr(props.slaveAddress)}</Typography>
        <Typography color="secondary">{slave?.desc}</Typography>
        <Typography color="secondary">
          Master: {slave?.master ? shortAddr(slave.master) : ""}
        </Typography>
        <Typography color="secondary">
          # of Slaves: {slave?.slaves.length}
        </Typography>
        {props.showSlavePageButton && (
          <Button variant="contained" href={`/slave/${props.slaveAddress}`}>
            Slave Page
          </Button>
        )}
      </Box>
    </Box>
  );
}
