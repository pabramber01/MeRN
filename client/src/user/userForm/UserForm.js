import { Suspense, lazy } from 'react';
import { Tabs } from '../../layout';
import {
  UserFormGeneralPlaceholder,
  UserFormSecurity,
  UserFormWrapper,
} from '.';

function UserForm() {
  const UserFormGeneral = lazy(() => import('./UserFormGeneral'));

  return (
    <UserFormWrapper>
      <Tabs>
        <Suspense label="General" fallback={<UserFormGeneralPlaceholder />}>
          <UserFormGeneral />
        </Suspense>
        <UserFormSecurity label="Security" />
      </Tabs>
    </UserFormWrapper>
  );
}

export default UserForm;
