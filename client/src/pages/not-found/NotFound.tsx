import { Box, Typography } from "@mui/material";

export default function NotFound() {
  return (
    <Box sx={{ m: "auto" }}>
      <Typography variant="h4" data-testid="page-NotFound">
        Page not found.
      </Typography>
    </Box>
  );
}
