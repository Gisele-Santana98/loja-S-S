import './App.css' // Importando arquivo CSS para o componente App
import Login from './pages/Login' // Importando componente Login
import Products from './pages/Products' // Importando componente Products
import DetailsProducts from './pages/DetailsProducts'  // Importando componente para detalhes doe produtos
import Checkout from './pages/Checkout'  // Importando componente Checkout
import Carrinho from './pages/Carrinho'
import { Route, Routes} from 'react-router-dom' // Importando componentes de roteamento do react-router-dom

function App() {
 

  return (
    <>
    
      <Routes>  {/* Definindo rotas da aplicação */}
      <Route path='/'  element = {<Login/>} />  {/* Rota página de login */}
      <Route path='/products' element ={<Products/>} /> {/* Rota página de produtos */}
      <Route path="/product/:id" element={<DetailsProducts/>} /> {/* Rota página de detalhes de produto específico */}
      <Route path='/checkout' element={<Checkout/>} /> {/* Rota página de checkout */}
      <Route path='/cart' element={<Carrinho/>} /> {/* Rota página de carrinho */}
    </Routes>
  
    </>
  )
}

export default App; // Exportando componente App como padrão
