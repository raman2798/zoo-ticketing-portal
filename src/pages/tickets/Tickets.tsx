import { FC, ReactElement, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box } from '@mui/material';
import { Visibility } from '@mui/icons-material';
import { GridColDef } from '@mui/x-data-grid';
import { get, isArray, isEmpty } from 'lodash';
import { CustomButton, CustomIconButton, CustomTable, NoContent } from '@/components';
import { ITicket, readAllTickets } from './TicketActions';
import { IPagination, IQuery } from '@/interfaces';

interface ActionProps {
  row: { id: string };
}

const Ticket: FC = (): ReactElement => {
  const navigate = useNavigate();

  const [tickets, setTickets] = useState<ITicket[]>([]);

  const [pagination, setPagination] = useState<IPagination>({
    page: 0,
    pageSize: 5,
  });

  const [rowCount, setRowCount] = useState<number>(5);

  const fetchTickets = async (query: IQuery): Promise<void> => {
    const result = await readAllTickets(query);

    let newTickets: ITicket[] = [];

    if (result) {
      newTickets = isArray(result?.data) ? result.data : [result?.data];
    }

    setTickets(newTickets);

    const totalResults = get(result, 'totalResults', 5);

    setRowCount(totalResults);
  };

  useEffect(() => {
    const query: IQuery = {
      page: get(pagination, 'page') + 1,
      limit: get(pagination, 'pageSize'),
    };

    fetchTickets(query);
  }, [pagination]);

  const handleActionClick = (type: string, id: string = ''): void => {
    const url = `/tickets/counters/form${id ? `?id=${id}&` : '?'}type=${type}`;

    navigate(url);
  };

  const renderActionsCell = ({ row }: ActionProps): ReactElement => {
    const ticketId = get(row, 'id', '');

    return (
      <Box sx={{ m: 'auto' }}>
        <CustomIconButton hasTooltip tooltip={{ title: 'View' }} arialabel="view" onClick={() => handleActionClick('view', ticketId)}>
          <Visibility />
        </CustomIconButton>
      </Box>
    );
  };

  const columns: GridColDef[] = [
    {
      field: 'ticketId',
      headerName: 'Ticket Number',
      width: 250,
    },
    {
      field: 'actions',
      headerName: 'Actions',
      sortable: false,
      headerAlign: 'center',
      width: 250,
      renderCell: renderActionsCell,
    },
  ];

  return (
    <Box>
      <Box display="flex" alignItems="center">
        <Box display="flex" alignItems="center" justifyContent="flex-end" width="100%">
          <CustomButton buttonText="Add Ticket" onClick={() => handleActionClick('add')} />
        </Box>
      </Box>
      {isEmpty(tickets) ? (
        <NoContent textContent={`Hey, you currently don't have any ticket. <br /> Please add first.`} />
      ) : (
        <CustomTable
          columns={columns}
          rows={tickets}
          paginationMode="server"
          rowCount={rowCount}
          paginationModel={pagination}
          onPaginationModelChange={(obj) => setPagination({ ...pagination, ...obj })}
        />
      )}
    </Box>
  );
};

export default Ticket;
