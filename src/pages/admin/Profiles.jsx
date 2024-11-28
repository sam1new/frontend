import { Box, TextField, Typography, Button } from "@mui/material";
import { useState, useEffect, useMemo } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { DMLProfiles, retrieveProfiles } from '../../api/profiles';
import CustomModal from "../../components/Modal";
import { toast } from "react-toastify";
import { Edit, Delete } from '@mui/icons-material';
import $ from 'jquery';
import './Profiles.css'; 
function Profiles() {
    const [rows, setRows] = useState([]);
    const [open, setOpen] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [selectedProfile, setSelectedProfile] = useState({});
    
    const columns = useMemo(() => [
        {
            field: 'id',
            headerName: 'User ID',
            width: 150,
            headerAlign: 'center',
            align: 'center',
            fontWeight: 'bold'
        },
        {
            field: 'nickname',
            headerName: 'Nickname',
            width: 200,
            headerAlign: 'center',
            align: 'center',
        },
        {
            field: 'full_name',
            headerName: "Full Name",
            width: 200,
            headerAlign: 'center',
            align: 'center',
        },
        {
            field: 'bio',
            headerName: "About Me",
            flex: 1,
            headerAlign: 'center',
            align: 'center',
        },
        {
            field: 'action',
            headerName: 'Actions',
            flex: 1,
            sortable: false,
            headerAlign: 'center',
            align: 'center',
            renderCell: params => (
                <Box
                    sx={{ display: 'flex', flexDirection: 'row', gap: 2, justifyContent: 'center' }}
                >
                    <Button 
                        sx={{ flex: 1 }}
                        variant="outlined" 
                        color="primary" 
                        onClick={() => openModal("edit", params.row)}
                    >
                        <Edit />
                    </Button>
                    <Button 
                        sx={{ flex: 1 }} 
                        variant="outlined" 
                        color="error"
                        onClick={() => DeleteProfile(params.row)}
                    >
                        <Delete />
                    </Button>
                </Box>
            )
        }
    ], []);

    const retrieve = () => retrieveProfiles().then(res => { setRows(res.data) });

    useEffect(() => {
        retrieve();
    }, []);

    const openModal = (type, item) => {
        if (type === 'edit') {
            setEditMode(true);
            setSelectedProfile(item);
        }

        setOpen(true);
    };

    const closeModal = () => {
        setEditMode(false);
        setSelectedProfile({});
        setOpen(false);
    };

    const AddProfile = () => {
        const fullName = $("#FullName").val();
        const nickname = $("#NickName").val();
        const bio = $("#Bio").val();

        DMLProfiles({ full_name: fullName, nickname: nickname, bio: bio }, "POST")
        .then(response => {
            if (response.ok) {
                toast.success(`${fullName} Added!`);
                retrieve();
                closeModal();
            } else {
                toast.error(response.message ?? "Internal Server Error!");
            }
        });
    };

    const UpdateProfile = () => {
        const fullName = $("#FullName").val();
        const nickname = $("#NickName").val();
        const bio = $("#Bio").val();

        DMLProfiles({ id: selectedProfile.id, full_name: fullName, nickname: nickname, bio: bio }, "PATCH")
        .then(response => {
            if (response.ok) {
                toast.success(`Profile ID: ${selectedProfile.id} Updated!`);
                retrieve();
                closeModal();
            } else {
                toast.error(response.message ?? "Internal Server Error!");
            }
        });
    };

    const DeleteProfile = (item) => {
        if (confirm(`Delete Profile ${item.nickname}?`)) {
            DMLProfiles({ id: item.id }, "DELETE")
            .then(() => {
                toast.success(`Profile ${item.nickname} Deleted!`);
                retrieve();
                closeModal();
            });
        }
    };

    return (
        <Box sx={{ flex: 1, minHeight: 0, display: 'flex', flexDirection: 'column', gap: 2, p: 2 }}>
            <Box m={2}>
                <Typography variant="h2" textAlign='center'>
                    Profile Management
                </Typography>
            </Box>
            <Box sx={{ flex: 1, backgroundColor: 'white', p: 2, borderRadius: 2, boxShadow: 3 }}>
                <CustomModal
                    buttonText="Add"
                    open={open}
                    handleOpen={() => openModal("add", null)}
                    handleClose={() => closeModal()}
                    style={{ backgroundColor: 'white' }}
                >
                    <Typography 
                        variant="h4" 
                        bgcolor="#3079e6"
                        sx={{ textAlign: 'center', color: 'white', p: 2, borderRadius: 1 }}
                    >
                        {editMode ? `Update Profile of ${selectedProfile.full_name}` : "Add a Profile"}
                    </Typography>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 2 }}>
                        <TextField
                            fullWidth
                            id="FullName"
                            label="Full Name"
                            variant="outlined"
                            defaultValue={selectedProfile.full_name ?? ''}
                        />
                        <TextField
                            fullWidth
                            id="NickName"
                            label="Nickname"
                            variant="outlined"
                            defaultValue={selectedProfile.nickname ?? ''}
                        />
                        <TextField
                            fullWidth
                            id="Bio"
                            label="About Me"
                            variant="outlined"
                            multiline
                            rows={5}
                            defaultValue={selectedProfile.bio ?? ''}
                        />
                    </Box>
                    <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
                        <Button 
                            variant="contained"
                            color='info'
                            onClick={() => editMode ? UpdateProfile() : AddProfile()}
                        >
                            {editMode ? "Update" : "Add"}
                        </Button>
                    </Box>
                </CustomModal>
                <DataGrid
                    rows={rows}
                    columns={columns}
                    autoHeight
                    sx={{ mt: 3, '& .MuiDataGrid-cell': { textAlign: 'center' }, '& .MuiDataGrid-columnHeaders': { backgroundColor: '#e0e0e0' } }}
                    initialState={{
                        pagination: {
                            paginationModel: {
                                pageSize: 10
                            }
                        }
                    }}
                    pageSizeOptions={[10, 20, 30, 50, 100]}
                    disableRowSelectionOnClick
                />
            </Box>
        </Box>
    );
}

export default Profiles;
