import { Container } from './styles';
import { memo } from 'react';
import { IconButton } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import { useCarrinhoContext } from 'common/context/Carrinho';


function Produto({
  nome,
  foto,
  id,
  valor,
  unidade
}) {
  const { carrinho, handleAddQuantityProduct, handleRemoveQuantityProduct } = useCarrinhoContext();
  const product = {
    nome,
    foto,
    id,
    valor,
    unidade
  }
  const quantityProduct = carrinho.find(product => product.id === id)?.quantidade
  return (
      <Container>
        <div>
          <img
            src={`/assets/${foto}.png`}
            alt={`foto de ${nome}`}
          />
          <p>
            {nome} - R$ {valor?.toFixed(2)} <span>Kg</span>
          </p>
        </div>
        <div>
          <IconButton
            color="secondary"
            disabled={!quantityProduct}
            onClick={() => handleRemoveQuantityProduct(product.id)}
          >
            <RemoveIcon />
          </IconButton>
          <div>
            {quantityProduct || 0}
          </div>
          <IconButton
            color="primary"
            onClick={() => handleAddQuantityProduct({...product, quantityProduct})}
          >
            <AddIcon />
          </IconButton>
        </div>
      </Container>
  )
}

export default memo(Produto)
