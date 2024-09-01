import { Box, IconButton, Modal, Stack, SxProps, Theme, Typography } from '@mui/material';
import { Close } from '@mui/icons-material';

interface ModalWindowProps {
    open: boolean;
    onClose: () => void;
    children: React.ReactNode;
    title: string;
    sx?: SxProps<Theme>;
}

const ModalWindow = ({ open, onClose, children, title, sx }: ModalWindowProps) => {
    const mergedSx = { ...style, ...sx };

    return (
        <Modal open={open} onClose={onClose}>
            <Box sx={mergedSx}>
                <Stack direction='row' justifyContent='space-between' gap={10} alignItems='center'>
                    <Typography variant='h4' fontWeight={700}>
                        {title}
                    </Typography>
                    <IconButton onClick={onClose} sx={{ color: '#1976d2' }}>
                        <Close fontSize='large' />
                    </IconButton>
                </Stack>
                {children}
            </Box>
        </Modal>
    );
};

export default ModalWindow;

const style: SxProps<Theme> = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    display: 'flex',
    flexDirection: 'column',
    padding: '22px',
    bgcolor: 'background.paper',
    color: '#171717',
    borderRadius: '4px',
};
