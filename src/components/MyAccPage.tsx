import { Button, Grid, Paper, TextField, Typography } from "@mui/material";
import { FunctionComponent, useEffect, useState } from "react";
import getLoginAPI from "../service/user";

interface MyAccProps {}

export type userData = {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  role_id: number;
};
const MyAccPage: FunctionComponent<MyAccProps> = () => {
  const [userinfo, setUserInfo] = useState<userData>();
  const [msg, setMsg] = useState<string>();

  const onUpdate = () => {
    setMsg("Please wait ...")
    const api = getLoginAPI();
    if (userinfo !== undefined) {
      api.updateMyAcc(userinfo).then((res) => {
        setMsg("Updated successfully!")
        localStorage.setItem("USER_INFO", JSON.stringify(userinfo));
      });
    }
  };
  useEffect(() => {
    const data = localStorage.getItem("USER_INFO");
    if (data) {
      setUserInfo(JSON.parse(data));
    }
  }, []);
  return (
    <>
      {!userinfo ? (
        "Loading...    "
      ) : (
        <Paper sx={{ p: 2 }}>
          <Typography variant="h4">My Account</Typography>
          <Typography color="primary" variant="subtitle2">{msg}</Typography>

          <Grid container spacing={2} sx={{ p: 2 }}>
            <Grid md={6} sm={6} lg={6} item>
              <Typography variant="h5">UID</Typography>
            </Grid>
            <Grid md={6} sm={6} lg={6} item>
              <TextField
                variant="outlined"
                disabled
                value={userinfo.id}
                size="small"
              />
            </Grid>
            <Grid md={6} sm={6} lg={6} item>
              <Typography variant="h5">First Name</Typography>
            </Grid>
            <Grid md={6} sm={6} lg={6} item>
              <TextField
                onChange={(e) =>
                  setUserInfo((prevState) => ({
                    ...userinfo,
                    first_name: e.target.value,
                  }))
                }
                variant="outlined"
                value={userinfo.first_name}
                size="small"
              />
            </Grid>

            <Grid md={6} sm={6} lg={6} item>
              <Typography variant="h5">Last Name</Typography>
            </Grid>
            <Grid md={6} sm={6} lg={6} item>
              <TextField
                variant="outlined"
                onChange={(e) =>
                  setUserInfo((prevState) => ({
                    ...userinfo,
                    last_name: e.target.value,
                  }))
                }
                value={userinfo.last_name}
                size="small"
              />
            </Grid>

            <Grid md={6} sm={6} lg={6} item>
              <Typography variant="h5">Email</Typography>
            </Grid>
            <Grid md={6} sm={6} lg={6} item>
              <TextField
                variant="outlined"
                disabled
                value={userinfo.email}
                size="small"
              />
            </Grid>

            <Grid md={6} sm={6} lg={6} item>
              <Typography variant="h5">Role ID</Typography>
            </Grid>
            <Grid md={6} sm={6} lg={6} item>
              <TextField
                variant="outlined"
                disabled
                value={userinfo.role_id}
                size="small"
              />
            </Grid>
            <Grid md={6} sm={6} lg={6} item>
              <Button onClick={onUpdate} color="primary" variant="contained">
                Update Profile
              </Button>
            </Grid>
          </Grid>
        </Paper>
      )}
    </>
  );
};

export default MyAccPage;
