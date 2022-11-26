import { useMemo, lazy, useRef } from 'react';
import {
  RuxTable,
  RuxTableBody,
  RuxTableHeader,
  RuxTableHeaderRow,
  RuxTableHeaderCell,
} from '@astrouxds/react';

import type { Contact } from './models';
import datas from './data.json';
import useLazyLoad from './hooks/use-lazy-load';

const ContactRow = lazy(() => import('./components/contact-row'));

const sort = (a: Contact, b: Contact) => b.alerts.length - a.alerts.length;

const perPage = 36;

const App: React.FC = () => {
  const contacts = useMemo(() => datas.sort(sort), []);
  const triggerRef = useRef(null);

  const setData = (currentPosition: number) => {
    return contacts.slice(currentPosition, currentPosition + perPage);
  };

  const { data, hasMore } = useLazyLoad({
    triggerRef,
    setData,
    perPage,
    total: contacts.length,
  });

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
        {data.map((contact: any, i: number) => {
          return <ContactRow key={contact._id} {...contact} />;
        })}
        {hasMore && <div ref={triggerRef} />}
      </RuxTableBody>
    </RuxTable>
  );
};

export default App;
