import { Box, Button, styled } from "@mui/material";
import FlexBox from "../../components/FlexBox";
import SearchInput from "../../components/SearchInput";
import UserListColumnShape from "./columnShape";
import CustomTable from "./CustomTable";
import useTitle from "../../hooks/useTitle";
import { FC } from "react";
import { useNavigate } from "react-router-dom";
import { userListFakeData } from "./fakeData";

const StyledFlexBox = styled(FlexBox)(({ theme }) => ({
  justifyContent: "space-between",
  alignItems: "center",
  flexWrap: "wrap",
  marginBottom: 20,
  [theme.breakpoints.down(500)]: {
    width: "100%",
    "& .MuiInputBase-root": { maxWidth: "100%" },
    "& .MuiButton-root": {
      width: "100%",
      marginTop: 15,
    },
  },
}));

const Tickets: FC = () => {
  useTitle("Réclamations");

  const navigate = useNavigate();

  return (
    <Box pt={2} pb={4}>
      <StyledFlexBox>
        <SearchInput placeholder="Recherche des tickets..." />
        <Button variant="contained">
          Gestion des tickets
        </Button>
      </StyledFlexBox>

      <CustomTable columnShape={UserListColumnShape}  data={userListFakeData} />
    </Box>
  );
};

export default Tickets;
