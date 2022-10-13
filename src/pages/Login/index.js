import React from "react";
import { toast } from 'react-toastify';
import { isEmail } from 'validator';
import { useDispatch } from 'react-redux';
import { get } from 'lodash';

import { Container } from '../../styles/GlobalStyles';
import { Form } from './styled';
import * as actions from '../../store/modules/auth/actions';

export default function Login(props){
  const dispatch = useDispatch();

  const prevPath = get(props, 'location.state.prevPath', '/');

  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  const handleSubmit = e => {
    e.preventDefault();
    let formErrors = false;

    if(!isEmail(email)){
      formErrors = true;
      toast.error('Email invalido.');
    }

    if(password.length < 6 || password.length > 50){
      formErrors = true;
      toast.error('Senha invalida.');
    }

    if(formErrors) console.log(formErrors);

    dispatch(actions.loginRequest({ email, password, prevPath}));

  };

  return(
    <Container>
      <h1>Login</h1>

      <Form onSubmit={handleSubmit}>
        <input
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          placeholder="Seu e-mail"
        />
        <input
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          placeholder="Sua senha"
        />
        <button type="submit">Login</button>
      </Form>
    </Container>
  );
}
