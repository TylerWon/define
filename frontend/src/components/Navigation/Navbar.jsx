import MenuIcon from '@mui/icons-material/Menu';
import {
  AppBar,
  Box,
  Grid,
  IconButton,
  Link as MuiLink,
  Menu,
  MenuItem,
  MenuList,
  Stack,
  Toolbar,
  Typography
} from "@mui/material";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { 
  Link as ReactRouterLink, 
  Outlet, 
  useNavigate
} from "react-router-dom";

import { logout, selectUser } from "../../state/slices/userSlice";

// The Navbar for the website
export default function Navbar(props) {
  // State
  const [menuOpen, setMenuOpen] = useState(false);
  const [menuAnchorEl, setMenuAnchorEl] = useState(null);

  // React Redux hooks
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  // React Router hooks
  const navigate = useNavigate();

  // Handler for when logout is clicked
  const handleLogoutClick = () => {
    dispatch(logout());
    navigate("/");
  }
  
  // Handler for when hamburger menu is clicked
  const handleMenuClick = (event) => {
    setMenuAnchorEl(event.currentTarget);
    setMenuOpen(true);
  }

  // Handler for when hamburger menu is closed
  const handleMenuClose = () => {
    setMenuAnchorEl(null);
    setMenuOpen(false);
  }

  // A link to a page on the website 
  const PageLink = (props) => {
    const { color, name, route } = props;

    return (
      <MuiLink component={ReactRouterLink} to={route} color={color} underline="none">
        <Typography>{name}</Typography>
      </MuiLink>
    );
  }

  return (
    <>
      <AppBar sx={{ bgcolor: "white" }}>
        <Toolbar>
          <Grid
            container
            alignItems="center"
            justifyContent="center"
          >
            <Grid item>
              <MuiLink 
                component={ReactRouterLink} 
                to="/"
                underline="none"
                color="black"
              >
                <Typography variant="h4">define</Typography>
              </MuiLink>
            </Grid>
            <Grid item xs={true}>
              <Box sx={{ display: {xs: "none", sm: "block" }}}>
                <Stack
                  direction="row"
                  spacing={4}
                  alignItems="center"
                  justifyContent="flex-end"
                >
                {user.id ? 
                  <> 
                    <PageLink color="primary" name="Profile" route="/profile" />
                    <MuiLink component="button" onClick={handleLogoutClick} underline="none" color="primary">
                      <Typography>Logout</Typography>
                    </MuiLink>     
                  </>
                : 
                  <>
                    <PageLink color="primary" name="Login" route="/login" />
                    <PageLink color="primary" name="Sign up" route="/register" />
                  </>
                }
                </Stack>
              </Box>

              <Box sx={{ display: {xs: "block", sm: "none" }}}>
                <Stack
                  direction="row"
                  alignItems="center"
                  justifyContent="flex-end"
                  sx={{ width: "100%" }}
                >
                  <IconButton onClick={handleMenuClick}>
                    <MenuIcon />
                  </IconButton>
                  <Menu
                    anchorEl={menuAnchorEl}
                    open={menuOpen}
                    onClose={handleMenuClose}
                    onClick={handleMenuClose}
                  >
                    {user.id ? 
                      <MenuList> 
                        <MenuItem>
                          <PageLink color="inherit" name="Profile" route="/profile" />
                        </MenuItem>
                        <MenuItem onClick={handleLogoutClick}>
                          <Typography>Logout</Typography>
                        </MenuItem>
                      </MenuList>
                    : 
                      <MenuList> 
                        <MenuItem>
                          <PageLink color="inherit" name="Login" route="/login" />
                        </MenuItem>
                        <MenuItem>
                          <PageLink color="inherit" name="Sign up" route="/register" />
                        </MenuItem>
                      </MenuList>
                    }
                  </Menu>
                </Stack> 
              </Box>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>

      <Outlet />
    </>
  )
}
