import {
	AppBar,
	Avatar,
	ListSubheader,
	ListItemIcon,
	Drawer,
	Button,
	TextField,
	FormControl,
	Box,
	Card,
} from '@mui/material';
import { styled } from '@mui/system';

export const drawerWidth = 240;

const getRandomColor = () => {
	const letters = '0123456789ABCDEF';
	let color = '#';
	for (let i = 0; i < 6; i++) {
		color += letters[Math.floor(Math.random() * 16)];
	}
	return color;
};

export const StyledAppBar = styled(AppBar)({
	position: 'sticky',
	zIndex: 999,
	backgroundColor: '#00a8b5',
});

export const StyledDrawer = styled(Drawer)({
	'& .MuiDrawer-paper': {
		width: drawerWidth,
		boxSizing: 'border-box',
		backgroundColor: '#00a8b5',
		color: '#00000',
		flexShrink: 0,
	},
});

export const StyledDrawerAvatar = styled(Avatar)({
	width: 48,
	height: 48,
});

export const StyledSalesAvatar = styled(Avatar)({
	height: 56,
	width: 56,
});

export const StyledSalesCard = styled(Card)({
	display: 'flex',
	flexDirection: 'column',
	alignItems: 'center',
	padding: 10,
	border: '2px solid black',
	boxShadow: `10px 10px 0px 0px ${getRandomColor()}`,
	borderRadius: '15px',
	boxSizing: 'border-box',
});

export const StyledListSubheader = styled(ListSubheader)({
	backgroundColor: '#f3ae4b',
	color: '#000',
});

export const StyledListItemIcon = styled(ListItemIcon)({
	minWidth: 0,
	marginRight: '1.5rem',
});

export const PinkStyledButton = styled(Button)({
	color: '#000',
	backgroundColor: '#de4383',
	transition: 'transform 0.3s ease-in-out',
	'&:hover': {
		backgroundColor: '#f3ae4b',
		border: '1.5px solid #000',
		transform: 'translate(0px, 0px) scale(1.2)',
	},
	border: '1.5px solid #000',
	boxShadow: '5px 5px 0px 0px #000',
	borderRadius: '5px',
});

//* Team Styling
export const StyledTeamCard = styled(Card)({
	display: 'flex',
	flexDirection: 'column',
	alignItems: 'center',
	padding: 2,
	border: '2px solid black',
	boxShadow: `10px 10px 0px 0px ${getRandomColor()}`,
	borderRadius: '15px',
});

export const StyledTeamButton = styled(Button)({
	marginTop: 5,
	color: '#000',
	backgroundColor: '#de4383',
	transition: 'transform 0.3s ease-in-out',
	'&:hover': {
		backgroundColor: '#f3ae4b',
		border: '1.5px solid #000',
		transform: 'translate(0px, 0px) scale(1.2)',
	},
	border: '1.5px solid #000',
	boxShadow: '5px 5px 0px 0px #000',
	borderRadius: '5px',
});

//* Team Member Form Styles
export const StyledCard = styled(Card)({
	display: 'flex',
	flexDirection: 'column',
	alignItems: 'center',
	padding: 2,
	border: '2px solid black',
	boxShadow: `10px 10px 0px 0px ${getRandomColor()}`,
	borderRadius: '15px',
	overflow: 'hidden',
	height: 380,
});

export const StyledBox = styled(Box)({
	display: 'flex',
	flexDirection: 'column',
	alignItems: 'center',
	padding: '20px',
});

export const StyledTextField = styled(TextField)({
	margin: 3,
});

export const StyledFormControl = styled(FormControl)({
	margin: 3,
});