import { TextField } from "@mui/material"

interface SearchbarProps {
  value: string;
  handleChange: (value: string) => void;
}

const Searchbar = ({value, handleChange}: SearchbarProps) => {
  return <TextField value={value} onChange={(event)=>handleChange(event.target.value)} placeholder="Search for a gif" size="small"/>;
};

export default Searchbar