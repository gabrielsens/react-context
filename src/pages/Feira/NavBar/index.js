import { Nav } from './styles';
import { ReactComponent as Logo } from 'assets/logo.svg';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';
import { useCarrinhoContext } from 'common/context/Carrinho';
import { useHistory } from 'react-router-dom';

export default function NavBar() {
  const { qntProdutos } = useCarrinhoContext();
  const history = useHistory();
  return (
    <Nav>
      <Logo />
      <IconButton
        disabled={qntProdutos === 0}
        onClick={() => history.push('/carrinho')}
      >
        <Badge
          badgeContent={qntProdutos}
          color="primary"
        >
          <ShoppingCartIcon />
        </Badge>
      </IconButton>
    </Nav>
  )
}
