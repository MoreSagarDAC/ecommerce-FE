import { useCallback, useEffect, useState } from "react";
import {
  Box,
  Typography,
  Radio,
  TextField,
  Paper,
  Divider,
  Stack,
} from "@mui/material";

import Button from "../../framework/Button.jsx";
import {
  createNewAddress,
  getAllAddresses,
} from "../../services/order/address-services.js";
import { useSelector } from "react-redux";
import { displayToast } from "../../framework/displayToast.jsx";

const emptyForm = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  address: "",
  city: "",
  postalCode: "",
};

export const AddressContent = () => {
  const [addresses, setAddresses] = useState([]);

  const [selectedAddress, setSelectedAddress] = useState();

  const [showForm, setShowForm] = useState(false);

  const [formData, setFormData] = useState(emptyForm);

  const user = useSelector((state) => state.auth.user);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAddAddress = async () => {
    // const newAddress = {
    //   _id: Date.now(),
    //   ...formData,
    // };

    const payload = {
      ...formData,
      userId: user?.user?._id,
    };

    const resp = await createNewAddress(payload);
    displayToast({
      severity: "success",
      message: "Address saved successfully",
    });
    // setAddresses((prev) => [...prev, newAddress]);

    // // Select newly added address
    // setSelectedAddress(newAddress._id);

    // Reset form
    // setFormData(emptyForm);

    // Hide form
    setShowForm(false);
  };

  const getAllAddress = useCallback(async () => {
    console.log("here inside getAllAddress");
    const add = await getAllAddresses(user?.user?._id);
    setAddresses(add);
    setSelectedAddress(add[0]._id);
    console.log("add : ", add);
    return add;
  }, [user]);

  useEffect(() => {
    console.log("here inside useEffect");
    if (user) {
      getAllAddress();
    }
  }, [getAllAddress, user]);

  return (
    <Box>
      <Typography variant="h5" fontWeight={700} mb={3}>
        Delivery Address
      </Typography>

      {/* Saved Addresses */}
      <Stack spacing={2}>
        {addresses.map((item) => {
          const isSelected = selectedAddress === item._id;

          return (
            <Paper
              key={item._id}
              elevation={0}
              onClick={() => setSelectedAddress(item._id)}
              sx={{
                border: "2px solid",
                backgroundColor: "#e4ecf8",
                borderColor: isSelected ? "#37373b" : "grey.300",
                borderRadius: 2,
                p: 2,
                cursor: "pointer",
                transition: "0.2s",

                "&:hover": {
                  borderColor: "#37373b",
                },
              }}
            >
              <Box display="flex" alignItems="flex-start">
                <Radio
                  checked={isSelected}
                  onChange={() => setSelectedAddress(item._id)}
                  color="error"
                  sx={{
                    p: 0,
                    mr: 1.5,
                  }}
                />

                <Box>
                  <Typography fontWeight={700}>
                    {item.firstName} {item.lastName}
                  </Typography>

                  <Typography
                    variant="subtitle1"
                    color="text.secondary"
                    fontWeight={500}
                  >
                    {item.address}
                  </Typography>

                  <Typography variant="body2" color="text.secondary">
                    {item.city} - {item.postalCode}
                  </Typography>

                  <Typography variant="body2" color="text.secondary" mt={1}>
                    {item.phone}
                  </Typography>

                  <Typography variant="body2" color="text.secondary">
                    {item.email}
                  </Typography>
                </Box>
              </Box>
            </Paper>
          );
        })}
      </Stack>

      {!showForm && (
        <Button
          onClick={() => setShowForm(true)}
          label="+ Add New Address"
          color="blue"
          sx={{
            mt: 3,
          }}
        />
      )}

      {/* New Address Form */}
      {showForm && (
        <Paper
          elevation={0}
          sx={{
            mt: 3,
            p: { xs: 2, sm: 3 },
            border: "1px solid",
            borderColor: "grey.300",
            borderRadius: 2,
          }}
        >
          <Typography variant="h6" fontWeight={700} mb={2}>
            Add New Address
          </Typography>

          <Divider sx={{ mb: 3 }} />

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
              name="firstName"
              label="First Name"
              value={formData.firstName}
              onChange={handleChange}
              fullWidth
            />

            <TextField
              name="lastName"
              label="Last Name"
              value={formData.lastName}
              onChange={handleChange}
              fullWidth
            />

            <TextField
              name="email"
              label="Email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              fullWidth
            />

            <TextField
              name="phone"
              label="Phone"
              value={formData.phone}
              onChange={handleChange}
              fullWidth
            />

            <TextField
              name="address"
              label="Address"
              value={formData.address}
              onChange={handleChange}
              fullWidth
              multiline
              rows={2}
              sx={{
                gridColumn: {
                  sm: "1 / -1",
                },
              }}
            />

            <TextField
              name="city"
              label="City"
              value={formData.city}
              onChange={handleChange}
              fullWidth
            />

            <TextField
              name="postalCode"
              label="Postal Code"
              value={formData.postalCode}
              onChange={handleChange}
              fullWidth
            />
          </Box>

          {/* Form Buttons */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              gap: 2,
              mt: 3,
            }}
          >
            <Button
              onClick={() => {
                setShowForm(false);
                setFormData(emptyForm);
              }}
              label="Cancel"
              color="blue"
              // sx={{
              //   textTransform: "none",
              // }}
            />
            <Button
              onClick={handleAddAddress}
              label=" Save Address"
              color="blue"
              // sx={{
              //   textTransform: "none",
              //   fontWeight: 600,
              // }}
            />
          </Box>
        </Paper>
      )}
    </Box>
  );
};
