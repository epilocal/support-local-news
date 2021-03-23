import React from 'react';
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table';

import './styles/table.css';


const tableHeaders = [
  {id: 'url', accesor: 'URL', 'name': 'Site URL'},
  {id: 'name', accesor: 'Publication Name', 'name': 'Name'},
  {id: 'city', accesor: 'City', 'name': 'City'},
  {id: 'state', accesor: 'State', 'name': 'State / Province'},
  {id: 'country', accesor: 'Country', 'name': 'Country'}
];


const TableApp = ({tableData}) => {
    return (
      <Table>
        <Thead>
          <Tr>
            {tableHeaders.map( (header, i) => (
              <Th key={`th-${i}`}>{header.name}</Th>
            ))}
          </Tr>
        </Thead>
        <Tbody>
          {tableData.map( (row, r) => (
            <Tr>
              {tableHeaders.map( (cell, c) => {
                if (cell.id === 'url') {
                  return (
                    <Td key={`td-${r}-${c}`}><a href={row[cell.accesor]} rel="external">{row[cell.accesor]}</a></Td>
                  )
                }
                return (
                  <Td key={`td-${r}-${c}`}>{row[cell.accesor]}</Td>
                )

              })}
            </Tr>

          ))}
        </Tbody>
      </Table>
  )
 }

 export default TableApp;
