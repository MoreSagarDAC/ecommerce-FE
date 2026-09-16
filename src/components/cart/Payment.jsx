import { Box, Typography, TextField } from "@mui/material";
import CustomDatePicker from "../../framework/CustomDatepicker.jsx";
import { useState } from "react";

export const PaymentContent = () => {
  const [expiryDate, setExpiryDate] = useState(null);
  return (
    <div>
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

          <CustomDatePicker
            label="Expiry"
            format="MM/YY"
            views={["year", "month"]}
            value={expiryDate}
            onChange={(newValue) => setExpiryDate(newValue)}
          />

          <TextField label="CVV" fullWidth />
        </Box>
      </Box>
    </div>
  );
};
