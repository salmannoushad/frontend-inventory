import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Grid,
  Avatar,
  Divider,
  TextField,
  Button,
} from "@mui/material";
import { deepPurple } from "@mui/material/colors";

function AnalyticsDashboard() {
  const [stats, setStats] = useState([]);
  const [recentProducts, setRecentProducts] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [searchQuery, setSearchQuery] = useState({ name: "", category: "" });

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_BASE_URL}/api/products/analytics`
        );
        setStats(response.data.categoryStats);
        setRecentProducts(response.data.recentProducts);
      } catch (error) {
        console.error("Error fetching analytics:", error);
      }
    };
    fetchAnalytics();
  }, []);

  const handleSearch = async () => {
    try {
      const { name, category } = searchQuery;
      const response = await axios.get(
        `${process.env.REACT_APP_API_BASE_URL}/api/products/search`,
        {
          params: { name, category },
        }
      );
      setSearchResults(response.data);
    } catch (error) {
      console.error("Error searching products:", error);
    }
  };

  return (
    <Box sx={{ p: 4, backgroundColor: "#f5f5f5", minHeight: "100vh" }}>
      <Typography
        variant="h4"
        gutterBottom
        sx={{
          fontWeight: "bold",
          color: deepPurple[700],
          textAlign: "center",
          mb: 4,
        }}
      >
        Analytics Dashboard
      </Typography>

      {/* Search Form */}
      <Card sx={{ mb: 4, p: 2 }}>
        <Typography variant="h6" sx={{ mb: 2, color: deepPurple[800] }}>
          Search Products
        </Typography>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} md={5}>
            <TextField
              fullWidth
              label="Search by Name"
              variant="outlined"
              value={searchQuery.name}
              onChange={(e) =>
                setSearchQuery({ ...searchQuery, name: e.target.value })
              }
            />
          </Grid>
          <Grid item xs={12} md={5}>
            <TextField
              fullWidth
              label="Search by Category"
              variant="outlined"
              value={searchQuery.category}
              onChange={(e) =>
                setSearchQuery({ ...searchQuery, category: e.target.value })
              }
            />
          </Grid>
          <Grid item xs={12} md={2}>
            <Button
              fullWidth
              variant="contained"
              color="primary"
              onClick={handleSearch}
            >
              Search
            </Button>
          </Grid>
        </Grid>
      </Card>

      <Grid container spacing={4}>
        {/* Search Results */}
        {searchResults.length > 0 && (
          <Grid item xs={12}>
            <Card>
              <CardContent>
                <Typography
                  variant="h6"
                  gutterBottom
                  sx={{ fontWeight: "bold", color: deepPurple[800] }}
                >
                  Search Results
                </Typography>
                <Divider sx={{ my: 2 }} />
                <TableContainer component={Paper}>
                  <Table>
                    <TableHead sx={{ backgroundColor: deepPurple[100] }}>
                      <TableRow>
                        <TableCell sx={{ fontWeight: "bold" }}>Name</TableCell>
                        <TableCell sx={{ fontWeight: "bold" }}>
                          Category
                        </TableCell>
                        <TableCell sx={{ fontWeight: "bold" }}>Barcode</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {searchResults.map((product) => (
                        <TableRow key={product._id}>
                          <TableCell>{product.name}</TableCell>
                          <TableCell>{product.category || "Uncategorized"}</TableCell>
                          <TableCell>{product.barcode}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </CardContent>
            </Card>
          </Grid>
        )}

        {/* Other Analytics */}
        <Grid item xs={12} lg={6}>
          {/* Products by Category */}
          <Card>
            <CardContent>
              <Typography
                variant="h6"
                gutterBottom
                sx={{ fontWeight: "bold", color: deepPurple[800] }}
              >
                Products by Category
              </Typography>
              <Divider sx={{ my: 2 }} />
              <TableContainer component={Paper}>
                <Table>
                  <TableHead sx={{ backgroundColor: deepPurple[100] }}>
                    <TableRow>
                      <TableCell sx={{ fontWeight: "bold" }}>Category</TableCell>
                      <TableCell sx={{ fontWeight: "bold" }}>Count</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {stats.map((stat) => (
                      <TableRow key={stat._id}>
                        <TableCell>{stat._id || "Uncategorized"}</TableCell>
                        <TableCell>{stat.count}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} lg={6}>
          {/* Recently Added Products */}
          <Card>
            <CardContent>
              <Typography
                variant="h6"
                gutterBottom
                sx={{ fontWeight: "bold", color: deepPurple[800] }}
              >
                Recently Added Products
              </Typography>
              <Divider sx={{ my: 2 }} />
              <TableContainer component={Paper}>
                <Table>
                  <TableHead sx={{ backgroundColor: deepPurple[100] }}>
                    <TableRow>
                      <TableCell sx={{ fontWeight: "bold" }}>Barcode</TableCell>
                      <TableCell sx={{ fontWeight: "bold" }}>Name</TableCell>
                      <TableCell sx={{ fontWeight: "bold" }}>Category</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {recentProducts.map((product) => (
                      <TableRow key={product._id}>
                        <TableCell>{product.barcode}</TableCell>
                        <TableCell>{product.name}</TableCell>
                        <TableCell>{product.category || "Uncategorized"}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}

export default AnalyticsDashboard;
