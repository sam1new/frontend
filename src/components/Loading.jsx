import React from 'react';
import { Box, Dialog, CssBaseline, CircularProgress } from "@mui/material";

const Loading = ({ open }) => {
    return (
        <Dialog
            fullScreen
            open={open}
            PaperProps={{
                style: {
                    backgroundColor: 'transparent',
                    boxShadow: 'none'
                }
            }}
        >
            <CssBaseline />
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
                <CircularProgress size={70} color="primary" />
            </Box>
        </Dialog>
    );
};

export default Loading;