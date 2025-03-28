import { Button, AppBar, Toolbar, Box } from "@mui/material";
import { Link, Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <>
      <AppBar position="fixed" color="primary">
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          <Button
            color="inherit"
            component={Link}
            to={"/subjects"}
            sx={{ fontSize: "20px" }}
          >
            Subjects
          </Button>
          <Button
            color="inherit"
            component={Link}
            to={"/classes"}
            sx={{ fontSize: "20px" }}
          >
            Classes
          </Button>
          <Button
            color="inherit"
            component={Link}
            to={"/teachers"}
            sx={{ fontSize: "20px" }}
          >
            Teachers
          </Button>
          <Button
            color="inherit"
            component={Link}
            to={"/pupils"}
            sx={{ fontSize: "20px" }}
          >
            Pupils
          </Button>
        </Toolbar>
      </AppBar>

      <Box sx={{ marginTop: "64px" }}>
        <main>
          <Outlet />
        </main>
      </Box>
    </>
  );
}
