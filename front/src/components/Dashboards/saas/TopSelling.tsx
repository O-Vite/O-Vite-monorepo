import { Box, Card, Rating } from "@mui/material";
import FlexBox from "../../FlexBox";
import { H5, Small } from "../../Typography";
import { FC } from "react";

const TopSelling: FC = () => {
  return (
    <Card sx={{ padding: "2rem", height: "100%" }}>
      <H5>Produit les plus vendus</H5>

      {productList.map((product, index) => (
        <FlexBox key={index} mt="1.2rem">
          <img src={product.image} alt="Men Keds" width="90px" />

          <Box display="flex" flexDirection="column" ml="1rem">
            <Small>{product.title}</Small>
          
          </Box>
        </FlexBox>
      ))}
    </Card>
  );
};

const productList = [
  {
    title: "Volvic",
    image: "",

  },
  {
    title: "Vittel",
    image: "",
  
  },
  {
    title: "Evian",
    image: "",
  
  },
];

export default TopSelling;
