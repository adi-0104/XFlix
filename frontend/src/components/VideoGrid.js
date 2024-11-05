
import { Grid } from "@mui/material";
import { Link} from "react-router-dom";
import VideoCard from "./VideoCard";

const VideoGrid = ({ videoList , setReload}) => {
  return (
    <Grid container spacing={1}>
      {videoList.map((video) => (
        <Grid key={video._id} item xs={6} sm={3} sx={{ mb: 2 }} >
          <Link to={`/videos/${video._id}`} reloadDocument = {setReload ? true : false} className="link video-tile-link" >
            <VideoCard video={video} />
          </Link>
        </Grid>
      ))}
    </Grid>
  );
};

export default VideoGrid;
