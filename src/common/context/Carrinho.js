import { usePagamento } from "./Pagamento";
import { UsuarioContext } from "./Usuario";

const { createContext, useState, useContext, useEffect } = require("react");

const CarrinhoContext = createContext();
CarrinhoContext.displayName = "Carrinho";

export const CarrinhoProvider = ({ children }) => {
  const [carrinho, setCarrinho] = useState([]);
  const [qntProdutos, setQntProdutos] = useState(0);
  const [valorTotal, setValorTotal] = useState(0);

  return (
    <CarrinhoContext.Provider value={{ carrinho, setCarrinho, qntProdutos, setQntProdutos, valorTotal, setValorTotal }}>
      {children}
    </CarrinhoContext.Provider>
  )
}


export const useCarrinhoContext = () => {
  const {
    carrinho, setCarrinho, qntProdutos, setQntProdutos, valorTotal, setValorTotal
  } = useContext(CarrinhoContext);
  const { formaPagamento }= usePagamento();
  const { setSaldo } = useContext(UsuarioContext);

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

  function handleEfetuarCompra() {
    setCarrinho([]);
    setSaldo(prevState => prevState - valorTotal);

  }

  useEffect(() => {
    const { quantidade, valor } = carrinho.reduce(
      (previusValue, currentValue) => {
        return {
        quantidade: previusValue.quantidade + currentValue.quantidade,
        valor: previusValue.valor + (currentValue.valor * currentValue.quantidade),
      }}, {
        quantidade: 0,
        valor: 0
      });

      setQntProdutos(quantidade);
      setValorTotal(valor * formaPagamento.juros);

  }, [carrinho, setQntProdutos, setValorTotal, formaPagamento])

  return {
    carrinho, setCarrinho, handleAddQuantityProduct, handleRemoveQuantityProduct,
    qntProdutos, valorTotal, handleEfetuarCompra
  }

}
