import { Box, Typography, TextField } from "@mui/material";

export const PaymentContent = () => (
  <Box>
    <Typography variant="h5" fontWeight={700} mb={3}>
      Payment
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
      <TextField
        label="Cardholder Name"
        fullWidth
        sx={{
          gridColumn: {
            sm: "1 / -1",
          },
        }}
      />

      <TextField
        label="Card Number"
        fullWidth
        sx={{
          gridColumn: {
            sm: "1 / -1",
          },
        }}
      />

      <TextField label="Expiry Date" fullWidth />

      <TextField label="CVV" fullWidth />
    </Box>
  </Box>
);
