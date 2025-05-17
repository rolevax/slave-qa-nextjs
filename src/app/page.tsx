"use client";

import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { AppBar, Button, IconButton, Tab, Tabs, Toolbar } from "@mui/material";
import { Menu } from "@mui/icons-material";
import SlaveBrief from "../components/SlaveBrief";
import MarketList from "@/components/MarketList";
import { useState } from "react";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useAccount, useReadContract } from "wagmi";
import { shortAddr } from "@/util";
import { wagmiContractConfig } from "@/contracts";

export default function Home() {
  return (
    <Container maxWidth="lg">
      <Box sx={{ width: "100%", flexGrow: 1 }}>
        <HomeAppBar />
        <HomeBody />
      </Box>
    </Container>
  );
}

function HomeAppBar() {
  return (
    <AppBar position="sticky">
      <Toolbar>
        <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{ mr: 2 }}
        >
          <Menu />
        </IconButton>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Slave Q&A
        </Typography>
        <ConnectButton />
      </Toolbar>
    </AppBar>
  );
}

function HomeBody() {
  const [value, setValue] = useState(0);
  const { address } = useAccount();
  const {
    data: slaves,
    error,
    isPending,
  } = useReadContract({
    ...wagmiContractConfig,
    functionName: "getSlaves",
    args: [],
  });

  let marketSlaves = slaves?.filter((s) => s.price > 0);
  let mySlaves = slaves?.filter((s) => s.master == address);

  const tabContent = [
    mySlaves ? <MarketList slaves={mySlaves} /> : <div>loading</div>,
    marketSlaves ? <MarketList slaves={marketSlaves} /> : <div>loading</div>,
  ][value];
  let brief = address ? (
    <SlaveBrief slaveAddress={address} showSlavePageButton={true} />
  ) : (
    <Typography align="center" variant="h6" marginTop={4} marginBottom={2}>
      Please Connect
    </Typography>
  );
  return (
    <Box>
      {brief}
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={(e, v) => setValue(v)}
          aria-label="basic tabs example"
        >
          <Tab label="My Slaves" />
          <Tab label="Slave Market" />
        </Tabs>
      </Box>
      {tabContent}
    </Box>
  );
}
