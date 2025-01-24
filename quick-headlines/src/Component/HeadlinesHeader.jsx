import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

/**
 * The header to be displayed at the top of the page.
 */
function HeadlinesHeader() {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6">HeadlinesFeed App</Typography>
      </Toolbar>
    </AppBar>
  );
}

export default HeadlinesHeader;