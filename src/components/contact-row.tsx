import { RuxCheckbox, RuxTableCell, RuxTableRow } from '@astrouxds/react';
import { Center, HStack, Text } from '@chakra-ui/react';
import type { Contact } from '../models';
import { AlertModal } from './alert-modal';

const ContactRow = (c: Contact) => (
  <RuxTableRow>
    <RuxTableCell>
      <Center>
        <RuxCheckbox />
      </Center>
    </RuxTableCell>
    <RuxTableCell>{c.contactName}</RuxTableCell>
    <RuxTableCell>{c.contactSatellite}</RuxTableCell>
    <RuxTableCell>{c.contactStatus}</RuxTableCell>
    <RuxTableCell>{c.contactState}</RuxTableCell>
    <RuxTableCell>{c.contactStep}</RuxTableCell>
    <RuxTableCell>{c.contactElevation}</RuxTableCell>
    <RuxTableCell>
      <HStack justifyContent='space-between'>
        <Text>{c.alerts.length}</Text>
        <AlertModal
          alerts={c.alerts}
          contactName={c.contactName}
          contactSatellite={c.contactSatellite}
        />
      </HStack>
    </RuxTableCell>
  </RuxTableRow>
);

export default ContactRow;
