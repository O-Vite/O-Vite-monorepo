import { Box, useTheme } from "@mui/material";
import FlexBox from "../components/FlexBox";
import { H1, Paragraph } from "../components/Typography";
import { FC } from "react";
import { NavLink } from "react-router-dom";

const ErrorPage: FC = () => {
  const theme = useTheme();

  return (
    <FlexBox
      p={4}
      height="100%"
      alignItems="center"
      flexDirection="column"
      justifyContent="center"
    >
      <Box maxWidth={400} >
        <img
          src="/static/logo_ovite.svg"
          width="100%"
          alt="Error 404"
        />
      </Box>
    <H1 
  style={{ marginTop: '-35px' }}
  fontSize={64} 
  fontWeight={700} 
  color="primary.main"
>
  Ooops... 404!
</H1>


      <Paragraph color="text.disabled" fontWeight="500">
        La page demandée est introuvable.
      </Paragraph>

      <NavLink
        to="/dashboard"
        style={{
          display: "block",
          marginTop: "1.5rem",
          fontWeight: 600,
          textDecoration: "underline",
          color: theme.palette.primary.main,
        }}
      >
        Retour
      </NavLink>
    </FlexBox>
  );
};

export default ErrorPage;
