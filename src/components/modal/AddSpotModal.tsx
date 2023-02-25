import { zodResolver } from "@hookform/resolvers/zod";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormGroup from "@mui/material/FormGroup";
import Modal from "@mui/material/Modal";
import Switch from "@mui/material/Switch";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import {
  spotSchema,
  spotSchemaType
} from "../../schema/spot";

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

export default function AddSpotModal(props: any) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<spotSchemaType>({
    resolver: zodResolver(spotSchema),
  });

  const onAdd: SubmitHandler<spotSchemaType> = (data: spotSchemaType) => {
    props.onSubmit(data);
    handleClose();
  };

  return (
    <div>
      <Button onClick={handleOpen} color="primary" variant="outlined">
        Add
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <form action="" onSubmit={handleSubmit(onAdd)}>
          <Box sx={style}>
            <Typography
              sx={{ mb: 2 }}
              id="modal-modal-title"
              variant="h6"
              component="h2"
            >
              Add Spot
            </Typography>
            <FormGroup sx={{ mb: 2 }}>
              <TextField
                {...register("name")}
                label="Name"
                variant="standard"
              />
              <Typography variant="subtitle2" color="error">
                {errors.name?.message}
              </Typography>
            </FormGroup>
            <FormGroup sx={{ mb: 2 }}>
              <TextField
                {...register("description")}
                label="Description"
                variant="standard"
              />
              <Typography variant="subtitle2" color="error">
                {errors.description?.message}
              </Typography>
            </FormGroup>
            <FormGroup sx={{ mb: 2 }}>
              <FormControlLabel
                control={<Switch defaultChecked {...register("is_current")} />}
                label="Current spot"
              />
            </FormGroup>

            <Box sx={{ display: "flex", justifyContent: "end" }}>
              <Button
                size="small"
                type="submit"
                color="primary"
                variant="contained"
              >
                Save
              </Button>
            </Box>
          </Box>
        </form>
      </Modal>
    </div>
  );
}
