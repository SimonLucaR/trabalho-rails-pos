import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';

// Material Icons
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";

import { useEffect, useState } from "react";
import ItemTypeService from "../../src/services/ItemTypeService";


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
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

function createData(
  name: string,
  calories: number,
  fat: number,
  carbs: number,
  protein: number,
) {
  return { name, calories, fat, carbs, protein };
}

function ItemTypeList() {

  const [itemtypes, setItemTypes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const getItemTypes = async () => {
    let data = await ItemTypeService.getAll()

    setItemTypes(data)
  }

  useEffect(() => {
    getItemTypes().then(() => {
      setIsLoading(false)
    })

  }, [])

  const deleteItemType = (itemtype) => {

    var result = confirm(`Você realmente gostaria de deletar o tipo de item: ${itemtype.name}`)

    if (!result) return

    setIsLoading(true);
    ItemTypeService.destroy(itemtype.id).then((data) => {
      getItemTypes().then(() => {
        setIsLoading(false)
        console.log('Tipo de item Destruido Success')
      }).catch((e) => {
        console.error(e)
      })
    })
  }


  if (isLoading) return <p>Carregando</p>

  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              <StyledTableCell align="center">ID</StyledTableCell>
              <StyledTableCell align="left">Name</StyledTableCell>
              <StyledTableCell align="right"></StyledTableCell>

            </TableRow>
          </TableHead>
          <TableBody>
            {
              itemtypes.map((itemtype) => (
                <StyledTableRow key={itemtype.id} >
                  <StyledTableCell align="center">{itemtype.id}</StyledTableCell>
                  <StyledTableCell align="left">{itemtype.name}</StyledTableCell>
                  <StyledTableCell align="left">{itemtype.type}</StyledTableCell>
                  <StyledTableCell align="right"><Button variant="contained" href="#contained-buttons" color="error" size="small"><DeleteForeverIcon fontSize="small" />Delete</Button></StyledTableCell>
                </StyledTableRow>
              ))
            }
          </TableBody>
        </Table>
      </TableContainer>
    </>
  )
}

export default ItemTypeList;