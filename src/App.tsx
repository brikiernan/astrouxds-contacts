import { useMemo } from 'react';
import { Center, HStack, Text } from '@chakra-ui/react';
import {
  RuxCheckbox,
  RuxTable,
  RuxTableBody,
  RuxTableCell,
  RuxTableHeader,
  RuxTableHeaderRow,
  RuxTableHeaderCell,
  RuxTableRow,
} from '@astrouxds/react';

import type { Contact } from './models';
import data from './data.json';
import { AlertModal } from './components/alert-modal';

const sort = (a: Contact, b: Contact) => b.alerts.length - a.alerts.length;

const App: React.FC = () => {
  const contacts = useMemo(() => data.sort(sort), []);

  return (
    <RuxTable>
      <RuxTableHeader>
        <RuxTableHeaderRow>
          <RuxTableHeaderCell />
          <RuxTableHeaderCell>Name</RuxTableHeaderCell>
          <RuxTableHeaderCell>Satellite</RuxTableHeaderCell>
          <RuxTableHeaderCell>Status</RuxTableHeaderCell>
          <RuxTableHeaderCell>State</RuxTableHeaderCell>
          <RuxTableHeaderCell>Step</RuxTableHeaderCell>
          <RuxTableHeaderCell>Elevation</RuxTableHeaderCell>
          <RuxTableHeaderCell>Alerts</RuxTableHeaderCell>
        </RuxTableHeaderRow>
      </RuxTableHeader>
      <RuxTableBody>
        {contacts.map(({ _id, ...c }) => (
          <RuxTableRow key={_id}>
            <Center>
              <RuxCheckbox />
            </Center>
            <RuxTableCell>{c.contactName}</RuxTableCell>
            <RuxTableCell>{c.contactSatellite}</RuxTableCell>
            <RuxTableCell>{c.contactStatus}</RuxTableCell>
            <RuxTableCell>{c.contactState}</RuxTableCell>
            <RuxTableCell>{c.contactStep}</RuxTableCell>
            <RuxTableCell>{c.contactElevation}</RuxTableCell>
            <RuxTableCell>
              <HStack spacing='4'>
                <Text>{c.alerts.length}</Text>
                <AlertModal
                  alerts={c.alerts}
                  contactName={c.contactName}
                  contactSatellite={c.contactSatellite}
                />
              </HStack>
            </RuxTableCell>
          </RuxTableRow>
        ))}
      </RuxTableBody>
    </RuxTable>
  );
};

export default App;
