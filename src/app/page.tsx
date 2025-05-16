import * as React from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import NextLink from 'next/link';
import { AppBar, Button, IconButton, Toolbar } from '@mui/material';
import { Menu } from '@mui/icons-material';
import MyBrief from '../components/MyBrief';
import MarketList from '@/components/MarketList';

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
          Market
        </Typography>
        <Button component={NextLink} href="/about">
          About
        </Button>
        {/* <ConnectButton /> */}
      </Toolbar>
    </AppBar>
  );
}

function HomeBody() {
  return (
    <Box>
      <MyBrief />
      <MarketList />
    </Box>
  );
}