import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import * as React from "react";

import CircularProgress from "@mui/material/CircularProgress";
import { ethers } from "ethers";
import { useWeb3AuthContext } from "../contexts/SocialLoginContext";
import {
  abi as SeamlessAbi,
  contract as SeamlessAddress,
} from "../SeamlessContractData";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

function createData(_activity, _runs, _pts) {
  return { _activity, _runs, _pts };
}

const rows = [];

export default function TableComp() {
  const { address, web3Provider } = useWeb3AuthContext();
  const signer = web3Provider.getSigner();

  const [data, setData] = React.useState(null);
  const [isLoading, setIsLoading] = React.useState(false);

  const getActivitiesEmitted = async (library, _signer, account) => {
    const contract = new ethers.Contract(SeamlessAddress, SeamlessAbi, signer);

    const filter = contract.filters.Activity();
    const latestBlock = await library.getBlock("latest");

    const res = await contract.queryFilter(
      filter,
      latestBlock.number - 1000,
      latestBlock.number
    );
    console.log(res);
    const len = res.length;
    let n = 4;
    rows.length = 0;
    for (let i = len - 1; i >= 0; i--) {
      if (n >= 0 && res[i].args[0] === account) {
        const activity = res[i].args[1];
        const runs = res[i].args[2].toString() + " Runs";
        const points = res[i].args[3].toString() + " Pts";

        rows.push(createData(activity, runs, points));
        n--;
      }
      setIsLoading(true);
    }
  };

  React.useEffect(() => {
    getActivitiesEmitted(web3Provider, signer, address);
  }, []);

  return (
    <div>
      {isLoading ? (
        <TableContainer component={Paper}>
          <Table
            sx={{ minWidth: 200, width: 418 }}
            aria-label="customized table"
          >
            <TableHead>
              <TableRow>
                <StyledTableCell>Activity</StyledTableCell>
                <StyledTableCell align="right">Runs</StyledTableCell>
                <StyledTableCell align="right">Pts</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <StyledTableRow key={row._activity}>
                  <StyledTableCell component="th" scope="row">
                    {row._activity}
                  </StyledTableCell>
                  <StyledTableCell align="right">{row._runs}</StyledTableCell>
                  <StyledTableCell align="right">{row._pts}</StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <CircularProgress />
      )}
    </div>
  );
}
