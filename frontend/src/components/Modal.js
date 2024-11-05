import React from "react";
import {
  TextField,
  Button,
  Typography,
  Select,
  InputLabel,
  FormControl,
} from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import FormHelperText from "@mui/material/FormHelperText";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";

export const Modal = ({
  modalOpen,
  handleClose,
  formInputs,
  handleFormInputs,
  handleFormSubmit,
}) => {
  return (
    <Dialog
      open={modalOpen}
      onClose={handleClose}
      maxWidth="lg"
      className="dialogue-container"
    >
      <DialogTitle>
        <Typography>Upload Video</Typography>
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent sx={{ px: 1, pb: 1 }}>
        <FormControl onChange={handleFormInputs}>
          <TextField
            margin="normal"
            id="name"
            label="Video Link"
            fullWidth
            variant="outlined"
            name="videoLink"
            value={formInputs.videoLink}
            //   onChange={handleFormInputs}
          />
          <FormHelperText sx={{ ml: 1, my: 0, mt: "-5px" }}>
            This Link will be used to derive the video
          </FormHelperText>
          <TextField
            margin="normal"
            id="name"
            label="Thumbnail Image Link"
            fullWidth
            variant="outlined"
            name="previewImage"
            value={formInputs.previewImage}
            //   onChange={handleFormInputs}
          />
          <FormHelperText sx={{ ml: 1, my: 0, mt: "-5px" }}>
            This Image will be used as thumbnail
          </FormHelperText>
          <TextField
            margin="normal"
            id="name"
            label="Title"
            fullWidth
            variant="outlined"
            name="title"
            value={formInputs.title}
            //   onChange={handleFormInputs}
          />
          <FormHelperText sx={{ ml: 1, my: 0, mt: "-5px" }}>
            This Title will be respresentative text for video
          </FormHelperText>
          <FormControl fullWidth margin="normal">
            <InputLabel id="genre-label">Genre</InputLabel>
            <Select
              labelId="genre-label"
              value={formInputs.genre}
              label="Genre"
              name="genre"
              margin="none"
              fullWidth
              onChange={handleFormInputs}
            >
              <MenuItem value="Sports">Sports</MenuItem>
              <MenuItem value="Education">Education</MenuItem>
              <MenuItem value="Comedy">Comedy</MenuItem>
              <MenuItem value="Lifestyle">Lifestyle</MenuItem>
              <MenuItem value="Movies">Movies</MenuItem>
            </Select>
            <FormHelperText sx={{ ml: 1 }}>
              Genre will help in categorizing your videos
            </FormHelperText>
          </FormControl>
          <FormControl fullWidth margin="normal">
            <InputLabel id="rating-label">
              Suitable Age Group For The Video
            </InputLabel>
            <Select
              labelId="rating-label"
              value={formInputs.contentRating}
              label="Suitable Age Group For The Video"
              name="contentRating"
              margin="none"
              fullWidth
              onChange={handleFormInputs}
            >
              <MenuItem value="Anyone">Anyone</MenuItem>
              <MenuItem value="12+">12+</MenuItem>
              <MenuItem value="18+">18+</MenuItem>
              <MenuItem value="16+">16+</MenuItem>
              <MenuItem value="7+">7+</MenuItem>
            </Select>
            <FormHelperText sx={{ ml: 1 }}>
              This will be used to filter videos on age group suitability
            </FormHelperText>
          </FormControl>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              disableFuture
              label="Release Date"
              openTo="year"
              views={["year", "month", "day"]}
              inputFormat="DD/MM/YYYY"
              value={formInputs.releaseDate}
              onChange={(e) => {
                handleFormInputs(e);
              }}
              renderInput={(params) => (
                <TextField margin="normal" {...params} />
              )}
            />
            <FormHelperText sx={{ ml: 1, my: 0, mt: "-5px" }}>
              This will be used to sort videos
            </FormHelperText>
          </LocalizationProvider>
        </FormControl>
      </DialogContent>
      <DialogActions sx={{ justifyContent: "flex-start", px: 1 }}>
        <Button
          onClick={handleFormSubmit}
          variant="filled"
          size="medium"
          id="upload-btn-submit"
          sx={{
            backgroundColor: "#EE1520",
            "&:hover": { backgroundColor: "#EE1520" },
          }}
        >
          Upload Video
        </Button>
        <Button onClick={handleClose} sx={{ color: "white" }} id="upload-btn-cancel">
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default Modal;
