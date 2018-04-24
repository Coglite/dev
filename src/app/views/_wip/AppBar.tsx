export const
;<AppBar
  className={classNames(classes.appBar, isMenuDrawerOpen && classes.appBarLeftShift, {
    [classes.appBarRightShift]: isNodeDrawerOpen || isNodeFormDrawerOpen,
  })}
  onTransitionEnd={this.handleAppBarTransition}
>
  <Toolbar disableGutters={!isMenuDrawerOpen}>
    <IconButton
      color="inherit"
      aria-label="open drawer"
      onClick={this.toggleMenuDrawer}
      className={classNames(classes.menuButton, isMenuDrawerOpen && classes.hide)}
    >
      <MenuIcon />
    </IconButton>
    <Tabs
      value={tabValue}
      onChange={this.handleTabChange}
      centered
      indicatorColor="secondary"
      className={classes.flex}
    >
      <Tab label="Item One" href="#" />
      <Tab label="Item Two" href="#" />
      <Tab label="Item Three" href="#" />
      <Tab label="Item Four" href="#" />
      <Tab label="Item Five" href="#" />
    </Tabs>
    <div>
      <IconButton
        aria-owns={userActionOpen ? "menu-appbar" : null}
        aria-haspopup="true"
        onClick={event => this.handleUserAction(event)}
        color="inherit"
      >
        <AccountCircle />
      </IconButton>
      <IconButton
        aria-owns={userActionOpen ? "menu-appbar" : null}
        aria-haspopup="true"
        onClick={() => this.toggleNodeFormDrawer()}
        color="inherit"
      >
        <BorderRight />
      </IconButton>
      <IconButton
        aria-owns={userActionOpen ? "menu-appbar" : null}
        aria-haspopup="true"
        onClick={() => this.toggleNodeDrawer()}
        color="inherit"
      >
        <FormatAlignRight />
      </IconButton>
      <Menu
        id="menu-appbar"
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        open={userActionOpen}
        onClose={event => this.handleUserAction()}
      >
        <MenuItem onClick={this.handleUserProfile}>Profile</MenuItem>
        <MenuItem onClick={event => this.openThemeDialog()}>Theme Settings</MenuItem>
      </Menu>
    </div>
  </Toolbar>
</AppBar>
