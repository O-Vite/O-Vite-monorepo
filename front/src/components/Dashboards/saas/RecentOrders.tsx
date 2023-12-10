import {
  Box,
  Card,
  styled,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import { H5, Small } from "../../Typography";
import { FC } from "react";
import ScrollBar from "simplebar-react";

const commonCSS = {
  minWidth: 120,
  "&:nth-of-type(2)": { minWidth: 170 },
  "&:nth-of-type(3)": { minWidth: 80 },
};

// Styled components
const HeadTableCell = styled(TableCell)(() => ({
  fontSize: 12,
  fontWeight: 600,
  "&:first-of-type": { paddingLeft: 0 },
  "&:last-of-type": { paddingRight: 0 },
}));

const BodyTableCell = styled(TableCell)(({ theme }) => ({
  fontSize: 12,
  fontWeight: 500,
  padding: 0,
  paddingLeft: "1rem",
  paddingTop: "0.7rem",
  "&:first-of-type": { paddingLeft: 0 },
  "&:last-of-type": { paddingRight: 0 },
  [theme.breakpoints.down("sm")]: { ...commonCSS },
  [theme.breakpoints.between(960, 1270)]: { ...commonCSS },
}));

const RecentOrders: FC = () => {
  return (
    <Card sx={{ padding: "2rem" }}>
      <H5>Les dernières commandes</H5>

      <ScrollBar>
        <Table>
          <TableHead
            sx={{ borderBottom: "1.5px solid", borderColor: "divider" }}
          >
            <TableRow>
            <HeadTableCell>Numéro de Commande</HeadTableCell>
            <HeadTableCell>Produit</HeadTableCell>
              <HeadTableCell>Type d'Eau</HeadTableCell>
              <HeadTableCell>Produit</HeadTableCell>
            <HeadTableCell>Quantité</HeadTableCell>
              <HeadTableCell>Montant </HeadTableCell>
              <HeadTableCell>Montant Total</HeadTableCell>

            </TableRow>
          </TableHead>

          <TableBody>
            {orderList.map((item, index) => (
              <TableRow key={index}>
                <BodyTableCell>{item.orderNo}</BodyTableCell>
                <BodyTableCell>
                  <Box display="flex" alignItems="center">
                    <img src={item.image} alt="product title" width="40px" />
                    <Small ml="1rem">{item.name}</Small>
                  </Box>
                </BodyTableCell>
                <BodyTableCell>{item.format}</BodyTableCell>
                <BodyTableCell>
                  <Box
                    sx={{
                      backgroundColor: "secondary.200",
                      borderRadius: 11,
                      maxWidth: 55,
                      padding: "0.3rem",
                      textAlign: "center",
                      color: "secondary.400",
                    }}
                  >
                    {item.totalOrder}
                  </Box>
                </BodyTableCell>
                <BodyTableCell>{item.totalAmount}</BodyTableCell>
                <BodyTableCell>{item.totalAmount}</BodyTableCell>
                <BodyTableCell>{item.totalAmount}</BodyTableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </ScrollBar>
    </Card>
  );
};

const orderList = [
  {
    orderNo: "#JY7685",
    name: "Vittel",
    image: "",
    format: "25cl",
    totalOrder: 325,
    totalAmount: "$1,45,660",
  },
  {
    orderNo: "#JY7686",
    name: "Volvic",
    image: "",
    format: "25cl",
    totalOrder: 40,
    totalAmount: "$1,45,420",
  },
  {
    orderNo: "#JY7687",
    name: "Evian",
    image: "",
    format: "25cl",
    totalOrder: 57,
    totalAmount: "$45,660",
  },
  {
    orderNo: "#JY7688",
    name: "Cristaline",
    image: "",
    price: 654,
    format: "25cl",
    totalAmount: "$12,660",
  },
];

export default RecentOrders;
