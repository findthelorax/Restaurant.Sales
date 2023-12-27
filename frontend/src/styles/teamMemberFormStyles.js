import { TextField, FormControl, Button, Box, Card } from '@mui/material';
import { styled } from '@mui/system';

export const StyledCard = styled(Card)({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: 2,
    border: '2px solid black',
    boxShadow: '10px 10px 0px 0px #00a8b5',
    borderRadius: '15px',
    overflow: 'hidden',
});

export const StyledBox = styled(Box)({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '20px 0px',
});

export const StyledTextField = styled(TextField)({
    margin: 3,
});

export const StyledFormControl = styled(FormControl)({
    margin: 3,
});

export const StyledButton = styled(Button)({
    marginTop: 10,
    backgroundColor: '#de4383',
    '&:hover': {
        backgroundColor: '#f3ae4b',
    },
});

