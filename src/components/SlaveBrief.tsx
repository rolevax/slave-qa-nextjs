import { Box, Button, Skeleton, Typography } from "@mui/material";

export default function SlaveBrief(props: { showSlavePageButton: boolean }) {
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      paddingTop={2}
      paddingBottom={2}
    >
      <Skeleton
        animation={false}
        variant="rectangular"
        width={100}
        height={150}
        sx={{ mr: 4 }}
      />
      <Box flexDirection="column">
        <Typography variant="h5">my info</Typography>
        <Typography color="secondary">my info</Typography>
        <Typography color="secondary">Master: 0x11...4514</Typography>
        <Typography color="secondary">Slaves: 5</Typography>
        {props.showSlavePageButton && (
          <Button variant="contained">Slave Page</Button>
        )}
      </Box>
    </Box>
  );
}
