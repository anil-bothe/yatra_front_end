import HomeTwoTone from "@mui/icons-material/HomeTwoTone";
import { Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import sad from "../assets/img/sad.png";

function Error404() {
  const navigate = useNavigate();
  const getHomePage = () => navigate("/");
  return (
    <center>
      <img src={sad} alt="" />
      <Typography sx={{ my: 2 }} component={"h1"} variant="h5">
        Page not found !
      </Typography>
      <Button onClick={getHomePage} sx={{ mb: 2 }} variant="outlined">
        <HomeTwoTone /> Home page
      </Button>
    </center>
  );
}

export default Error404;
