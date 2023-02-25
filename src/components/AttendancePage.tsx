import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import RadioButtonUncheckedRoundedIcon from "@mui/icons-material/RadioButtonUncheckedRounded";
import { styled } from "@mui/material/styles";
import CircularProgress from "@mui/material/CircularProgress";

import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { FunctionComponent, useEffect, useState } from "react";
import { Spot } from "../schema/spot";
import { Yatri } from "../schema/yatri";
import getAttendanceAPI from "../service/attendance";
import getSpotAPI from "../service/spot";
import getYatriAPI from "../service/yatri";
import FilterAltRoundedIcon from "@mui/icons-material/FilterAltRounded";

interface AttendancePageProps {}
const StyledGridOverlay = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
}));

function CustomNoRowsOverlay() {
  return (
    <StyledGridOverlay>
      <CircularProgress color="info" />
      <Typography sx={{ mt: 2 }}>Fetching data ...</Typography>
    </StyledGridOverlay>
  );
}

const AttendancePage: FunctionComponent<AttendancePageProps> = () => {
  const [currentSpot, setCurrentSpot] = useState<Spot>();
  const [currentSpotId, setCurrentSpotId] = useState<number>(0);
  const [pageSize, setPageSize] = useState<number>(10);
  const [spotList, setSpotList] = useState<Spot[]>([]);
  const [yatri, setYatri] = useState<Yatri[]>([]);
  const [attendanceLoading, setAttendanceLoading] = useState(false);

  const statusOff = (yatriId: number) => {
    onAttendance(yatriId, false);
  };
  const statusOn = (yatriId: number) => {
    onAttendance(yatriId, true);
  };

  const onAttendance = (yatriId: number, status: boolean) => {
    setAttendanceLoading(true);
    if (currentSpot !== undefined) {
      getAttendanceAPI()
        .putAttendance(currentSpot.id, yatriId, status)
        .then(() => {
          setYatri((prevState) => {
            prevState = prevState.map((o) => {
              if (o.id === yatriId && o.attendance !== undefined) {
                o.attendance.is_present = !o.attendance.is_present;
              }
              return o;
            });
            return prevState;
          });
          setAttendanceLoading(false);
        })
        .catch(() => setAttendanceLoading(false));
    }
  };

  function getAllYatri() {
    getYatriAPI()
      .getYatriList({ type: "all" })
      .then((res) => {
        setYatri(res.data);
        setAttendanceLoading(false);
      });
  }

  useEffect(() => {
    setAttendanceLoading(true);
    const api = getSpotAPI();
    api
      .getCurrentSpot()
      .then((data) => {
        setCurrentSpot(data);
        api
          .getSpotList({ type: "all" })
          .then((res) => setSpotList(res.data.filter((o) => o.id !== data.id)));
        getAllYatri();
        setAttendanceLoading(false);
      })
      .catch(() => setAttendanceLoading(false));
  }, []);

  useEffect(() => {
    setAttendanceLoading(true);
    if (currentSpotId !== 0) {
      getAttendanceAPI()
        .getAttendanceBySpotId(currentSpotId, {})
        .then((res) => {
          setYatri(res.data);
          setAttendanceLoading(false);
        });
    } else {
      getAllYatri();
    }
  }, [currentSpotId]);

  if (currentSpot === undefined) {
    return <Typography color="info">Please wait ...</Typography>;
  }

  if (!yatri) {
    <Typography>Loading ...</Typography>;
  }
  const columns: GridColDef[] = [
    {
      field: "id",
      headerName: "ID",
      width: 50,
      renderCell: (params: any) => (
        <span style={{ fontSize: 12 }}>{params.row.id}</span>
      ),
    },
    {
      field: "name",
      headerName: "Name",
      width: 150,
      renderCell: (params: any) => {
        return (
          <div style={{ fontSize: 12 }}>
            <span>{params.row.name}</span> <br />
            <span>{params.row.mobile}</span>
          </div>
        );
      },
    },
    // {
    //   field: "attendance",
    //   headerName: "IsPresent",
    //   valueGetter: (params: any) => {
    //     if (params.row.attendance.is_present) {
    //       return "Yes";
    //     }
    //     return "No";
    //   },
    // },
    {
      field: "action",
      headerName: "Action",
      sortable: false,
      width: 100,
      renderCell: (params: any) => {
        if (
          !params.row.attendance ||
          (params.row.attendance && !params.row.attendance.is_present)
        ) {
          return (
            <IconButton onClick={() => statusOn(params.row.id)}>
              <RadioButtonUncheckedRoundedIcon color="error" />
            </IconButton>
          );
        }
        return (
          <IconButton onClick={() => statusOff(params.row.id)}>
            <CheckCircleRoundedIcon color="primary" />
          </IconButton>
        );
      },
    },
  ];

  return (
    <div style={{ height: "100vh", width: "100%" }}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "left",
          gap: 2,
          mb: 2,
        }}
      >
        <Typography variant="subtitle2" color="primary">
          Current spot: {currentSpot.name}
        </Typography>
        <FormControl sx={{ width: 200 }}>
          <InputLabel id="prev_spot_id2">Previous spot</InputLabel>
          <Select
            labelId="prev_spot_id2"
            id="prev_spot_id"
            value={currentSpotId}
            size="small"
            label="Previous spot"
            onChange={(e) => setCurrentSpotId(e.target.value as number)}
          >
            {" "}
            <MenuItem value={0} selected>
              --
            </MenuItem>
            {spotList.map((item) => (
              <MenuItem key={`new-${item.id}`} value={item.id}>
                {item.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl sx={{ width: 200 }}>
          <InputLabel id="demo-simple-select-label">Page size</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={pageSize}
            size="small"
            label="Page size"
            onChange={(e) => setPageSize(e.target.value as number)}
          >
            <MenuItem value={10}>10</MenuItem>
            <MenuItem value={50}>50</MenuItem>
            <MenuItem value={100}>100</MenuItem>
          </Select>
        </FormControl>
      </Box>
      <DataGrid
        components={{
          NoRowsOverlay: CustomNoRowsOverlay,
          ColumnMenuIcon: () => <FilterAltRoundedIcon color="primary" />,
        }}
        loading={attendanceLoading}
        density="compact"
        rows={yatri}
        columns={columns}
        pageSize={pageSize}
        rowsPerPageOptions={[pageSize]}
        disableSelectionOnClick
      />
    </div>
  );
};

export default AttendancePage;
