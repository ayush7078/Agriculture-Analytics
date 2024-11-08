import React, { useState } from 'react';
import { Table, Pagination, Tooltip } from '@mantine/core';
import { getAverageYieldAndArea } from '../utils/dataProcessing';

const ROWS_PER_PAGE = 10;

export const CropTableAverage: React.FC = () => {
    const data = getAverageYieldAndArea();
    const [currentPage, setCurrentPage] = useState(1);
    const paginatedData = data.slice((currentPage - 1) * ROWS_PER_PAGE, currentPage * ROWS_PER_PAGE);

    return (
        <div>
            <Table
                striped highlightOnHover withTableBorder withRowBorders={false}
              //  horizontalSpacing="sm" verticalSpacing="md" 
                style={{ border: '1px solid #dee2e6' }}
                styles={{
                    thead: { borderBottom: '2px solid #dee2e6' },
                    tbody: {
                        tr: {
                            '&:not(:last-of-type)': {
                                borderBottom: '1px solid #dee2e6',
                            },
                        },
                        td: { borderRight: '1px solid #dee2e6' },
                    },
                }}
            >
                <Table.Thead>
                    <Table.Tr>
                        <Table.Th>Crop</Table.Th>
                        <Tooltip label="Average Yield of the Crop between 1950-2020 (Kg/Ha)" withArrow>
                        <Table.Th>Average Yield of the Crop...</Table.Th>
                        </Tooltip>
                        <Tooltip label="Average Cultivation Area of the Crop between 1950-2020 (Ha)" withArrow>
                        <Table.Th>Average Cultivation Area...</Table.Th>
                        </Tooltip>
                    </Table.Tr>
                </Table.Thead>
                <Table.Tbody>
                    {paginatedData.map((row, index) => (
                        <Table.Tr key={index}>
                            <Table.Td>{row.Crop}</Table.Td>
                            <Table.Td>{row.AvgYield}</Table.Td>
                            <Table.Td>{row.AvgArea}</Table.Td>
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
