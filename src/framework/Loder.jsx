import Stack from "@mui/material/Stack";
import CircularProgress from "@mui/material/CircularProgress";

export default function CircularColor() {
  return (
    <Stack spacing={2} direction="row">
      <CircularProgress size="3rem" color="#082344" aria-label="Loading…" />
      {/* <CircularProgress color="success" aria-label="Loading…" />
      <CircularProgress color="inherit" aria-label="Loading…" /> */}
    </Stack>
  );
}
