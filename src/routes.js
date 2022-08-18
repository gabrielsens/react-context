import { CarrinhoProvider } from "common/context/Carrinho";
import { UsuarioProvider } from "common/context/Usuario";
import Carrinho from "pages/Carrinho";
import Feira from "pages/Feira";
import Login from "pages/Login";
import { BrowserRouter, Route, Switch } from "react-router-dom";

export default function Routes() {


  return (
    <BrowserRouter>
      <Switch>
        <UsuarioProvider>
          <Route exact path="/" >
              <Login />
          </Route>
          <CarrinhoProvider>
            <Route path="/feira">
              <Feira />
            </Route>
            <Route path="/carrinho">
              <Carrinho />
            </Route>
          </CarrinhoProvider>
        </UsuarioProvider>
      </Switch>
    </BrowserRouter>
  )
}