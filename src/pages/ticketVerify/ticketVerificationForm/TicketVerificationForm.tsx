import { FC, ReactElement, useEffect, useState } from 'react';
import { Box, Grid, Typography } from '@mui/material';
import { isEqual, every, startCase, map } from 'lodash';
import { useLocation } from 'react-router-dom';
import { CustomButton, CustomInputField, NoContent, PageHeader } from '@/components';
import { IFields } from '@/components/CustomInputField/interfaces';
import { ITicket, readByIdTicket, readTicketByTicketId } from '@/pages/tickets/TicketActions';
import { TypeText } from '@/enums';

interface GuestFields {
  [key: string]: number;
}

interface TicketDetails {
  ticketId: string;
  totalGuests: number;
  guests: GuestFields;
}

const TicketVerificationForm: FC = (): ReactElement => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);

  const type = searchParams.get('type') as TypeText;
  const id = searchParams.get('id');

  const isViewMode = isEqual(type, TypeText.VIEW);

  const [disabled, setDisabled] = useState(!isViewMode);

  const [ticketDetails, setTicketDetails] = useState<TicketDetails>({
    ticketId: '',
    totalGuests: 0,
    guests: {},
  });

  const [formFields, setFormFields] = useState<IFields>({
    ticketId: {
      required: true,
      label: 'Ticket Id',
      placeholder: 'Ticket Id',
      type: 'text',
      value: '',
    },
  });

  const handleInputChange = (key: string, value: string, isError: boolean): void => {
    setFormFields((prevFields) => ({
      ...prevFields,
      [key]: { ...prevFields[key], value, error: isError },
    }));
  };

  useEffect(() => {
    if (!isViewMode) {
      setDisabled(!every(formFields, (field) => !isEqual(field.value, '') && !field.error));
    }
  }, [formFields, isViewMode]);

  const fetchData = async (): Promise<void> => {
    const [ticketData] = await Promise.all([id ? readByIdTicket(id) : Promise.resolve({ data: {} })]);

    if (ticketData?.data) {
      const newTicketData = ticketData.data as ITicket;

      setTicketDetails({
        ticketId: newTicketData.ticketId,
        totalGuests: newTicketData.totalGuests,
        guests: newTicketData.guests,
      });
    }
  };

  useEffect(() => {
    fetchData();
  }, [type, id]);

  const handleVerify = async () => {
    const ticketId = formFields.ticketId.value;

    const result = await readTicketByTicketId(ticketId);

    if (result?.data) {
      const ticketData = result.data;

      setTicketDetails({
        ticketId: ticketData.ticketId,
        totalGuests: ticketData.totalGuests,
        guests: ticketData.guests,
      });
    } else {
      setTicketDetails({
        ticketId: '',
        totalGuests: 0,
        guests: {},
      });
    }
  };

  return (
    <Box>
      <PageHeader title={`${startCase(type)} Ticket`} />

      {!isViewMode && (
        <Grid container spacing={2}>
          <CustomInputField fields={formFields} onChange={handleInputChange} />
        </Grid>
      )}

      {!isViewMode && (
        <Box display="flex" alignItems="center" sx={{ pt: 2, pb: 4 }}>
          <Box display="flex" alignItems="center" justifyContent="flex-end" width="100%">
            <CustomButton buttonText="Verify Ticket" disabled={disabled} onClick={handleVerify} />
          </Box>
        </Box>
      )}

      {ticketDetails.ticketId ? (
        <Box sx={{ mt: (theme) => theme.spacing(7) }}>
          <Typography variant="h4" sx={{ fontWeight: 600 }}>
            Ticket Details
          </Typography>
          <Box sx={{ mt: (theme) => theme.spacing(4) }}>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Typography variant="body1">Ticket Number: {ticketDetails.ticketId}</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="body1">Number of Guests: {ticketDetails.totalGuests}</Typography>
              </Grid>
              {ticketDetails.totalGuests ? (
                <Box sx={{ mt: (theme) => theme.spacing(4), ml: (theme) => theme.spacing(2) }}>
                  {map(ticketDetails.guests, (guestItem, key) => (
                    <Grid container spacing={2} sx={{ mt: (theme) => theme.spacing(1), ml: (theme) => theme.spacing(1) }} key={key}>
                      <Typography variant="body1">
                        Guest {String(key.match(/\d+/g)?.[0])} (age: {String(guestItem)})
                      </Typography>
                    </Grid>
                  ))}
                </Box>
              ) : null}
            </Grid>
          </Box>
        </Box>
      ) : (
        <NoContent textContent="No ticketfound" />
      )}
    </Box>
  );
};

export default TicketVerificationForm;
