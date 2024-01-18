import { BusinessCenter, Mail, Place } from "@mui/icons-material";
import { Box, Card, Divider, Grid, styled } from "@mui/material";
import FlexBox from "../FlexBox";
import MoreOptions from "../MoreOptions";
import { H3, H4, H6, Small } from "../Typography";
import FollowerIcon from "../../icons/FollowerIcon";
import UserPlusIcon from "../../icons/UserPlusIcon";
import { FC, MouseEvent, useState } from "react";
import PostCard from "./PostCard";
import useAuth from "../../hooks/useAuth";
import useApi from "../../hooks/useApi";
import { useEffect } from "react";

const Profile: FC = () => {
  const { user } = useAuth();
  const [favorites, setFavorites] = useState([]); 
  const [preferences, setPreferences] = useState("");
  
  const api = useApi();

useEffect(() => {
  const fetchPreferences = async () => {
    try {
      if (user?.id) {
        const response = await api.getPreferences(user.id);
        setPreferences(response.data);
      }
    } catch (error) {
      console.error("Erreur lors de la récupération des préférences", error);
    }
  };

  fetchPreferences();
}, [api, user?.id]);

  return (
    <Grid container spacing={3}>
      <Grid item md={12} xs={12}>
        <Card>
          {/* ... autres sections ... */}
          <Box padding={3}>
            <H4 fontWeight={600}>Informations</H4>
            <Grid container spacing={2}>
              {favorites.map((fav, index) => (
                <Grid item key={index} xs={12} sm={6} md={4}>
                  <Card>
                    {/* Ici, vous pouvez ajouter le contenu de la carte, 
                        comme le titre et la description de la recette */}
                    <Box padding={2}>
                      <H6>{fav.title}</H6>
                      <Small color="text.secondary">{fav.description}</Small>
                    </Box>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Box>
        </Card>
      </Grid>
    </Grid>
  );
};

export default Profile;
