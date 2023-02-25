import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import { useState } from "react";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 2,
};

export default function DeleteSpotModal(props: any) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const onDelete = () => {
    props.onSubmit(props.id);
    handleClose();
  };

  return (
    <div>
      <Button
        onClick={handleOpen}
        size="small"
        color="error"
        variant="contained"
      >
        Delete
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Do you want to delete?
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <strong>{props.name}</strong> will delete permenently. You can't get
            this item back!
          </Typography>
          <Box sx={{ display: "flex", justifyContent: "end" }}>
            <Button
              onClick={onDelete}
              size="small"
              color="error"
              variant="contained"
            >
              Delete
            </Button>
          </Box>
        </Box>
      </Modal>
    </div>
  );
}
