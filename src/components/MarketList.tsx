import { shortAddr } from "@/util";
import {
  Box,
  Grid,
  List,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
  Skeleton,
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
  }[];
}) {
  let items = [];
  for (let slave of props.slaves) {
    items.push(
      <Grid key={slave.self} size={4}>
        <ListItemButton href={`/slave/${slave.self}`}>
          <Skeleton
            animation={false}
            variant="rectangular"
            width={80}
            height={120}
            sx={{ mr: 2 }}
          />
          <ListItemText
            primary={shortAddr(slave.self)}
            secondary={slave.desc}
          />
        </ListItemButton>
      </Grid>
    );
  }

  return (
    <Grid container spacing={2} padding={1}>
      {items}
    </Grid>
  );
}
