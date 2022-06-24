import * as React from "react";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import useGlobal from "../hooks/useGlobal";

export default function CircularIndeterminate() {
  const { loading } = useGlobal();
  return (
    <Box
      sx={{ display: loading ? "flex" : "none" }}
      // sx={{ display: "flex" }}
      className="container-modal"
    >
      <CircularProgress />
    </Box>
  );
}
