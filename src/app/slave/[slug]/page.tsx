"use client";

import SlaveBrief from "@/components/SlaveBrief";
import { ArrowBack } from "@mui/icons-material";
import {
  AppBar,
  Box,
  Container,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Toolbar,
  Typography,
} from "@mui/material";
import { usePathname } from "next/navigation";

export default function Slave() {
  const pathname = usePathname();
  let storyID = pathname.substring(pathname.lastIndexOf("/") + 1);

  return (
    <Container maxWidth="lg">
      <Box sx={{ width: "100%", flexGrow: 1 }}>
        <SlaveAppBar />
        <SlaveBody />
      </Box>
    </Container>
  );
}

function SlaveAppBar() {
  return (
    <AppBar position="sticky">
      <Toolbar>
        <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{ mr: 2 }}
          href="/"
        >
          <ArrowBack />
        </IconButton>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Slave
        </Typography>
        {/* <ConnectButton /> */}
      </Toolbar>
    </AppBar>
  );
}

function SlaveBody() {
  return (
    <Box>
      <SlaveBrief showSlavePageButton={false} />
      <ChatList />
    </Box>
  );
}

function ChatList() {
  let items = [];
  for (let i = 0; i < 10; i++) {
    items.push(
      <ListItem key={i}>
        <ListItemText primary="bla bla bla" secondary="0x11..4514" />
      </ListItem>
    );
  }
  return <List>{items}</List>;
}
