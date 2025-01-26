import React from 'react';
import { Link } from 'react-router-dom';
import { AppBar, Toolbar, Button, Typography, Box } from '@mui/material';

function Navbar() {
  return (
    <AppBar position="sticky" sx={{ backgroundColor: '#6200ea' }}>  {/* Purple color for a modern look */}
      <Toolbar>
        {/* App Title */}
        <Typography variant="h6" sx={{ flexGrow: 1, fontWeight: 600 }}>
          Product Management
        </Typography>

        {/* Menu Items */}
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button
            color="inherit"
            component={Link}
            to="/scanner"
            sx={{
              fontWeight: 500,
              textTransform: 'uppercase',
              '&:hover': {
                backgroundColor: '#3700b3', // Darker purple on hover
                color: '#ffffff',
              },
            }}
          >
            Scanner
          </Button>
          <Button
            color="inherit"
            component={Link}
            to="/analytics"
            sx={{
              fontWeight: 500,
              textTransform: 'uppercase',
              '&:hover': {
                backgroundColor: '#3700b3', // Darker purple on hover
                color: '#ffffff',
              },
            }}
          >
            Analytics
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
