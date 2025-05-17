import { shortAddr, toEther } from "@/util";
import { Box, Button, Grid, Skeleton, Typography } from "@mui/material";

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
        <Button fullWidth href={`/slave/${slave.self}`}>
          <Skeleton
            animation={false}
            variant="rectangular"
            width="25%"
            height={120}
            sx={{ mr: 2 }}
          />
          <Box flexDirection="column" width="75%">
            <Typography variant="subtitle1">{shortAddr(slave.self)}</Typography>
            <Typography variant="subtitle1">{toEther(slave.price)}</Typography>
            <Typography variant="subtitle2" color="secondary">
              {slave.desc}
            </Typography>
          </Box>
          {/* <ListItemText
            primary=
            secondary={}
          /> */}
        </Button>
      </Grid>
    );
  }

  return (
    <Grid container spacing={2} padding={1}>
      {items}
    </Grid>
  );
}
