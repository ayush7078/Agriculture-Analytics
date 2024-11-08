import React, { useState } from 'react';
import { Table, Pagination } from '@mantine/core';
import { getMaxMinProductionByYear } from '../utils/dataProcessing';

const ROWS_PER_PAGE = 10;

export const CropTableMaxMin: React.FC = () => {
    const data = getMaxMinProductionByYear();
    const [currentPage, setCurrentPage] = useState(1);
    console.log("data", data)

    const paginatedData = data.slice((currentPage - 1) * ROWS_PER_PAGE, currentPage * ROWS_PER_PAGE);

    return (
        <div>
            <Table
               striped highlightOnHover withTableBorder withRowBorders={false}
              // horizontalSpacing="sm" verticalSpacing="sm"
               style={{ border: '1px solid #dee2e6' }}
                styles={{
                    thead: { borderBottom: '2px solid #dee2e6' },
                    tbody: {
                        tr: {
                            '&:not(:last-of-type)': {
                                borderBottom: '1px solid #dee2e6',
                            },
                        },
                        td: { borderRight: '1px solid #dee2e6',  textAlign: 'center' },
                    },
                }}
            >
                <Table.Thead>
                    <Table.Tr>
                        <Table.Th>Year   </Table.Th>
                        <Table.Th>Crop with Max Production</Table.Th>
                        <Table.Th>Crop with Min Production</Table.Th>
                    </Table.Tr>
                </Table.Thead>
                <Table.Tbody>
                    {paginatedData.map((row, index) => (
                        <Table.Tr key={index}>
                            <Table.Td>{row.Year}</Table.Td>
                            <Table.Td>{row.MaxCrop}</Table.Td>
                            <Table.Td>{row.MinCrop}</Table.Td>
                        </Table.Tr>
                    ))}
                </Table.Tbody>
            </Table>
            <div style={{ display: 'flex', justifyContent: 'center'}}>

            <Pagination
                total={Math.ceil(data.length / ROWS_PER_PAGE)}
                value={currentPage}
                                onChange={setCurrentPage}
             mt="sm"
            />
        </div>
        </div>

    );

};
