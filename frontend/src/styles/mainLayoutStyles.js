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
	Grid,
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

//* App Bar
export const StyledAppBar = styled(AppBar)({
	position: 'sticky',
	zIndex: 999,
	backgroundColor: '#00a8b5',
});

//* Dashboard Drawer
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

export const StyledListSubheader = styled(ListSubheader)({
	backgroundColor: '#f3ae4b',
	color: '#000',
});

export const StyledListItemIcon = styled(ListItemIcon)({
	minWidth: 0,
	marginRight: '1.5rem',
});

//* General Styles
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
	size: "small",
});

export const StyledFormControl = styled(FormControl)({
	margin: 3,
});

export const StyledGridItem = styled(Grid)({
	display: 'flex',
	flexWrap: 'wrap',
	alignItems: 'flex-start',
});

//* Sales Cards
export const StyledSalesAvatar = styled(Avatar)({
	height: 56,
	width: 56,
});

export const StyledSalesCard = styled(Card)({
	display: 'flex',
	flexDirection: 'column',
	justifyContent: 'center',
	alignItems: 'center',
	border: '2px solid black',
	boxShadow: `10px 10px 0px 0px ${getRandomColor()}`,
	borderRadius: '15px',
	boxSizing: 'border-box',
	padding: '1rem',
	width: 'auto',
	height: 'auto',
	maxWidth: '100%',
	maxHeight: '100%',
	flexWrap: 'nowrap',
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
	maxHeight: 150,
	maxWidth: 300,
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
export const StyledTMCard = styled(Card)({
	display: 'flex',
	flexDirection: 'column',
	alignItems: 'center',
	padding: 2,
	border: '2px solid black',
	boxShadow: `10px 10px 0px 0px ${getRandomColor()}`,
	borderRadius: '15px',
	overflow: 'hidden',
	maxHeight: 380,
	maxWidth: 300,
});

//* Daily Totals Form Styles
export const StyledDTFCard = styled(Card)({
	display: 'flex',
	flexDirection: 'column',
	alignItems: 'center',
	padding: 2,
	border: '2px solid black',
	boxShadow: `10px 10px 0px 0px ${getRandomColor()}`,
	borderRadius: '15px',
	overflow: 'hidden',
	maxHeight: 500,
});