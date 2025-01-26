import React, { useState } from "react";
import axios from "axios";
import Tesseract from "tesseract.js";
import {
    Button,
    TextField,
    CircularProgress,
    Container,
    Typography,
    Box,
    Snackbar,
    Alert,
    Paper,
    Grid,
} from "@mui/material";

function BarcodeScanner({ onProductSave }) {
    const [barcode, setBarcode] = useState("");
    const [message, setMessage] = useState("");
    const [file, setFile] = useState(null);
    const [isProcessing, setIsProcessing] = useState(false);
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [severity, setSeverity] = useState("success");

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile) {
            setFile(selectedFile);
            setMessage("");
            setBarcode("");
        }
    };

    const handleScanFile = async () => {
        if (!file) {
            setMessage("Please upload a file first.");
            setSeverity("error");
            setOpenSnackbar(true);
            return;
        }

        setIsProcessing(true);
        setMessage("Processing file...");
        setSeverity("info");
        setOpenSnackbar(true);

        try {
            const result = await Tesseract.recognize(file, "eng", {
                logger: (info) => console.log(info),
            });

            const extractedText = result.data.text.trim();
            console.log("Extracted Text:", extractedText);

            setBarcode(extractedText);
            setMessage("Barcode extracted successfully!");
            setSeverity("success");
        } catch (error) {
            console.error("Error processing file:", error);
            setMessage("Failed to process file. Please try again.");
            setSeverity("error");
        } finally {
            setIsProcessing(false);
            setOpenSnackbar(true);
            setTimeout(() => {
                setOpenSnackbar(false);
            }, 4000);
        }
    };

    const handleSaveProduct = async () => {
        if (!barcode) {
            setMessage("No barcode to save. Please scan a file or enter a barcode.");
            setSeverity("error");
            setOpenSnackbar(true);
            return;
        }

        try {
            const response = await axios.get(
                `${process.env.REACT_APP_API_BASE_URL}/api/products/product/${barcode}`
            );
            console.log("Product details:", response.data);

            const savedProduct = response.data;
            onProductSave(savedProduct);

            setMessage("Product added successfully!");
            setSeverity("success");
        } catch (error) {
            console.error("Error adding product:", error);

            if (error.response) {
                const errorMessage =
                    error.response.data.message || "An error occurred. Please try again.";
                setMessage(`Error: ${errorMessage}`);
                setSeverity("error");
            } else if (error.request) {
                setMessage(
                    "No response from the server. Please check your network connection."
                );
                setSeverity("error");
            } else {
                setMessage(`Error: ${error.message}`);
                setSeverity("error");
            }
        } finally {
            setOpenSnackbar(true);
            setTimeout(() => {
                setOpenSnackbar(false);
            }, 4000);
        }
    };

    return (
        <Container maxWidth="md">
            <Box sx={{ textAlign: "center", mt: 4 }}>

                <Typography variant="h4" gutterBottom>
                    Barcode Scanner
                </Typography>

                <Grid container spacing={2} justifyContent="center">
                    {/* File Upload Section */}
                    <Grid item xs={12}>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleFileChange}
                            style={{ display: "none" }}
                            id="file-input"
                        />
                        <label htmlFor="file-input">
                            <Button variant="contained" component="span" fullWidth>
                                Choose File
                            </Button>
                        </label>
                    </Grid>

                    {/* Display file details and preview */}
                    {file && (
                        <Grid item xs={12}>
                            <Paper sx={{ padding: 2, textAlign: "center" }}>
                                <Typography variant="body1">
                                    Uploaded File: {file.name}
                                </Typography>
                                {file.type.startsWith("image") && (
                                    <Box sx={{ mt: 2 }}>
                                        <img
                                            src={URL.createObjectURL(file)}
                                            alt="file preview"
                                            style={{
                                                maxWidth: "100%",
                                                maxHeight: 200,
                                                borderRadius: 4,
                                            }}
                                        />
                                    </Box>
                                )}
                            </Paper>
                        </Grid>
                    )}

                    {/* Scan File Button */}
                    <Grid item xs={12}>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={handleScanFile}
                            fullWidth
                            disabled={isProcessing}
                        >
                            {isProcessing ? <CircularProgress size={24} /> : "Scan File"}
                        </Button>
                    </Grid>

                    {/* Barcode Input */}
                    <Grid item xs={12}>
                        <TextField
                            label="Barcode"
                            variant="outlined"
                            fullWidth
                            value={barcode}
                            onChange={(e) => setBarcode(e.target.value)}
                            disabled={isProcessing}
                        />
                    </Grid>

                    {/* Save Product Button */}
                    <Grid item xs={12}>
                        <Button
                            variant="contained"
                            color="success"
                            onClick={handleSaveProduct}
                            fullWidth
                        >
                            Save Product
                        </Button>
                    </Grid>
                </Grid>

                <Snackbar
                    open={openSnackbar}
                    anchorOrigin={{ vertical: "top", horizontal: "right" }}
                    autoHideDuration={4000}
                    onClose={() => setOpenSnackbar(false)}
                >
                    <Alert
                        onClose={() => setOpenSnackbar(false)}
                        severity={severity}
                        sx={{ width: "100%" }}
                    >
                        {message}
                    </Alert>
                </Snackbar>
            </Box>
        </Container>
    );
}

export default BarcodeScanner;
