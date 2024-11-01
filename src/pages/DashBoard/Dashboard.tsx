import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  IconButton,
} from "@mui/material";
import {
  Home,
  ShoppingCart,
  ListAlt,
  People,
  AttachMoney,
} from "@mui/icons-material";

const cardColors = {
  home: "#2196f3", // Azul para Inicio
  sales: "#4caf50", // Verde para Ventas
  orders: "#ff9800", // Naranja para Órdenes
  customers: "#9c27b0", // Morado para Clientes
  payments: "#f44336", // Rojo para Pagos
};

export const DashboardPage = () => {
  const navigate = useNavigate(); // Cambio a useNavigate

  // Definición de opciones del dashboard
  const dashboardOptions = [
    {
      label: "Ventas",
      icon: <ShoppingCart fontSize="large" />,
      route: "/ventas",
      color: cardColors.sales,
    },
    {
      label: "Órdenes",
      icon: <ListAlt fontSize="large" />,
      route: "/compras",
      color: cardColors.orders,
    },
    {
      label: "Clientes",
      icon: <People fontSize="large" />,
      route: "/clientes",
      color: cardColors.customers,
    },
    {
      label: "Reportes",
      icon: <AttachMoney fontSize="large" />,
      route: "/reports",
      color: cardColors.payments,
    },
  ];

  return (
    <Box p={4}>
      <Grid container spacing={4} justifyContent="center">
        {dashboardOptions.map((option, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card
              onClick={() => navigate(option.route)} // Cambio a useNavigate
              style={{
                cursor: "pointer",
                backgroundColor: option.color,
                textAlign: "center",
                padding: "20px",
                color: "#fff",
                transition: "0.3s",
              }}
              elevation={3}
            >
              <CardContent>
                <IconButton style={{ color: "#fff" }}>{option.icon}</IconButton>
                <Typography variant="h6" style={{ color: "#fff" }}>
                  {option.label}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};
