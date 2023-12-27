import { AppBar, ListSubheader, Drawer } from '@mui/material';
import { styled } from '@mui/system';

export const drawerWidth = 240;

export const StyledDrawer = styled(Drawer)({
    '& .MuiDrawer-paper': {
        width: drawerWidth,
        boxSizing: 'border-box',
        backgroundColor: '#00a8b5',
        color: '#00000',
    },
});

export const StyledListSubheader = styled(ListSubheader)({
    backgroundColor: '#f3ae4b',
    color: '#000',
});

export const StyledAppBar = styled(AppBar)({
    position: "sticky",
    zIndex: 999,
    backgroundColor: '#00a8b5',
});