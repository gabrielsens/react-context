import { Button } from '@material-ui/core';
import {
  Container,
  Titulo,
  InputContainer
} from './styles';
import {
  Input,
  InputLabel,
  InputAdornment
} from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import { useContext } from 'react';
import { UsuarioContext } from 'common/context/Usuario';

function Login() {
  const { nome, setNome, saldo, setSaldo } = useContext(UsuarioContext);
  const history = useHistory();
  return (
    <Container>
      <Titulo>
        Insira o seu nome
      </Titulo>
      <InputContainer>
        <InputLabel>
          Nome
        </InputLabel>
        <Input
          type="text"
          value={nome}
          onChange={(event) => setNome(event.target.value)}
        />
      </InputContainer>
      <InputContainer>
        <InputLabel>
          Saldo
        </InputLabel>
        <Input
        value={saldo}
        onChange={(event) => setSaldo(parseFloat(event.target.value))}
        type="number"
        startAdornment={
          <InputAdornment position="start">
            R$
          </InputAdornment>
        }
      />
      </InputContainer>
      <Button
        variant="contained"
        color="primary"
        disabled={nome.length < 5}
        onClick={() => {history.push('/feira')}}
      >
        Avançar
      </Button>
    </Container>
  )
};

export default Login;
