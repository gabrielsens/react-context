const { createContext, useState, useContext, useEffect } = require("react");

const CarrinhoContext = createContext();
CarrinhoContext.displayName = "Carrinho";

export const CarrinhoProvider = ({ children }) => {
  const [carrinho, setCarrinho] = useState([]);
  const [qntProdutos, setQntProdutos] = useState(0);

  return (
    <CarrinhoContext.Provider value={{ carrinho, setCarrinho, qntProdutos, setQntProdutos }}>
      {children}
    </CarrinhoContext.Provider>
  )
}


export const useCarrinhoContext = () => {
  const { carrinho, setCarrinho, qntProdutos, setQntProdutos  } = useContext(CarrinhoContext);


  function handleAddQuantityProduct(pProduct) {
    const haveProduct = carrinho.some(product => product.id === pProduct.id);

    if(!haveProduct) {
      return setCarrinho(prevState => [...prevState, {...pProduct, quantidade: 1}]);
    }

    setCarrinho(prevState => prevState.map((product) => {
      if(product.id === pProduct.id) (product.quantidade += 1);
      return product;
    }));
  }

  function handleRemoveQuantityProduct(id) {

    setCarrinho(prevState => prevState.map((product) => {
      if(product.id === id && product.quantidade > 0) {
        product.quantidade --;
      }
      return product;
    }).filter(product => product.quantidade > 0));

  }

  useEffect(() => {
    setQntProdutos(carrinho.reduce(
      (previusValue, currentValue) => {
        return previusValue + currentValue.quantidade
      }, 0))
  }, [carrinho, setQntProdutos])

  return {
    carrinho, setCarrinho, handleAddQuantityProduct, handleRemoveQuantityProduct, qntProdutos
  }

}
