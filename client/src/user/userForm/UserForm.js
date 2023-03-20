import { Tabs } from '../../layout';
import { UserFormGeneral, UserFormSecurity, UserFormWrapper } from '.';

function UserForm() {
  return (
    <UserFormWrapper>
      <Tabs>
        <UserFormGeneral label="General" />
        <UserFormSecurity label="Security" />
      </Tabs>
    </UserFormWrapper>
  );
}

export default UserForm;
