import React, { useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as yup from 'yup';
import { FormHandles, SubmitHandler } from '@unform/core';

import { signInRequest } from '~/store/modules/auth/actions';
import { ApplicationState } from '~/store';

import Loading from '~/components/Loading';

import { Container, Logo, Form, Input, SubmitButton } from './styles';

interface FormData {
  email: string;
  password: string;
}

const SignIn: React.FC = () => {
  const dispatch = useDispatch();
  const formRef = useRef<FormHandles>(null);

  const [formError, setFormError] = useState(false);
  const loading = useSelector<ApplicationState>(state => state.auth.loading);

  const handleSubmit: SubmitHandler<FormData> = async data => {
    setFormError(false);
    formRef.current?.setErrors({});

    try {
      const schema: yup.Schema<FormData> = yup.object().shape({
        email: yup.string().required('O e-mail é obrigatório.'),
        password: yup.string().required('A senha é obrigatória.'),
      });

      dispatch(signInRequest(data.email, data.password));

      await schema.validate(data, { abortEarly: false });
    } catch (error) {
      const validationErrors: any = {};

      if (error instanceof yup.ValidationError) {
        error.inner.forEach(err => {
          validationErrors[err.path] = err.message;
        });

        setTimeout(() => {
          formRef.current?.setErrors(validationErrors);
          setFormError(true);
        }, 100);
      }
    }
  };

  return (
    <Container error={formError}>
      <Logo />

      <Form onSubmit={handleSubmit} ref={formRef}>
        <Input
          name="email"
          type="text"
          label="SEU E-MAIL"
          placeholder="Digite seu e-mail cadastrado..."
        />
        <Input
          name="password"
          type="password"
          label="SUA SENHA"
          placeholder="Digite sua senha..."
        />

        <SubmitButton type="submit">
          {loading ? <Loading color="#fff" /> : 'Entrar no sistema'}
        </SubmitButton>
      </Form>
    </Container>
  );
};

export default SignIn;
