import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField,Box, Card, Divider, Grid, styled  } from "@mui/material";
import { useState, FormEvent, useEffect } from "react";
import useApi from "../hooks/useApi";
import useAuth from "../hooks/useAuth";
import { H3, H4, H6, Small } from "./Typography";


const PreferencesModal = ({ isOpen, onClose, onSave }) => {
  const [allergies, setAllergies] = useState("");
  const [contreIndications, setContreIndications] = useState("");
  const api = useApi(); 
  const { user } = useAuth();

  const handleSubmit = async (e: FormEvent) => {
  e.preventDefault();
  try {
    await api.updatePreferences(user?.id, { allergies, contreIndications });
    onClose();
  } catch (error) {
    console.error("Erreur lors de la mise à jour des préférences", error); 
  }
};
useEffect(() => {
  if (user.id) {
    api.getPreferences(user.id)
      .then(response => {
        
      })
      .catch(error => {
        console.error("Erreur lors de la récupération des préférences", error);
      });
  }

}, [user?.id, api]);

  return (
   
  <>
  <Dialog open={isOpen} onClose={onClose}>
    <form onSubmit={handleSubmit}>
      <DialogTitle>Préférences alimentaires</DialogTitle>
      <DialogContent>
        <TextField
          fullWidth
          label="Allergies"
          value={allergies}
          onChange={(e) => setAllergies(e.target.value)}
          margin="normal"
        />
        <TextField
          fullWidth
          label="Contre-indications"
          value={contreIndications}
          onChange={(e) => setContreIndications(e.target.value)}
          margin="normal"
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Annuler</Button>
        <Button type="submit">Enregistrer</Button>
      </DialogActions>
    </form>
   </Dialog>
     <Card>
        <Box padding={3}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Box display="flex" flexDirection="column" alignItems="center">
                <H6 fontWeight={600}>Allergies</H6>
                <Small>{allergies}</Small>
              </Box>
            </Grid>
            <Grid item xs={12}>
              <Box display="flex" flexDirection="column" alignItems="center">
                <H6 fontWeight={600}>Contre-indications</H6>
                <Small>{contreIndications}</Small>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Card>
    </>
   
  );
};

export default PreferencesModal;