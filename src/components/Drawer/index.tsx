import * as React from 'react';
import { Global } from '@emotion/react';
import { styled } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import { forwardRef, useImperativeHandle } from 'react';
import { ITheme } from 'common/App';

const drawerBleeding = 56;

interface DrawerProps {
    children?: React.ReactNode;
    onClose: () => void;
}

const Root = styled('div')(({ theme }) => ({
    backgroundColor: (theme as ITheme).palette.shades.g5
}));

const StyledBox = styled(Box)(({ theme }) => ({
    backgroundColor: (theme as ITheme).palette.shades.g5,
}));

export type SwipeableDrawerType = {
    isOpen: boolean;
    toggleDrawer: () => void;
}

export const SwipeableEdgeDrawer = forwardRef<SwipeableDrawerType, DrawerProps>((props: DrawerProps, ref) => {
    const { children } = props;
    const [open, setOpen] = React.useState(false);

    const toggleDrawer = (newOpen: boolean) => () => {
        setOpen(newOpen);
    };

    useImperativeHandle(ref, () => ({
        isOpen: open,
        toggleDrawer() { setOpen(!open) }
    }));

    return (
        <Root>
            <CssBaseline />
            <Global
                styles={{
                    '.MuiDrawer-root > .MuiPaper-root': {
                        height: '100%',
                        overflow: 'visible',
                        backgroundColor: '#0e0f15'
                    },
                }}
            />
            <SwipeableDrawer
                anchor="bottom"
                open={open}
                onClose={toggleDrawer(false)}
                onOpen={toggleDrawer(true)}
                swipeAreaWidth={drawerBleeding}
                disableSwipeToOpen={true}
                ModalProps={{
                    keepMounted: true,
                }}
            >
                <StyledBox
                    sx={{
                        height: '100%',
                        overflow: 'auto',
                        borderRadius: '1rem 1rem 0 0'
                    }}
                >
                    {children}
                </StyledBox>
            </SwipeableDrawer>
        </Root>
    );
});