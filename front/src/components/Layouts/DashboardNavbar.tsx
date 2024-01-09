import {
  AppBar,
  Box,
  styled,
  Theme,
  Toolbar,
  useMediaQuery,
} from "@mui/material";
import { FC, useContext } from "react";
import { TitleContext } from "../../contexts/TitleContext";
import { H2 } from "../Typography";
import LanguagePopover from "./popovers/LanguagePopover";
import ProfilePopover from "./popovers/ProfilePopover";

// root component interface
interface DashboardNavBarProps {
  setShowMobileSideBar: () => void;
}

// custom styled components
const DashboardNavbarRoot = styled(AppBar)(() => ({
  zIndex: 11,
  boxShadow: "none",
  paddingTop: "1rem",
  paddingBottom: "1rem",
  backdropFilter: "blur(6px)",
  backgroundColor: "transparent",
}));

const StyledToolBar = styled(Toolbar)(() => ({
  "@media (min-width: 0px)": {
    paddingLeft: 0,
    paddingRight: 0,
    minHeight: "auto",
  },
}));

const ToggleIcon = styled(Box)(({ theme }) => ({
  width: 25,
  height: 3,
  margin: "5px",
  borderRadius: "10px",
  transition: "width 0.3s",
  backgroundColor: "white",
}));

// root component
const DashboardNavbar: FC<DashboardNavBarProps> = ({
  setShowMobileSideBar,
}) => {
  const { title } = useContext(TitleContext);
  const downSm = useMediaQuery((theme: Theme) => theme.breakpoints.down("sm"));

  if (downSm) {
    return (
<DashboardNavbarRoot style={{ position: "sticky", backdropFilter: "blur(1px)" }}>
        <StyledToolBar style={{ backdropFilter: "blur(1px)" }}>
          <Box sx={{ cursor: "pointer" }} onClick={setShowMobileSideBar}>
            
          </Box>

          {/* <Box flexGrow={1} textAlign="center">
            <img
              src="/static/logo/logo.svg"
              width="100%"
              height="30"
              alt="Logo"
            />
          </Box> */}


          <ProfilePopover />
        </StyledToolBar>
      </DashboardNavbarRoot>
    );
  }

  return (
<DashboardNavbarRoot style={{ position: "sticky", backdropFilter: "blur(1px)" }}>
      <StyledToolBar>
        <H2
          fontSize={21}
          lineHeight={0}
          mx={1}
          fontWeight="700"
          color="text.primary"
        >
        
        </H2>

        <Box flexGrow={1} ml={1} />
        <ProfilePopover />
      </StyledToolBar>
    </DashboardNavbarRoot>
  );
};

export default DashboardNavbar;