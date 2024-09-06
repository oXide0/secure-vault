import { confirmSignUp, signIn, signOut, signUp } from '@aws-amplify/auth';
import {
    Box,
    Button,
    CircularProgress,
    List,
    ListItem,
    ListItemText,
    Stack,
    TextField,
    Typography,
} from '@mui/material';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import output from '../../shared/output.json';
import { listFiles, uploadFile } from './api/data';
import ModalWindow from './components/modal';

const Page = ({ isAuth, setIsAuth }: { isAuth: boolean; setIsAuth: (value: boolean) => void }) => {
    const [files, setFiles] = useState<File[]>([]);
    const [uploadedFiles, setUploadedFiles] = useState<string[]>([]);
    const [uploading, setUploading] = useState<boolean>(false);
    const [uploadStatus, setUploadStatus] = useState<string>('');
    const [modalsState, setModalsState] = useState({ register: false, login: false });

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setFiles(Array.from(e.target.files));
        }
    };

    const handleUpload = async () => {
        if (!files.length) return;

        setUploading(true);
        setUploadStatus('');

        try {
            const uploadPromises = files.map(async (file) => {
                const url = await uploadFile(file);
                return `${file.name} uploaded successfully: ${url}`;
            });

            const uploadResults = await Promise.all(uploadPromises);
            setUploadStatus(uploadResults.join('\n'));
        } catch (error) {
            setUploadStatus('Error uploading files');
            console.error('Upload error:', error);
        } finally {
            setUploading(false);
        }
    };

    const fetchUploadedFiles = async () => {
        try {
            const files = await listFiles();
            setUploadedFiles(files);
        } catch (error) {
            console.error('Error fetching files:', error);
        }
    };

    useEffect(() => {
        if (isAuth) {
            fetchUploadedFiles();
        }
    }, [isAuth]);

    return (
        <Box sx={{ padding: 2, position: 'relative', zIndex: 3 }}>
            <Stack direction='row' justifyContent='space-between' pb={4}>
                <Typography variant='h4' fontWeight={800} letterSpacing={-1} gutterBottom>
                    Secure<span style={{ color: '#1976d2' }}>Vault</span>
                </Typography>
                {isAuth ? (
                    <Button
                        variant='outlined'
                        sx={{ color: 'white' }}
                        onClick={async () => {
                            await signOut();
                            setIsAuth(false);
                        }}
                    >
                        Sign out
                    </Button>
                ) : (
                    <Stack direction='row' gap={2}>
                        <Button
                            variant='outlined'
                            sx={{ color: 'white' }}
                            onClick={() => setModalsState({ ...modalsState, register: true })}
                        >
                            Sign up
                        </Button>
                        <Button
                            variant='contained'
                            sx={{ color: 'white' }}
                            onClick={() => setModalsState({ ...modalsState, login: true })}
                        >
                            Sign in
                        </Button>
                    </Stack>
                )}
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
                <Typography variant='body1' color='error' fontWeight='bold'>
                    {uploadStatus}
                </Typography>
            )}
            <Box>
                <Typography variant='h6'>Selected Files:</Typography>
                <List>
                    {Array.from(files).map((file) => (
                        <ListItem key={file.name}>
                            <ListItemText primary={file.name} />
                        </ListItem>
                    ))}
                </List>
            </Box>
            <Box>
                <Typography variant='h6'>Uploaded Files:</Typography>
                <List>
                    {uploadedFiles.map((file) => (
                        <ListItem key={file}>
                            <ListItemText primary={file} />
                            <Button
                                variant='contained'
                                onClick={() =>
                                    window.open(
                                        `https://${output['SecureVault-DataStack'].FilesBucketName}.s3.eu-north-1.amazonaws.com/${file}`,
                                        '_blank'
                                    )
                                }
                            >
                                Download
                            </Button>
                        </ListItem>
                    ))}
                </List>
            </Box>
            <RegisterModal
                setIsAuth={setIsAuth}
                open={modalsState.register}
                onClose={() => setModalsState({ ...modalsState, register: false })}
            />
            <LoginModal
                setIsAuth={setIsAuth}
                open={modalsState.login}
                onClose={() => setModalsState({ ...modalsState, login: false })}
            />
        </Box>
    );
};

export default Page;

interface RegisterFormValues {
    email: string;
    password: string;
}

interface ConfirmationFormValues {
    email: string;
    confirmationCode: string;
}

interface AuthModalProps {
    open: boolean;
    onClose: () => void;
    setIsAuth: (value: boolean) => void;
}

const RegisterModal = ({ open, onClose, setIsAuth }: AuthModalProps) => {
    const [userData, setUserData] = useState({ isRegistered: false, email: '' });
    const [submitError, setSubmitError] = useState<string | null>(null);

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<RegisterFormValues>();

    const {
        register: registerConfirm,
        handleSubmit: handleSubmitConfirm,
        reset: resetConfirm,
        formState: { errors: errorsConfirm },
    } = useForm<ConfirmationFormValues>();

    const onRegisterSubmit = handleSubmit(async (data) => {
        const { email, password } = data;
        try {
            setSubmitError(null);
            await signUp({
                username: email,
                password,
                options: {
                    userAttributes: {
                        email,
                    },
                },
            });
        } catch (error) {
            setSubmitError('Failed to register. Please check your credentials and try again.');
            console.error(error);
        }
        setUserData({ isRegistered: true, email });
    });

    const onConfirmSubmit = handleSubmitConfirm(async (data) => {
        const { confirmationCode } = data;
        try {
            setSubmitError(null);
            await confirmSignUp({ username: userData.email, confirmationCode });
        } catch (error) {
            setSubmitError('Failed to confirm registration. Please check your code and try again.');
            console.error(error);
        }
        setUserData({ isRegistered: false, email: '' });
        setIsAuth(true);
        reset();
        resetConfirm();
        onClose();
    });

    return (
        <ModalWindow
            open={open}
            onClose={onClose}
            title={userData.isRegistered ? 'Confirm your account' : 'Create new account'}
            sx={{ maxWidth: '550px', width: '100%' }}
        >
            {!userData.isRegistered ? (
                <Box component='form' onSubmit={onRegisterSubmit}>
                    <Stack gap={2} py={8} flex='1 1 auto'>
                        <TextField
                            label='Email'
                            fullWidth
                            {...register('email', {
                                required: 'Email is required',
                                pattern: {
                                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                                    message: 'Invalid email address',
                                },
                            })}
                            error={!!errors.email}
                            helperText={errors.email?.message as string}
                        />
                        <TextField
                            label='Password'
                            type='password'
                            fullWidth
                            {...register('password', {
                                required: 'Password is required',
                                validate: (value) => {
                                    if (value.length < 8)
                                        return 'Password must be at least 8 characters long';
                                    return true;
                                },
                            })}
                            error={!!errors.password}
                            helperText={errors.password?.message as string}
                        />
                        {submitError && (
                            <Typography color='error' variant='body2'>
                                {submitError}
                            </Typography>
                        )}
                    </Stack>
                    <Button
                        type='submit'
                        variant='contained'
                        color='primary'
                        fullWidth
                        sx={{ mt: 2 }}
                    >
                        Register
                    </Button>
                </Box>
            ) : (
                <Box component='form' onSubmit={onConfirmSubmit}>
                    <Stack gap={2} py={8} flex='1 1 auto'>
                        <TextField
                            type='number'
                            label='Confirmation Code'
                            fullWidth
                            {...registerConfirm('confirmationCode', {
                                required: 'Confirmation code is required',
                            })}
                            error={!!errorsConfirm.confirmationCode}
                            helperText={errorsConfirm.confirmationCode?.message as string}
                        />
                        {submitError && (
                            <Typography color='error' variant='body2'>
                                {submitError}
                            </Typography>
                        )}
                    </Stack>
                    <Button
                        type='submit'
                        variant='contained'
                        color='primary'
                        fullWidth
                        sx={{ mt: 2 }}
                    >
                        Confirm
                    </Button>
                </Box>
            )}
        </ModalWindow>
    );
};

type LoginFormValues = {
    email: string;
    password: string;
};

const LoginModal = ({ open, onClose, setIsAuth }: AuthModalProps) => {
    const [submitError, setSubmitError] = useState<string | null>(null);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginFormValues>();

    const onSubmit = handleSubmit(async (data) => {
        try {
            setSubmitError(null);
            await signIn({
                username: data.email,
                password: data.password,
            });
            setIsAuth(true);
            onClose();
        } catch (error) {
            setSubmitError('Failed to sign in. Please check your credentials and try again.');
            console.error(error);
        }
    });

    return (
        <ModalWindow
            open={open}
            onClose={onClose}
            title='Sign in to your account'
            sx={{ maxWidth: '600px', width: '100%' }}
        >
            <Box component='form' onSubmit={onSubmit}>
                <Stack gap={2} py={8} flex='1 1 auto'>
                    <TextField
                        label='Email'
                        fullWidth
                        {...register('email', { required: 'Email is required' })}
                        error={!!errors.email}
                        helperText={errors.email?.message as string}
                    />
                    <TextField
                        label='Password'
                        type='password'
                        fullWidth
                        {...register('password', {
                            required: 'Password is required',
                            validate: validatePassword,
                        })}
                        error={!!errors.password}
                        helperText={errors.password?.message as string}
                    />
                    {submitError && (
                        <Typography color='error' variant='body2'>
                            {submitError}
                        </Typography>
                    )}
                </Stack>
                <Button type='submit' variant='contained' color='primary' fullWidth sx={{ mt: 2 }}>
                    Login
                </Button>
            </Box>
        </ModalWindow>
    );
};

interface PasswordPolicy {
    minLength?: number;
    requireLowercase?: boolean;
    requireUppercase?: boolean;
    requireDigits?: boolean;
    requireSymbols?: boolean;
}

const passwordPolicy: PasswordPolicy = {
    minLength: 8,
    requireLowercase: true,
    requireUppercase: true,
    requireDigits: true,
    requireSymbols: true,
};

const validatePassword = (value: string): string | boolean => {
    const rules = [];

    if (passwordPolicy.minLength && value.length < passwordPolicy.minLength) {
        rules.push(`Password must be at least ${passwordPolicy.minLength} characters long.`);
    }
    if (passwordPolicy.requireLowercase && !/[a-z]/.test(value)) {
        rules.push('Password must contain at least one lowercase letter.');
    }
    if (passwordPolicy.requireUppercase && !/[A-Z]/.test(value)) {
        rules.push('Password must contain at least one uppercase letter.');
    }
    if (passwordPolicy.requireDigits && !/[0-9]/.test(value)) {
        rules.push('Password must contain at least one digit.');
    }
    if (passwordPolicy.requireSymbols && !/[!@#$%^&*(),.?":{}|<>]/.test(value)) {
        rules.push('Password must contain at least one special character.');
    }

    return rules.length === 0 || rules.join(' ');
};
