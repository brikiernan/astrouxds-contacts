import { useState } from 'react';
import { RuxButton, RuxModal } from '@astrouxds/react';
import { Heading, Stack, Text } from '@chakra-ui/react';

import type { Alert } from '../models';

type AlertModalProps = {
  alerts: Alert[];
  contactName: number;
  contactSatellite: string;
};

export const AlertModal: React.FC<AlertModalProps> = ({
  alerts,
  contactName,
  contactSatellite,
}) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <RuxButton size='small' onClick={() => setOpen(true)}>
        Details
      </RuxButton>
      <RuxModal open={open} modalTitle={`Alerts for contact ${contactName}`}>
        <Stack spacing='4' whiteSpace='normal'>
          <Heading size='md' mb='2'>
            Satellite: {contactSatellite}
          </Heading>
          {alerts.map(({ errorId, errorMessage }, i) => (
            <Stack key={errorId + i} spacing='1' bgColor='blackAlpha.500' p='2'>
              <Text>Message: {errorMessage} askdlh alskhd las dhl</Text>
            </Stack>
          ))}
        </Stack>
      </RuxModal>
    </>
  );
};
