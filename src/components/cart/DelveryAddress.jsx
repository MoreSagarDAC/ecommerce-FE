import { Box, Typography, TextField } from "@mui/material";

export const AddressContent = () => (
  <Box>
    <Typography variant="h5" fontWeight={700} mb={3}>
      Delivery Address
    </Typography>

    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: {
          xs: "1fr",
          sm: "1fr 1fr",
        },
        gap: 2,
      }}
    >
      <TextField label="First Name" fullWidth />

      <TextField label="Last Name" fullWidth />

      <TextField label="Email" fullWidth />

      <TextField label="Phone" fullWidth />

      <TextField
        label="Address"
        fullWidth
        sx={{
          gridColumn: {
            sm: "1 / -1",
          },
        }}
      />

      <TextField label="City" fullWidth />

      <TextField label="Postal Code" fullWidth />
    </Box>
  </Box>
);
