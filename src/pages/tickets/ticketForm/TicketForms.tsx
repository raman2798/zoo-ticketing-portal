import { FC, ReactElement, useEffect, useState } from 'react';
import { Box, Grid, Typography } from '@mui/material';
import { cloneDeep, every, isEmpty, isEqual, mapValues, startCase } from 'lodash';
import { useLocation } from 'react-router-dom';
import { CustomButton, CustomInputField, PageHeader } from '@/components';
import { IFields } from '@/components/CustomInputField/interfaces';
import { ITicket, createTicket, readByIdTicket } from '../TicketActions';
import { TypeText } from '@/enums';

interface GuestField {
  required: boolean;
  label: string;
  placeholder: string;
  type: 'number';
  value: string;
  error?: boolean;
  disabled?: boolean;
}

type GuestFields = Record<string, GuestField>;

interface TicketFormData {
  totalGuests: number;
  totalCharges: number;
  ticketId: string;
  info: IFields;
  guestFields: GuestFields;
}

const TicketForm: FC = (): ReactElement => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);

  const type = searchParams.get('type') as string;
  const id = searchParams.get('id');

  const isView = isEqual(type, TypeText.VIEW);

  const [ticketData, setTicketData] = useState<TicketFormData>({
    totalGuests: 0,
    totalCharges: 0,
    ticketId: '',
    info: {
      totalGuest: {
        required: true,
        label: 'Total Guests',
        placeholder: 'Total Guests',
        type: 'number',
        value: '',
      },
    },
    guestFields: {},
  });

  const [disabled, setDisabled] = useState<boolean>(!isView);

  const handleChange = (fields: GuestFields | IFields, type: string, key: string, value: string, isError: boolean): void => {
    const updatedFields = cloneDeep(fields);

    updatedFields[key] = { ...updatedFields[key], value, error: isError };

    setTicketData((prevData) => ({ ...prevData, [type]: updatedFields }));
  };

  const updateGuestFields = () => {
    const newGuestFields: GuestFields = {};

    for (let i = 0; i < ticketData.totalGuests; i += 1) {
      const guestKey = `guest${i + 1}`;

      newGuestFields[guestKey] = {
        required: true,
        label: `Guest ${i + 1} Age`,
        placeholder: `Guest ${i + 1} Age`,
        type: 'number',
        value: '',
      };
    }

    setTicketData((prevData) => ({ ...prevData, guestFields: newGuestFields }));
  };

  useEffect(() => {
    if (!isView) {
      setTicketData((prevData) => ({ ...prevData, totalGuests: Number(prevData.info.totalGuest.value) }));

      updateGuestFields();
    }
  }, [ticketData.info, ticketData.totalGuests]);

  useEffect(() => {
    if (!isView && !isEmpty(ticketData.guestFields)) {
      const isGuestFieldsValid = !every(ticketData.guestFields, (field) => !isEqual(field.value, '') && !field.error);

      setDisabled(isGuestFieldsValid);
    }
  }, [ticketData.guestFields]);

  const fetchData = async (): Promise<void> => {
    const [ticket] = await Promise.all([id ? readByIdTicket(id) : Promise.resolve({ data: {} })]);

    if (ticket && ticket.data) {
      const newTicketData = ticket.data as ITicket;

      const newTotalGuests = newTicketData.totalGuests;

      const newInfo = mapValues(ticketData.info, (field) => ({
        ...field,
        value: !isEqual(type, TypeText.ADD) ? String(newTotalGuests) : '',
        disabled: isView,
      }));

      const newGuestFields: GuestFields = {};

      for (let i = 0; i < newTotalGuests; i += 1) {
        const guestKey = `guest${i + 1}`;

        newGuestFields[guestKey] = {
          required: true,
          label: `Guest ${i + 1} Age`,
          placeholder: `Guest ${i + 1} Age`,
          type: 'number',
          value: !isEqual(type, TypeText.ADD) ? String(newTicketData.guests[guestKey]) : '',
          disabled: isView,
        };
      }

      setTicketData({
        totalGuests: newTotalGuests,
        totalCharges: newTicketData.totalCharges,
        ticketId: newTicketData.ticketId,
        info: newInfo,
        guestFields: newGuestFields,
      });
    }
  };

  useEffect(() => {
    fetchData();
  }, [type, id]);

  const getChargeByAge = (age: number): number => {
    switch (true) {
      case age <= 2:
        return 0;
      case age < 18:
        return 100;
      case age < 60:
        return 500;
      default:
        return 300;
    }
  };

  const calculateEntranceTicketCharges = async () => {
    let totalCharges = 0;

    for (let i = 0; i < ticketData.totalGuests; i += 1) {
      const guestAge = Number(ticketData.guestFields[`guest${i + 1}`]?.value);

      totalCharges += getChargeByAge(guestAge);
    }

    setTicketData((prevData) => ({ ...prevData, totalCharges }));

    const convertedGuestFields = mapValues(ticketData.guestFields, (item) => Number(item.value));

    const data = {
      guests: convertedGuestFields,
      totalGuests: ticketData.totalGuests,
      totalCharges,
    };

    const result = await createTicket(data);

    if (result) {
      setTicketData((prevData) => ({ ...prevData, ticketId: result.ticketId }));
    }
  };

  return (
    <Box>
      <PageHeader title={`${startCase(type)} Ticket`} />

      <Grid container spacing={2}>
        <CustomInputField fields={ticketData.info} onChange={(key, value, isError) => handleChange(ticketData.info, 'info', key, value, isError)} />
      </Grid>

      {ticketData.totalGuests ? (
        <Box sx={{ mt: (theme) => theme.spacing(4) }}>
          <Typography variant="h6" sx={{ fontWeight: 600 }}>
            Guest {isEqual(ticketData.totalGuests, 1) ? 'Age' : 'Ages'}
          </Typography>
          <Grid container spacing={2}>
            <CustomInputField fields={ticketData.guestFields} onChange={(key, value, isError) => handleChange(ticketData.guestFields, 'guestFields', key, value, isError)} />
          </Grid>
        </Box>
      ) : null}

      {!isView && (
        <Box display="flex" alignItems="center" sx={{ pt: 2, pb: 4 }}>
          <Box display="flex" alignItems="center" justifyContent="flex-end" width="100%">
            <CustomButton buttonText="Generate ticket" disabled={disabled} onClick={calculateEntranceTicketCharges} />
          </Box>
        </Box>
      )}

      {ticketData.ticketId && (
        <Box sx={{ mt: (theme) => theme.spacing(7) }}>
          <Typography variant="h4" sx={{ fontWeight: 600 }}>
            Ticket Details
          </Typography>
          <Box sx={{ mt: (theme) => theme.spacing(4) }}>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Typography variant="body1">Ticket Number: {ticketData.ticketId}</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="body1">Number of Guests: {ticketData.totalGuests}</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="body1">Total Charges: {ticketData.totalCharges}</Typography>
              </Grid>
            </Grid>
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default TicketForm;
