import React from "react";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Box, Stack, CardActionArea } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';

import "./videoCard.css"

const VideoCard = ({video}) => {
    const getDateDiff = (d1,d2) => {
      //find difference inn ms
      let diff  = d1.getTime() - d2.getTime();
      let diffDays = parseInt(diff/(1000*60*60*24));
      //find year gap if > 0 return year
      if(parseInt(diffDays/365) > 0 ){
        let val = parseInt(diffDays/365);
        if(val===1) return `${parseInt(diffDays/365)} year ago`;
        return `${parseInt(diffDays/365)} years ago`
      }
      //find months gap if > 0 return months
      else if(parseInt(diffDays/30) > 0 ){
        let val = parseInt(diffDays/30);
        if(val===1) return `${parseInt(diffDays/30)} month ago`;
        return `${parseInt(diffDays/30)} months ago`
      }
      //find day gap if > 0 return days
      else if(diffDays > 0 ){
        if(diffDays===1) return `${parseInt(diffDays)} day ago`;
        return `${diffDays} days ago`
      }
      let diffHours = parseInt(diff/(1000*60*60));
      //find hours gap
      if(parseInt(diffHours) > 0 ){
        if(diffHours===1) return `${parseInt(diffHours)} hour ago`;
        return `${parseInt(diffHours)} hours ago`
      }
      let diffminutes = parseInt(diff/(1000*60))
      //find minutes gap
      if(parseInt(diffminutes) > 0 ){
        if(diffminutes===1) return `${parseInt(diffminutes)} min ago`;
        return `${parseInt(diffminutes)} mins ago`
      }
      return "0 mins ago";
    }
    let currentDate = new Date();
    let uploadDate = new Date(video.releaseDate);

    let gap = getDateDiff(currentDate,uploadDate);
    return (
      <Card sx={{ maxWidth: 270, maxHeight: 220 }} className="video-tile">
        <CardActionArea>
          <CardMedia
            component="img"
            height="150"
            image={video.previewImage}
            alt="green iguana"
          />
          <CardContent sx={{ p: 1 }}>
            <Typography variant="subtitle2" className="cardText">
              {video.title}
            </Typography>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Typography variant="body3" color="text.secondary">
                {gap}
              </Typography>
              <Stack direction="row" spacing={0.5} sx={{alignItems: "center"}}>
                <VisibilityIcon fontSize="small"/>
                <Typography variant="body3" color="text.secondary">
                  {video.viewCount}
                </Typography>
              </Stack>
            </Box>
          </CardContent>
        </CardActionArea>
      </Card>
    );
}

export default VideoCard