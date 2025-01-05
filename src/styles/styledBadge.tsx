import { Badge, BadgeProps, styled } from "@mui/material";

const StyledBadge = styled(Badge)<BadgeProps>(() => ({
  // "& .MuiBadge-badge": {
  // right: -3,
  border: `2px solid #D9D9D9`,
  padding: "0 4px",
  color: "white",
  backgroundColor: "#D9D9D9",
  // },
}));

export default StyledBadge;
