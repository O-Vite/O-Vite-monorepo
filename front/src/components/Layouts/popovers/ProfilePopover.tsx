import { Badge, Box, ButtonBase, Divider, styled } from "@mui/material";
import FlexBox from "../../FlexBox";
import { H6, Small, Tiny } from "../../Typography";
import UkoAvatar from "../../UkoAvatar";
import useAuth from "../../../hooks/useAuth";
import { FC, Fragment, useRef, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import PopoverLayout from "./PopoverLayout";
import Icons from "../../../icons/sidebar";



// styled components
const StyledSmall = styled(Small)(({ theme }) => ({
  display: "block",
  padding: "5px 1rem",
  cursor: "pointer",
  "&:hover": {
    color: theme.palette.primary.main,
    backgroundColor:
      theme.palette.mode === "light"
        ? theme.palette.secondary.light
        : theme.palette.divider,
  },
}));

const ProfilePopover: FC = () => {
  const anchorRef = useRef(null);
  const navigate = useNavigate();
  const { logout, user } = useAuth();
  const [open, setOpen] = useState(false);

  const handleMenuItem = (path: string) => {
    navigate(path);
    setOpen(false);
  };
  
  return (
    <Fragment>
      <ButtonBase disableRipple ref={anchorRef} onClick={() => setOpen(true)}>
        <Badge
          overlap="circular"
          variant="dot"
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
          sx={{
            "& .MuiBadge-badge": {
              width: 11,
              height: 11,
              right: "7%",
              borderRadius: "50%",
              border: "2px solid #fff",
              backgroundColor: "success.main",
            },
          }}
        >
          {/* <UkoAvatar
            src={user?.avatar || "/static/avatar/avatar.svg"}
            sx={{ width: 30, height: 30, ml: 1 }}
          /> */}
          <Icons.UserProfileIcon sx={{color: "white"}} />
        </Badge>
      </ButtonBase>

      <PopoverLayout
        hiddenViewButton
        maxWidth={230}
        minWidth={200}
        popoverOpen={open}
        anchorRef={anchorRef}
        popoverClose={() => setOpen(false)}
        title={
          <FlexBox alignItems="center">
            {/* <UkoAvatar
              src={user?.avatar || "/static/avatar/avatar.svg"}
              sx={{ width: 35, height: 35 }}
            /> */}
            <Icons.UserProfileIcon sx={{ width: 35, height: 35, color: "#282B2A" }} />

            <Box ml={1}>
              {user && (
  <H6>
    {user.lastname?.toUpperCase() + " " + user.firstname}
  </H6>
)}


              <Tiny display="block" fontWeight={500} color="text.disabled">
                {user?.email}
              </Tiny>
            </Box>
          </FlexBox>
        }
      >
        <Box pt={1}>
          <StyledSmall
            onClick={() => handleMenuItem("/user-profile")}
          >
            Profil & Compte
          </StyledSmall>

          <Divider sx={{ my: 1 }} />

          <StyledSmall
            onClick={() => {
              logout();
              toast.success("Vous vous déconnectez avec succès");
            }}
          >
            Déconnexion
          </StyledSmall>
        </Box>
      </PopoverLayout>
    </Fragment>
  );
};

export default ProfilePopover;
