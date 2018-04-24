import * as React from "react"

import {
  AppBar,
  Switch,
  IconButton,
  Typography,
  Toolbar,
  Menu,
  MenuItem,
  FormControlLabel,
  FormGroup,
  Paper,
} from "material-ui"

import MenuIcon from "@material-ui/icons/Menu"
import AccountCircle from "@material-ui/icons/AccountCircle"

export const appBarStyles: React.CSSProperties = {
  height: "50px",
  display: "flex",
  //width: `calc(100% - 150px)`,
  //marginLeft: 250,
}

export const menuButton: React.CSSProperties = {
  marginLeft: "-12",
  marginRight: "20",
}

class _Header extends React.Component<any, any> {
  state = {
    auth: true,
    anchorEl: undefined,
  }

  handleChange = (event: any, checked: boolean) => {
    this.setState({ auth: checked })
  }

  handleMenu = (event: any) => {
    this.setState({ anchorEl: event.currentTarget })
  }

  handleClose = () => {
    this.setState({ anchorEl: undefined })
  }

  render() {
    const { auth, anchorEl } = this.state
    const open = Boolean(anchorEl)
    return (
      <Paper>
        <AppBar style={appBarStyles}>
          <Toolbar>
            <IconButton style={menuButton} color="inherit" aria-label="Menu">
              <MenuIcon />
            </IconButton>
            <Typography variant="title" color="inherit">
              Title
            </Typography>
            <FormGroup>
              <FormControlLabel
                control={
                  <Switch checked={auth} onChange={this.handleChange} aria-label="LoginSwitch" />
                }
                label={auth ? "Logout" : "Login"}
              />
            </FormGroup>
            {auth && (
              <div>
                <IconButton
                  aria-owns={open ? "menu-appbar" : null}
                  aria-haspopup="true"
                  onClick={this.handleMenu}
                  color="inherit"
                >
                  <AccountCircle />
                </IconButton>
                <Menu
                  id="menu-appbar"
                  anchorEl={anchorEl}
                  anchorOrigin={{ vertical: "top", horizontal: "right" }}
                  transformOrigin={{ vertical: "top", horizontal: "right" }}
                  open={open}
                  onClose={this.handleClose}
                >
                  <MenuItem onClick={this.handleClose}>Profile</MenuItem>
                  <MenuItem onClick={this.handleClose}>My account</MenuItem>
                </Menu>
              </div>
            )}
          </Toolbar>
        </AppBar>
      </Paper>
    )
  }
}

export let Header = _Header
