import { createContext, useContext, useState } from "react";

const PagamentoContext = createContext();
PagamentoContext.displayName = "Pagamento"

export function PagamentoProvider({ children }) {
  const tiposPagamento = [
    {
      nome: "Boleto",
      juros: 1,
      id: 1,
    },
    {
      nome: "Cartão de Credito",
      juros: 1.3,
      id: 2,
    },
    {
      nome: "PIX",
      juros: 1,
      id: 3,
    },
    {
      nome: "Crediário",
      juros: 1.5,
      id: 4,
    },
  ]

  const [ formaPagamento, setFormaPagamento ] = useState(tiposPagamento[0]);
  return (
    <PagamentoContext.Provider value={{
      formaPagamento, setFormaPagamento, tiposPagamento
    }}>
      { children }
    </PagamentoContext.Provider>
  )
}

export function usePagamento() {
  const { formaPagamento, setFormaPagamento, tiposPagamento } = useContext(PagamentoContext);

  function handleFormaPagamento(id) {
    const pagamentoAtual = tiposPagamento.find((pagamento) => pagamento.id === id);
    setFormaPagamento(pagamentoAtual);
  }
  return { formaPagamento, handleFormaPagamento, tiposPagamento }
}
