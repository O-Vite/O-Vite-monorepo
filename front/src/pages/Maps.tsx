import React from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { MapContainer, TileLayer } from 'react-leaflet';
import { Paper, AppBar, Toolbar, Typography, IconButton, Drawer, List, ListItem, ListItemText, Box, InputBase } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import { useNavigate } from 'react-router-dom';


const MapsSupervision = () => {
    const mapCenter = [45.764043, 4.835659];
    const zoomLevel = 13;

    const [drawerOpen, setDrawerOpen] = React.useState(false);

    const toggleDrawer = () => {
        setDrawerOpen(!drawerOpen);
    };

    const navigate = useNavigate();

    const handleBackToDashboard = () => {
        navigate('/dashboard'); // Remplacez par le chemin de votre tableau de bord
    };



    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>
                    <IconButton
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{ mr: 2 }}
                        onClick={toggleDrawer}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        Supervision de la Flotte
                    </Typography>
                </Toolbar>
            </AppBar>
            <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer}>
                <List>
                    <ListItem button>
                        <ListItemText primary="Afficher les véhicules (en cours de livraison)" />
                    </ListItem>
                    <ListItem button>
                    <ListItemText primary="Afficher les véhicules (en attente)" />
                    </ListItem>
                      <ListItem button onClick={handleBackToDashboard}>
                        <ListItemText primary="Précédent" />
                    </ListItem>
                </List>
            </Drawer>
            <Paper elevation={3} style={{ height: '400px', width: '100%', marginTop: '7px' }}>
                <MapContainer center={mapCenter} zoom={zoomLevel} style={{ height: "100%", width: "100%" }}>
                    <TileLayer
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    />
                    {/* Marqueurs et autres éléments de la carte ici */}
                </MapContainer>
            </Paper>
        </Box>
    );
};

export default MapsSupervision;
