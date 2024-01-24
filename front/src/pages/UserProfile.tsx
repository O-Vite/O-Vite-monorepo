import { TabContext, TabList, TabPanel } from "@mui/lab";
import { Box, Button, Card, Grid, styled, Tab, TextField } from "@mui/material";
import FlexBox from "../components/FlexBox";
import SearchInput from "../components/SearchInput";
import { H3, Small } from "../components/Typography";
import UkoAvatar from "../components/UkoAvatar";
import Profile from "../components/userProfile/Profile";
import useAuth from "../hooks/useAuth";
import useTitle from "../hooks/useTitle";
import { FC, SyntheticEvent, useState } from "react";
import useApi from "../hooks/useApi";
import toast from "react-hot-toast";
import PreferencesModal from "../components/Preferences";


const StyledCard = styled(Card)(() => ({
  position: "relative",
  borderTopLeftRadius: 0,
  borderTopRightRadius: 0,
}));

const ContentWrapper = styled(FlexBox)(() => ({
  top: -20,
  alignItems: "center",
  position: "relative",
}));

const StyledTab = styled(Tab)(({ theme }) => ({
  fontSize: 13,
  color: theme.palette.text.primary,
}));

const StyledTabList = styled(TabList)(({ theme }) => ({
  [theme.breakpoints.down(780)]: {
    width: "100%",
    "& .MuiTabs-flexContainer": {
      justifyContent: "space-between",
    },
    marginBottom: 20,
  },
  [theme.breakpoints.up("sm")]: {
    "& .MuiTabs-flexContainer": {
      minWidth: 400,
      justifyContent: "space-between",
    },
  },
}));

const StyledTabPanel = styled(TabPanel)(() => ({
  padding: 0,
}));

const UserProfile: FC = () => {
  useTitle("Mon Profil");
  const { user } = useAuth();
  const [value, setValue] = useState("1");
  const api = useApi();
  const [isPreferencesModalOpen, setIsPreferencesModalOpen] = useState(false);

   const handleChange = (_: SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };


    const handlePreferencesSave = (preferences) => {
    console.log("Préférences enregistrées:", preferences);
  };
 
  return (
    <Box pt={2} pb={4}>
      <TabContext value={value}>
        <StyledCard>
          <Box sx={{ height: 200, width: "100%", overflow: "hidden" }}>
            <img
              src="/static/background/water_background.jpeg"
              alt="User Cover"
              height="100%"
              width="100%"
              style={{ objectFit: "cover" }}
            />
          </Box>

          <FlexBox
            flexWrap="wrap"
            padding="0 2rem"
            alignItems="center"
            justifyContent="space-between"
          >
            <ContentWrapper>
              <UkoAvatar
                src={user?.avatar || "/static/avatar/001-man.svg"}
                sx={{
                  border: 4,
                  width: 100,
                  height: 100,
                  borderColor: "background.paper",
                }}
              />

              <Box marginLeft={3} marginTop={3}>
                <H3 lineHeight={1.2}>{user?.name}</H3>
                <Small color="text.disabled">{user?.firstname}</Small>
              </Box>
            </ContentWrapper>

            <StyledTabList onChange={handleChange}>
              <StyledTab label="Mon profil" value="1" /> 
              <StyledTab label="                " value="3" />
              <StyledTab label="                " value="4" />
            </StyledTabList>
          </FlexBox>
        </StyledCard>

        <Box marginTop={3}>
          <StyledTabPanel value="1">
            <Profile />
          </StyledTabPanel>
            <StyledTabPanel value="2">
            <Grid container spacing={3}>
              <Grid item xs={12} md={12}>
            
              </Grid>
            
    <Grid container spacing={3}>
    <Grid item xs={12} md={12}>
      <Box 
        display="flex" 
        justifyContent="center" 
        alignItems="center" 
        style={{ height: '100%' }}
      >
        <Button 
          variant="contained" 
          onClick={() => setIsPreferencesModalOpen(true)}
          style={{ backgroundColor: "black", color: "white" }}
        >
          Gérer les préférences alimentaires
        </Button>
      </Box>



               <PreferencesModal
          isOpen={isPreferencesModalOpen}
          onClose={() => setIsPreferencesModalOpen(false)}
          onSave={handlePreferencesSave}
        />
              </Grid>
              
              <Grid item xs={12}>
               
              </Grid>
              </Grid>
            </Grid>
          </StyledTabPanel>
        </Box>
      </TabContext>
    </Box>
  );
};

export default UserProfile;
