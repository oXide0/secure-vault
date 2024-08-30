import {
    Box,
    Typography,
    Button,
    CircularProgress,
    List,
    ListItem,
    ListItemText,
    Stack,
} from '@mui/material';
import { useState } from 'react';

const Page = () => {
    const [showData, setShowData] = useState(true);
    const [files, setFiles] = useState([{ name: 'test.txt' }]);
    const [uploading, setUploading] = useState(false);
    const [uploadStatus, setUploadStatus] = useState('');
    const handleFileChange = (e) => {};

    const handleUpload = async () => {};

    return (
        <Box sx={{ padding: 2, position: 'relative', zIndex: 3 }}>
            <Stack direction='row' justifyContent='space-between'>
                <Typography variant='h4' fontWeight={800} letterSpacing={-1} gutterBottom>
                    Secure<span style={{ color: '#1976d2' }}>Vault</span>
                </Typography>
                <Button variant='outlined' color='primary' onClick={() => setShowData(!showData)}>
                    {showData ? 'Hide Data' : 'Show Data'}
                </Button>
            </Stack>
            <input
                type='file'
                multiple
                onChange={handleFileChange}
                style={{ marginBottom: '16px' }}
            />
            <Button variant='contained' color='primary' onClick={handleUpload} disabled={uploading}>
                {uploading ? <CircularProgress size={24} /> : 'Upload'}
            </Button>
            {uploadStatus && (
                <Typography variant='body1' color='textSecondary' sx={{ marginTop: '16px' }}>
                    {uploadStatus}
                </Typography>
            )}
            {showData && (
                <Box sx={{ marginTop: '16px' }}>
                    <Typography variant='h6'>Selected Files:</Typography>
                    <List>
                        {Array.from(files).map((file) => (
                            <ListItem key={file.name}>
                                <ListItemText primary={file.name} />
                            </ListItem>
                        ))}
                    </List>
                </Box>
            )}
        </Box>
    );
};

export default Page;
