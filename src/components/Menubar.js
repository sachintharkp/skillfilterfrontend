import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import { Link}  from 'react-router-dom';

const pages = ['Manager', 'Employee'];
const settings = ['Profile', 'Logout'];

function ResponsiveAppBar() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const [anchorElManager, setAnchorElManager] = React.useState(null);
  const handleClickManagerMenu = (event) => {
    setAnchorElManager(event.currentTarget);
  };
  const handleCloseManagerMenu = () => {
    setAnchorElManager(null);
  };

  const [anchorElEmployee, setAnchorElEmployee] = React.useState(null);
  const handleClickEmployeeMenu = (event) => {
    setAnchorElEmployee(event.currentTarget);
  };
  const handleCloseEmployeeMenu = () => {
    setAnchorElEmployee(null);
  };

  return (
    <div>
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <FilterAltIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            FILTRERA
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
            <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
             <MenuItem key='Manager' onClick={handleCloseNavMenu}>
             <Link to= '/manager' underline="none" >Manager</Link>
             </MenuItem>
             <MenuItem key='Employee' onClick={handleCloseNavMenu}>
             <Link to= '/employee'underline="none" >Employee</Link>
             </MenuItem>
            </Menu>
          </Box>
          
          
          <FilterAltIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href=""
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            FILTRERA
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            <div>
            <Tooltip title="Open Manager Menu">
               <Button
                key={'Manager'}
                onClick={handleClickManagerMenu}
                sx={{ my: 2, color: 'white', display: 'block' }}
                aria-controls={Boolean(anchorElManager) ? 'basic-menu1' : undefined}
                aria-haspopup="true"
                aria-expanded={Boolean(anchorElManager) ? 'true' : undefined}
               >
                Manager
              </Button>
              </Tooltip>
              <Menu
                 id="basic-menu1"
                 anchorEl={anchorElManager}
                 open={Boolean(anchorElManager)}
                 onClose={handleCloseManagerMenu}
                 MenuListProps={{
                   'aria-labelledby': 'basic-button',
                 }}
               >
               <MenuItem onClick={handleCloseManagerMenu}><Link to= '/skill'underline="none" >Add Skill</Link></MenuItem>
               <MenuItem onClick={handleCloseManagerMenu}><Link to= '/assignment'underline="none" >Add Assignment</Link></MenuItem>
               <MenuItem onClick={handleCloseManagerMenu}><Link to= '/filter'underline="none" >Filter</Link></MenuItem>
             </Menu>
              </div>
              <div>
              <Tooltip title="Open Employee Menu">
               <Button
                key={'Employee'}
                onClick={handleClickEmployeeMenu}
                sx={{ my: 2, color: 'white', display: 'block' }}
                aria-controls={Boolean(anchorElEmployee) ? 'basic-menu2' : undefined}
                aria-haspopup="true"
                aria-expanded={Boolean(anchorElEmployee)? 'true' : undefined}
               >
                Employee
              </Button>
              </Tooltip>
              <Menu
                 id="basic-menu2"
                 anchorEl={anchorElEmployee}
                 open={Boolean(anchorElEmployee)}
                 onClose={handleCloseEmployeeMenu}
                 MenuListProps={{
                   'aria-labelledby': 'basic-button',
                 }}
               >
               <MenuItem onClick={handleCloseEmployeeMenu}>Add Employee</MenuItem>
               <MenuItem onClick={handleCloseEmployeeMenu}>View Eployees</MenuItem>
             </Menu>
             </div>     
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
    </div>
  );
}
export default ResponsiveAppBar;
