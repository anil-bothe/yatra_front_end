import LocationOnRoundedIcon from "@mui/icons-material/LocationOnRounded";
import {
  Autocomplete,
  Box,
  Pagination,
  TextField,
  Typography
} from "@mui/material";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import {
  FunctionComponent,
  useEffect,
  useState
} from "react";
import { Spot, SpotResponse, spotSchemaType } from "../schema/spot";
import getSpotAPI from "../service/spot";
import AddSpotModal from "./modal/AddSpotModal";
import DeleteSpotModal from "./modal/DeleteSpotModal";
import EditSpotModal from "./modal/EditSpotModal";

const displayFlexBetween = {
  mb: 2,
  display: "flex",
  justifyContent: "space-between",
};

const displayFlexLeft = {
  gap: 1,
  display: "flex",
  justifyContent: "left",
};

interface SpotProps {}

const SpotPage: FunctionComponent<SpotProps> = () => {
  const [page, setPage] = useState(1);
  const [options, setOptions] = useState<Spot[]>([]);
  const [keyword, setkeyword] = useState("");
  const [rows, setRows] = useState<SpotResponse>();
  const [error, setError] = useState<string>();

  const handleEdit = (spot: spotSchemaType) => {
    setError("");
    const api = getSpotAPI();
    api
      .updateSpot(spot)
      .then(() => getSpotList())
      .catch((e) => {
        setError(e.message);
      });
  };

  const handleSave = (spot: spotSchemaType) => {
    setError("");
    const api = getSpotAPI();
    api
      .addSpot(spot)
      .then(() => getSpotList())
      .catch((e) => {
        setError(e.message);
      });
  };

  const handleDelete = (id: number) => {
    setError("");
    const api = getSpotAPI();
    api
      .deleteSpot(id)
      .then(() => getSpotList())
      .catch((e) => {
        setError(e.message);
      });
  };

  const getSpotList = () => {
    const api = getSpotAPI();
    api
      .getSpotList({ page: page, keyword: keyword })
      .then((res) => setRows(res));
  };

  const changePage = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  useEffect(() => {
    getSpotList();
  }, [page, keyword]);

  useEffect(() => {
    getSpotAPI()
      .getSpotList({ type: "all" })
      .then((res) => setOptions(res.data));
  }, []);

  return (
    <>
      <Box sx={displayFlexBetween}>
        <Box>
          <Typography variant="h5">Spot</Typography>
          <Typography color="error" variant="subtitle2">
            {error}
          </Typography>
        </Box>
        <Box sx={{ display: "flex", gap: 2 }}>
          {rows && (
            <Autocomplete
              freeSolo
              id="free-solo-2-demo"
              disableClearable
              size="small"
              onChange={(event, value) => setkeyword(value)}
              options={options.map((option) => option.name)}
              sx={{ width: 200 }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Search input"
                  InputProps={{
                    ...params.InputProps,
                    type: "search",
                  }}
                />
              )}
            />
          )}
          <AddSpotModal onSubmit={handleSave} />
        </Box>
      </Box>
      <Paper sx={{ width: "100%", mb: 2 }}>
        <TableContainer>
          <Table size="small" aria-label="Spot table">
            <TableHead>
              <TableRow>
                <TableCell>#</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows?.data.map((row, index) => (
                <TableRow key={row.id}>
                  <TableCell width={50} component="th" scope="row">
                    {!row.is_current ? (
                      row.id
                    ) : (
                      <LocationOnRoundedIcon color="info" />
                    )}
                  </TableCell>
                  <TableCell>{row.name} <br /> Attendance: <b>{row.total_attendance}</b></TableCell>
                  <TableCell>
                    <Box sx={{ ...displayFlexLeft }}>
                      <EditSpotModal onSubmit={handleEdit} item={row} />
                      <DeleteSpotModal
                        onSubmit={handleDelete}
                        id={row.id}
                        name={row.name}
                      />
                    </Box>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        {rows && (
          <Box sx={{ display: "flex", justifyContent: "end" }}>
            <Pagination
              sx={{ py: 2 }}
              count={rows.paginator.total_pages}
              page={page}
              onChange={changePage}
            />
          </Box>
        )}
      </Paper>
    </>
  );
};

export default SpotPage;
