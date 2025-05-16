import {
  Box,
  List,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
  Typography,
} from "@mui/material";

export default function MarketList() {
  let items = [];
  for (let i = 0; i < 10; i++) {
    items.push(
      <ListItem key={i}>
        <ListItemButton href={`/slave/${i}`}>
          <ListItemAvatar>N</ListItemAvatar>
          <ListItemText primary="pppp" secondary="sss ss sss" />
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
