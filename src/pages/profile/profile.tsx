import { ProfileUI } from '@ui-pages';
import { FC, SyntheticEvent, useEffect, useState } from 'react';
import { useSelector } from '../../services/store';
import { getUser } from '../../services/slices/userSlice';
import { useDispatch } from '../../services/store';
import { updateUser } from '../../services/slices/userSlice';

export const Profile: FC = () => {
  const user = useSelector(getUser);
  const dispatch = useDispatch();

  const [formValue, setFormValue] = useState({
    name: user?.name || '',
    email: user?.email || '',
    password: ''
  });

  useEffect(() => {
    if (user) {
      setFormValue({
        name: user.name,
        email: user.email,
        password: ''
      });
    }
  }, [user]);

  const isFormChanged =
    formValue.name !== user?.name ||
    formValue.email !== user?.email ||
    !!formValue.password;

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    const updatedUser: { name?: string; email?: string; password?: string } =
      {};
    if (formValue.name !== user?.name) updatedUser.name = formValue.name;
    if (formValue.email !== user?.email) updatedUser.email = formValue.email;
    if (formValue.password) updatedUser.password = formValue.password;

    try {
      await dispatch(updateUser(updatedUser)).unwrap();
      alert('Данные обновлены');
    } catch (err) {
      alert('Ошибка обновления');
    }
  };

  const handleCancel = (e: SyntheticEvent) => {
    e.preventDefault();
    setFormValue({
      name: user?.name || '',
      email: user?.email || '',
      password: ''
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormValue((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <ProfileUI
      formValue={formValue}
      isFormChanged={isFormChanged}
      handleCancel={handleCancel}
      handleSubmit={handleSubmit}
      handleInputChange={handleInputChange}
    />
  );
};
