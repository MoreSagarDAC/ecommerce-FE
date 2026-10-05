import React from "react";
import { Box, Typography } from "@mui/material";
import CustomChip from "../../framework/CustomChip.jsx";
import CustomTable from "../../framework/CustomTable.jsx";

const OrderList = () => {
  const handleDelete = () => {
    console.info("You clicked the delete icon.");
  };
  const orders = [
    {
      _id: "1",
      orderNumber: "ORD-1001",
      customer: "Rahul",
      items: 2,
      totalAmount: 2499,
      paymentStatus: "Paid",
      orderStatus: "Delivered",
      createdAt: "16 Sep 2026",
    },
    {
      _id: "2",
      orderNumber: "ORD-1002",
      customer: "Amit",
      items: 1,
      totalAmount: 899,
      paymentStatus: "Paid",
      orderStatus: "Processing",
      createdAt: "15 Sep 2026",
    },
    {
      _id: "3",
      orderNumber: "ORD-1003",
      customer: "Priya",
      items: 3,
      totalAmount: 4299,
      paymentStatus: "Failed",
      orderStatus: "Cancelled",
      createdAt: "14 Sep 2026",
    },
    {
      _id: "1",
      orderNumber: "ORD-1001",
      customer: "Rahul",
      items: 2,
      totalAmount: 2499,
      paymentStatus: "Paid",
      orderStatus: (
        <CustomChip
          label="Failed"
         
          onDelete={handleDelete}
        />
      ),
      createdAt: "16 Sep 2026",
    },
    {
      _id: "2",
      orderNumber: "ORD-1002",
      customer: "Amit",
      items: 1,
      totalAmount: 899,
      paymentStatus: "Paid",
      orderStatus: "Processing",
      createdAt: "15 Sep 2026",
    },
    {
      _id: "3",
      orderNumber: "ORD-1003",
      customer: "Priya",
      items: 3,
      totalAmount: 4299,
      paymentStatus: "Failed",
      orderStatus: "Cancelled",
      createdAt: "14 Sep 2026",
    },
    {
      _id: "1",
      orderNumber: "ORD-1001",
      customer: "Rahul",
      items: 2,
      totalAmount: 2499,
      paymentStatus: "Paid",
      orderStatus: "Delivered",
      createdAt: "16 Sep 2026",
    },
    {
      _id: "2",
      orderNumber: "ORD-1002",
      customer: "Amit",
      items: 1,
      totalAmount: 899,
      paymentStatus: "Paid",
      orderStatus: "Processing",
      createdAt: "15 Sep 2026",
    },
    {
      _id: "3",
      orderNumber: "ORD-1003",
      customer: "Priya",
      items: 3,
      totalAmount: 4299,
      paymentStatus: "Failed",
      orderStatus: "Cancelled",
      createdAt: "14 Sep 2026",
    },
    {
      _id: "1",
      orderNumber: "ORD-1001",
      customer: "Rahul",
      items: 2,
      totalAmount: 2499,
      paymentStatus: "Paid",
      orderStatus: "Delivered",
      createdAt: "16 Sep 2026",
    },
    {
      _id: "2",
      orderNumber: "ORD-1002",
      customer: "Amit",
      items: 1,
      totalAmount: 899,
      paymentStatus: "Paid",
      orderStatus: "Processing",
      createdAt: "15 Sep 2026",
    },
    {
      _id: "3",
      orderNumber: "ORD-1003",
      customer: "Priya",
      items: 3,
      totalAmount: 4299,
      paymentStatus: "Failed",
      orderStatus: "Cancelled",
      createdAt: "14 Sep 2026",
    },
    {
      _id: "1",
      orderNumber: "ORD-1001",
      customer: "Rahul",
      items: 2,
      totalAmount: 2499,
      paymentStatus: "Paid",
      orderStatus: "Delivered",
      createdAt: "16 Sep 2026",
    },
    {
      _id: "2",
      orderNumber: "ORD-1002",
      customer: "Amit",
      items: 1,
      totalAmount: 899,
      paymentStatus: "Paid",
      orderStatus: "Processing",
      createdAt: "15 Sep 2026",
    },
    {
      _id: "3",
      orderNumber: "ORD-1003",
      customer: "Priya",
      items: 3,
      totalAmount: 4299,
      paymentStatus: "Failed",
      orderStatus: "Cancelled",
      createdAt: "14 Sep 2026",
    },
    {
      _id: "1",
      orderNumber: "ORD-1001",
      customer: "Rahul",
      items: 2,
      totalAmount: 2499,
      paymentStatus: "Paid",
      orderStatus: "Delivered",
      createdAt: "16 Sep 2026",
    },
    {
      _id: "2",
      orderNumber: "ORD-1002",
      customer: "Amit",
      items: 1,
      totalAmount: 899,
      paymentStatus: "Paid",
      orderStatus: "Processing",
      createdAt: "15 Sep 2026",
    },
    {
      _id: "3",
      orderNumber: "ORD-1003",
      customer: "Priya",
      items: 3,
      totalAmount: 4299,
      paymentStatus: "Failed",
      orderStatus: "Cancelled",
      createdAt: "14 Sep 2026",
    },
  ];

  const columns = [
    {
      field: "orderNumber",
      headerName: "Order",
      nowrap: true,
    },
    {
      field: "customer",
      headerName: "Customer",
    },
    {
      field: "createdAt",
      headerName: "Date",
      nowrap: true,
    },
    {
      field: "items",
      headerName: "Items",
      align: "center",
    },
    {
      field: "totalAmount",
      headerName: "Total",
      render: (value) => `₹${value.toLocaleString()}`,
      nowrap: true,
    },
    {
      field: "paymentStatus",
      headerName: "Payment",
    },
    {
      field: "orderStatus",
      headerName: "Status",
    },
  ];

  return (
    <Box>
      <Typography variant="h5" fontWeight={700} sx={{ mb: 3 }}>
        Orders
      </Typography>

      <CustomTable columns={columns} data={orders} stickyHeader={true} />
    </Box>
  );
};

export default OrderList;
