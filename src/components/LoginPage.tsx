import { zodResolver } from "@hookform/resolvers/zod";
import VisibilityOffTwoToneIcon from "@mui/icons-material/VisibilityOffTwoTone";
import VisibilityTwoToneIcon from "@mui/icons-material/VisibilityTwoTone";
import { Box, Button, Link, Paper, TextField, Typography } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import { FunctionComponent, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { LoginSchema, LoginSchemaType } from "../schema/user";
import getLoginAPI from "../service/user";
import CircularProgress from "@mui/material/CircularProgress";

const style = {
  minHeight: "100vh",
  minWidth: "100%",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  backgroundColor: "#0093E9",
  backgroundImage: "linear-gradient(160deg, #0093E9 0%, #80D0C7 100%)",
};

interface LoginProps {}

const Login: FunctionComponent<LoginProps> = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [loadingAPI, setLoadingAPI] = useState(false);
  const [error, setError] = useState()

  const navigate = useNavigate();
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const {
    register,
    handleSubmit,
  } = useForm<LoginSchemaType>({
    resolver: zodResolver(LoginSchema),
  });

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  const onSubmit = (data: LoginSchemaType) => {
    setLoadingAPI(true);
    const api = getLoginAPI();
    api
      .login(data)
      .then((data) => {
        setLoadingAPI(false);
        return navigate("/");
      })
      .catch(e => {
        try {
          setError(e.response.data.message)
        } catch {
          console.log(e.message)
        }
        setLoadingAPI(false)
      });
  };

  return (
    <Box sx={{ ...style }}>
      <Paper variant="elevation" elevation={3}>
        <Box sx={{ maxWidth: 400, padding: 3 }}>
          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <Typography className="text-center" component="h5" variant="h5">
              Yatra Login
            </Typography>
            {loadingAPI && <CircularProgress color="info" />}
          </Box>
          <Typography color="error" variant="subtitle2">{error && error}</Typography>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Box sx={{ my: 2 }}>
              <TextField
                sx={{ width: "100%", mb: 2 }}
                id="standard-basic"
                label="Email"
                type="email"
                variant="outlined"
                {...register("username")}
              />
              <TextField
                sx={{ width: "100%" }}
                id="standard-basic2"
                label="Password"
                variant="outlined"
                {...register("password")}
                type={showPassword ? "text" : "password"}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="start" sx={{ cursor: "pointer" }}>
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {showPassword ? (
                          <VisibilityOffTwoToneIcon />
                        ) : (
                          <VisibilityTwoToneIcon />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </Box>
            <Box
              sx={{
                display: "flex",
                gap: 1,
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Link href="">Forget password</Link>
              <Button disabled={loadingAPI} type="submit" variant="contained">
                Login
              </Button>
            </Box>
          </form>
        </Box>
      </Paper>
    </Box>
  );
};

export default Login;
