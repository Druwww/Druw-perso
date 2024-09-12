import { CircularProgress } from "@mui/material";

import "./loadingAll.css"

export default function LoadingAll() {
    // You can add any UI inside Loading, including a Skeleton.
    return (
      <div className="loading-all-container">
        <CircularProgress className="loading-all" />
      </div>
    );
  }