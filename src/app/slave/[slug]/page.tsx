"use client";

import SlaveBrief from "@/components/SlaveBrief";
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
import { Butterfly_Kids } from "next/font/google";
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
      <OwningInput />
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
