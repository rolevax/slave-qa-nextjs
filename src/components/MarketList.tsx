import { shortAddr } from "@/util";
import {
  Box,
  List,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
  Typography,
} from "@mui/material";

export default function MarketList(props: {
  slaves: {
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
  }[]
}) {
  let items = [];
  for (let slave of props.slaves) {
    items.push(
      <ListItem key={slave.self}>
        <ListItemButton href={`/slave/${slave.self}`}>
          <ListItemAvatar>N</ListItemAvatar>
          <ListItemText primary={shortAddr(slave.self)} secondary={slave.desc} />
        </ListItemButton>
      </ListItem>
    );
  }

  return (
    <Box>
      <List>{items}</List>
    </Box>
  );
}
