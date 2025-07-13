'use client';

import {
    AppBar,
    Toolbar,
    Typography,
    IconButton,
    Drawer,
    List,
    ListItem,
    ListItemText,
    Box,
    Button
} from "@mui/material";
import { useState } from "react";
import MenuIcon from '@mui/icons-material/Menu';
import Link from 'next/link';

const navLinks = [
    { label: 'Home', href: '/' },
    { label: 'Gallery', href: '/gallery' },
    { label: 'Contact', href: '/contact' }
];

const NavBar = () => {
    const [drawerOpen, setDrawerOpen] = useState(false);

    const toggleDrawer = (open) => () => {
        setDrawerOpen(open);
    };

    return (
        <AppBar position="sticky" color="default" elevation={1}>
            <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    David McEwen
                </Typography>

                <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 2 }}>
                    {navLinks.map((link) => (
                        <Button 
                            key={link.label} 
                            color="inherit" 
                            component={Link} 
                            href={link.href}
                        >
                            {link.label}
                        </Button>
                    ))}
                </Box>

                {/* Hamburger menu for mobile view */}
                <IconButton 
                    edge="end" 
                    color="inherit" 
                    aria-label="menu" 
                    onClick={toggleDrawer(true)} 
                    sx={{ display: { xs: 'block', md: 'none' } }}
                >
                    <MenuIcon />
                </IconButton>

            </Toolbar>

            <Drawer
                anchor="right"
                open={drawerOpen}
                onClose={toggleDrawer(false)}
            >
                <List sx={{ width: 200 }}>
                    {navLinks.map((link) => (
                        <ListItem
                         button="true"
                         key={link.label} 
                         component={Link} 
                         href={link.href}
                         onClick={toggleDrawer(false)}
                        >
                            <ListItemText primary={link.label} />
                        </ListItem>
                    ))}
                </List>
            </Drawer>
        </AppBar>
    );
};

export default NavBar;