import {React, useState} from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Typography,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Box,
  CssBaseline,
  IconButton,
  useTheme,
  useMediaQuery,
  Divider,
  Container,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import BarcodeScanner from './components/BarcodeScanner';
import KanbanBoard from './components/KanbanBoard';
import AnalyticsDashboard from './components/AnalyticsDashboard';

function App() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [products, setProducts] = useState([]);
  
  const addProduct = (newProduct) => {
    setProducts((prevProducts) => [...prevProducts, newProduct]);
  };
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawerWidth = 240;



  const drawerContent = (
    <Box sx={{ height: '100%', backgroundColor: '#1976d2', color: '#fff' }}>
      <Typography variant="h6" sx={{ padding: 2, fontWeight: 'bold' }}>
        Product Menu
      </Typography>
      <Divider />
      <List>
        <ListItem button component={Link} to="/scanner" sx={{ color: '#fff' }}>
          <ListItemText primary="Scanner" />
        </ListItem>
        <ListItem button component={Link} to="/analytics" sx={{ color: '#fff' }}>
          <ListItemText primary="Analytics" />
        </ListItem>
      </List>
    </Box>
  );

  return (
    <Router>
      <Box sx={{ display: 'flex', height: '100vh' }}>
        <CssBaseline />
        {/* Responsive Drawer */}
        {isMobile ? (
          <Drawer
            variant="temporary"
            open={mobileOpen}
            onClose={handleDrawerToggle}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile
            }}
            sx={{
              '& .MuiDrawer-paper': {
                boxSizing: 'border-box',
                width: drawerWidth,
              },
            }}
          >
            {drawerContent}
          </Drawer>
        ) : (
          <Drawer
            variant="permanent"
            sx={{
              width: drawerWidth,
              flexShrink: 0,
              '& .MuiDrawer-paper': {
                width: drawerWidth,
                boxSizing: 'border-box',
              },
            }}
          >
            {drawerContent}
          </Drawer>
        )}

        {/* Main Content */}
        <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
          {/* AppBar */}
          <AppBar position="sticky" sx={{ backgroundColor: '#004d40' }}>
            <Toolbar>
              {isMobile && (
                <IconButton
                  color="inherit"
                  aria-label="open drawer"
                  edge="start"
                  onClick={handleDrawerToggle}
                  sx={{ marginRight: 2 }}
                >
                  <MenuIcon />
                </IconButton>
              )}
                <Typography
                    variant="h2"
                    sx={{
                        fontWeight: 700,
                        // background: "linear-gradient(45deg, #FF0000, #000000)",
                        WebkitBackgroundClip: "text",
                        // color: "transparent",
                        fontSize: "2rem",
                        letterSpacing: "2px",
                        // mb: 3,
                        textShadow: "2px 2px 6px rgba(0, 0, 0, 0.3)",
                    }}
                >
                    Shwapno Inventory Management System
                </Typography>
            </Toolbar>
          </AppBar>

          {/* Main Content */}
          <Container
            maxWidth="lg"
            sx={{
              padding: 3,
              backgroundColor: '#f4f6f8',
              flexGrow: 1,
              overflowY: 'auto',
            }}
          >
            <Routes>
              <Route path="/scanner" element={<><BarcodeScanner onProductSave={addProduct}/><KanbanBoard products={products}/></>} />
              <Route path="/analytics" element={<AnalyticsDashboard />} />
              <Route path="/" element={<><BarcodeScanner onProductSave={addProduct}/><KanbanBoard products={products}/></>} />
            </Routes>
          </Container>
        </Box>
      </Box>
    </Router>
  );
}

export default App;
