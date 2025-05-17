import { FormControl, Input, InputAdornment, InputLabel } from "@mui/material";

export default function PriceInput(props: {
  value: bigint;
  onChange?: (v: bigint) => void;
  disabled: boolean;
}) {
  return (
    <FormControl sx={{ m: 1 }} variant="standard">
      <InputLabel htmlFor="standard-adornment-amount">Price</InputLabel>
      <Input
        id="standard-adornment-amount"
        startAdornment={<InputAdornment position="start">Ξ</InputAdornment>}
        endAdornment={<InputAdornment position="end">wei</InputAdornment>}
        value={props.value}
        onChange={(e) => {
          let s = e.target.value;
          props.onChange?.(BigInt(s));
        }}
        disabled={props.disabled}
      />
    </FormControl>
  );
}
