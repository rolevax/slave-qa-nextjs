"use client";

import SlaveBrief from "@/components/SlaveBrief";
import { wagmiContractConfig } from "@/contracts";
import { shortAddr } from "@/util";
import { ArrowBack } from "@mui/icons-material";
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
  ListItemText,
  TextField,
  Toolbar,
  Typography,
} from "@mui/material";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { usePathname } from "next/navigation";
import { Address, NonceTooHighError } from "viem";
import { useAccount, useReadContract } from "wagmi";

export default function Slave() {
  const pathname = usePathname();
  let slaveAddress = pathname.substring(pathname.lastIndexOf("/") + 1) as Address;

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
          Slave {props.slaveAddress.toWellFormed()}
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
  }
}) {
  const { address } = useAccount();

  const slave = props.slave;
  let inputBox;
  if (address == slave.self) {
    if (slave.master == '0x0000000000000000000000000000000000000000') {
      inputBox = <SelfNotSlaveInput />;
    } else {
      inputBox = <SelfSlaveInput />;
    }
  } else {
    if (slave.master == address) {
      inputBox = <OwningInput />;
    } else {
      inputBox = <NotOwningInput />;
    }
  }

  return (
    <Box>
      <SlaveBrief slaveAddress={slave.self} showSlavePageButton={false} />
      <ChatList />
      {inputBox}
      <Box minHeight={200} />
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

function SelfNotSlaveInput() {
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
          // value={props.price}
          // onChange={(e) => {
          //   let s = e.target.value;
          //   props.onPriceChanged?.(BigInt(s));
          // }}
          // disabled={!props.onPriceChanged}
          />
        </FormControl>
        <Button
          variant="contained"
          type="submit"
        // disabled={props.isPending}
        >
          Be a Slave
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

function OwningInput() {
  return (
    <Box>
      <Typography variant="h6" marginTop={3} marginBottom={1}>
        Asking
      </Typography>
      <TextField
        label="Question"
        fullWidth
        sx={{ pb: 1 }}
      // rows={2}
      // value={props.content}
      // onChange={(e) => props.onContentChanged?.(e.target.value)}
      // disabled={!props.onContentChanged}
      />
      <Button variant="contained">Send</Button>
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
          // value={props.price}
          // onChange={(e) => {
          //   let s = e.target.value;
          //   props.onPriceChanged?.(BigInt(s));
          // }}
          // disabled={!props.onPriceChanged}
          />
        </FormControl>
        <Button
          variant="contained"
          type="submit"
        // disabled={props.isPending}
        >
          Sell
        </Button>
      </Grid>
    </Box>
  );
}

function NotOwningInput() {
  return (
    <Box>
      <Typography variant="h6" marginTop={3} marginBottom={1}>
        Asking
      </Typography>
      <TextField
        label="Question"
        fullWidth
        sx={{ pb: 1 }}
        // rows={2}
        // value={props.content}
        // onChange={(e) => props.onContentChanged?.(e.target.value)}
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
            // value={props.price}
            // onChange={(e) => {
            //   let s = e.target.value;
            //   props.onPriceChanged?.(BigInt(s));
            // }}
            disabled={true}
          />
        </FormControl>
        <Button
          variant="contained"
          type="submit"
        // disabled={props.isPending}
        >
          Buy
        </Button>
      </Grid>
    </Box>
  );
}
