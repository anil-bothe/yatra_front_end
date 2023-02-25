import { Box, Pagination, TextField, Typography } from "@mui/material";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { FunctionComponent, useEffect, useState } from "react";
import { YatriResponse, yatriSchemaType } from "../schema/yatri";
import getYatriAPI from "../service/yatri";
import AddYatriModal from "./modal/yatri/AddYatriModal";
import DeleteYatriModal from "./modal/yatri/DeleteYatriModal";
import EditYatriModal from "./modal/yatri/EditYatriModal";

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

const YatriPage: FunctionComponent<SpotProps> = () => {
  const [page, setPage] = useState(1);
  const [keyword, setkeyword] = useState("");
  const [rows, setRows] = useState<YatriResponse>();
  const [error, setError] = useState<string>();

  const handleEdit = (yatri: yatriSchemaType) => {
    setError("");
    const api = getYatriAPI();
    api
      .updateYatri(yatri)
      .then(() => getYatriList())
      .catch((e) => {
        setError(e.message);
      });
  };

  const handleSave = (yatri: yatriSchemaType) => {
    setError("");
    const api = getYatriAPI();
    api
      .addYatri(yatri)
      .then(() => getYatriList())
      .catch((e) => {
        setError(e.message);
      });
  };

  const handleDelete = (id: number) => {
    setError("");
    const api = getYatriAPI();
    api
      .deleteYatri(id)
      .then(() => getYatriList())
      .catch((e) => {
        setError(e.message);
      });
  };

  const getYatriList = () => {
    const api = getYatriAPI();
    api
      .getYatriList({ page: page, keyword: keyword })
      .then((res) => setRows(res));
  };

  const changePage = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  useEffect(() => {
    getYatriList();
  }, [page, keyword]);

  return (
    <>
      <Box sx={displayFlexBetween}>
        <Box>
          <Typography variant="h5">Yatri</Typography>
          <Typography color="error" variant="subtitle2">
            {error}
          </Typography>
        </Box>
        <Box sx={{ display: "flex", gap: 2 }}>
          {rows && (
            <TextField
              size="small"
              label="Search input"
              InputProps={{
                type: "search",
              }}
              onChange={e => setkeyword(e.target.value)}
            />
          )}
          <AddYatriModal onSubmit={handleSave} />
        </Box>
      </Box>
      <Paper sx={{ width: "100%", mb: 2 }}>
        <TableContainer>
          <Table aria-label="Spot table">
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
                    {row.id}
                  </TableCell>
                  <TableCell>{row.name} <br /> {row.mobile}</TableCell>
                  <TableCell>
                    <Box sx={{ ...displayFlexLeft }}>
                      <EditYatriModal onSubmit={handleEdit} item={row} />
                      <DeleteYatriModal
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

export default YatriPage;
