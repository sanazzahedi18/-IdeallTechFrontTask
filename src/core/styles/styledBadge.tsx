import { Badge, BadgeProps, styled } from "@mui/material";

const StyledBadge = styled(Badge)<BadgeProps>(() => ({
  border: `1px solid #D9D9D9`,
  padding: "0 2px",
  color: "white",
  backgroundColor: "#D9D9D9",

  // },
}));

export default StyledBadge;
