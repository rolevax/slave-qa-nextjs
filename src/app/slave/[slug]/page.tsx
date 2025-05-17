"use client";

import SlaveBrief from "@/components/SlaveBrief";
import { wagmiContractConfig } from "@/contracts";
import { shortAddr } from "@/util";
import { ArrowBack, ChatSharp } from "@mui/icons-material";
import {
  AppBar,
  Box,
  Button,
  Container,
  FormControl,
  Grid,
  IconButton,
  Input,
  InputAdornment,
  InputLabel,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  TextField,
  Toolbar,
  Typography,
} from "@mui/material";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useQueryClient } from "@tanstack/react-query";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Address, NonceTooHighError } from "viem";
import { useAccount, useReadContract, useWriteContract } from "wagmi";

export default function Slave() {
  const pathname = usePathname();
  let slaveAddress = pathname.substring(
    pathname.lastIndexOf("/") + 1
  ) as Address;

  const {
    data: slave,
    error,
    isPending,
  } = useReadContract({
    ...wagmiContractConfig,
    functionName: "getOrDefault",
    args: [slaveAddress],
  });

  if (isPending) {
    return <div>Loading...</div>;
  }

  if (!slave) {
    return <div>Slave Not Found</div>;
  }

  return (
    <Container maxWidth="lg">
      <Box sx={{ width: "100%", flexGrow: 1 }}>
        <SlaveAppBar slaveAddress={slaveAddress} />
        <SlaveBody slave={slave} />
      </Box>
    </Container>
  );
}

function SlaveAppBar(props: { slaveAddress: Address }) {
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
          Slave {shortAddr(props.slaveAddress)}
        </Typography>
        <ConnectButton />
      </Toolbar>
    </AppBar>
  );
}

function SlaveBody(props: {
  slave: {
    self: `0x${string}`;
    desc: string;
    price: bigint;
    master: `0x${string}`;
    slaves: readonly `0x${string}`[];
    chats: readonly {
      who: `0x${string}`;
      content: string;
      price: bigint;
    }[];
  };
}) {
  const { address } = useAccount();

  const slave = props.slave;
  let inputBox;
  if (address == slave.self) {
    if (slave.master == "0x0000000000000000000000000000000000000000") {
      inputBox = <SelfNotSlaveInput initPrice={slave.price} />;
    } else {
      inputBox = <SelfSlaveInput />;
    }
  } else {
    if (slave.master == address) {
      inputBox = <OwningInput address={slave.self} price={slave.price} />;
    } else {
      inputBox = <NotOwningInput address={slave.self} price={slave.price} />;
    }
  }

  return (
    <Box>
      <SlaveBrief slaveAddress={slave.self} showSlavePageButton={false} />
      <ChatList chats={slave.chats} user={address} />
      {inputBox}
      <Box minHeight={200} />
    </Box>
  );
}

function ChatList(props: {
  chats: readonly {
    who: `0x${string}`;
    content: string;
    price: bigint;
  }[];
  user: `0x${string}` | undefined;
}) {
  let items = [];
  for (let i = 0; i < props.chats.length; i++) {
    let chat = props.chats[i];
    let item;
    if (chat.price > 0) {
      item = (
        <ListItem key={i}>
          <ListItemText
            primary={`${
              chat.content == "buy" ? "Bought for" : "Set price to"
            } ${chat.price}`}
            secondary={shortAddr(chat.who)}
          />
        </ListItem>
      );
    } else {
      item = (
        <ListItem key={i}>
          <ListItemAvatar>{chat.who.substring(0, 4)}</ListItemAvatar>
          <ListItemText
            primary={chat.content}
            secondary={shortAddr(chat.who)}
          />
        </ListItem>
      );
    }

    items.push(item);
  }
  return <List>{items}</List>;
}

function SelfNotSlaveInput(props: { initPrice: bigint }) {
  const [price, setPrice] = useState(
    props.initPrice == BigInt(0) ? BigInt(1000000000) : props.initPrice
  );
  const queryClient = useQueryClient();
  const { data: hash, error, isPending, writeContract } = useWriteContract();

  async function submit() {
    writeContract({
      ...wagmiContractConfig,
      functionName: "sellSelf",
      args: [price, "desc"],
    });
  }

  if (hash) {
    queryClient.invalidateQueries();
  }

  return (
    <Box>
      <Grid
        container
        spacing={2}
        direction="row"
        justifyContent="start"
        alignItems="center"
      >
        <FormControl sx={{ m: 1 }} variant="standard">
          <InputLabel htmlFor="standard-adornment-amount">Price</InputLabel>
          <Input
            id="standard-adornment-amount"
            startAdornment={<InputAdornment position="start">$</InputAdornment>}
            value={price}
            onChange={(e) => {
              let s = e.target.value;
              setPrice(BigInt(s));
            }}
            disabled={isPending}
          />
        </FormControl>
        <Button variant="contained" onClick={submit} disabled={isPending}>
          {props.initPrice == BigInt(0) ? "Be a Slave" : "Update Price"}
        </Button>
      </Grid>
    </Box>
  );
}

function SelfSlaveInput() {
  return (
    <Box>
      <TextField
        label="Answer"
        fullWidth
        sx={{ pb: 1 }}
        // rows={2}
        // value={props.content}
        // onChange={(e) => props.onContentChanged?.(e.target.value)}
        // disabled={!props.onContentChanged}
      />
      <Button variant="contained">Send</Button>
    </Box>
  );
}

function OwningInput(props: { address: `0x${string}`; price: bigint }) {
  const [content, setContent] = useState("");
  const [price, setPrice] = useState(
    props.price == BigInt(0) ? BigInt(1000000000) : props.price
  );
  const queryClient = useQueryClient();
  const { data: hash, error, isPending, writeContract } = useWriteContract();

  async function sell() {
    writeContract({
      ...wagmiContractConfig,
      functionName: "sellSlave",
      args: [props.address, price],
    });
  }

  async function chat() {
    writeContract({
      ...wagmiContractConfig,
      functionName: "askSlave",
      args: [props.address, content],
    });
  }

  return (
    <Box>
      <Typography variant="h6" marginTop={3} marginBottom={1}>
        Asking
      </Typography>
      <TextField
        label="Question"
        fullWidth
        sx={{ pb: 1 }}
        value={content}
        onChange={(e) => setContent(e.target.value)}
        disabled={isPending}
      />
      <Button variant="contained" onClick={chat} disabled={isPending}>
        Send
      </Button>
      <Typography variant="h6" marginTop={3} marginBottom={1}>
        Selling
      </Typography>
      <Grid
        container
        spacing={2}
        direction="row"
        justifyContent="start"
        alignItems="center"
      >
        <FormControl sx={{ m: 1 }} variant="standard">
          <InputLabel htmlFor="standard-adornment-amount">Price</InputLabel>
          <Input
            id="standard-adornment-amount"
            startAdornment={<InputAdornment position="start">$</InputAdornment>}
            value={price}
            onChange={(e) => {
              let s = e.target.value;
              setPrice(BigInt(s));
            }}
            disabled={isPending}
          />
        </FormControl>
        <Button variant="contained" onClick={sell} disabled={isPending}>
          {props.price == BigInt(0) ? "Sell" : "Update Price"}
        </Button>
      </Grid>
    </Box>
  );
}

function NotOwningInput(props: { address: `0x${string}`; price: bigint }) {
  const [content, setContent] = useState("");
  const queryClient = useQueryClient();
  const { data: hash, error, isPending, writeContract } = useWriteContract();

  async function submit() {
    writeContract({
      ...wagmiContractConfig,
      functionName: "buySlave",
      value: props.price,
      args: [props.address],
    });
  }

  if (hash) {
    queryClient.invalidateQueries();
  }

  return (
    <Box>
      <Typography variant="h6" marginTop={3} marginBottom={1}>
        Asking
      </Typography>
      <TextField
        fullWidth
        sx={{ pb: 1 }}
        value={content}
        placeholder="Buy to send message"
        onChange={(e) => setContent(e.target.value)}
        disabled={true}
      />
      <Button variant="contained" disabled={true}>
        Send
      </Button>
      <Typography variant="h6" marginTop={3} marginBottom={1}>
        Buying
      </Typography>
      <Grid
        container
        spacing={2}
        direction="row"
        justifyContent="start"
        alignItems="center"
      >
        <FormControl sx={{ m: 1 }} variant="standard">
          <InputLabel htmlFor="standard-adornment-amount">Price</InputLabel>
          <Input
            id="standard-adornment-amount"
            startAdornment={<InputAdornment position="start">$</InputAdornment>}
            value={props.price}
            disabled={true}
          />
        </FormControl>
        <Button variant="contained" onClick={submit} disabled={isPending}>
          Buy
        </Button>
      </Grid>
    </Box>
  );
}
