import { BrowserRouter, Routes, Route } from 'react-router-dom'

//Se importan las páginas creadas
import Home from './pages/Home'
import Customers from './pages/Customers'

import { CustomerProvider } from './context/CustomerContext'

function App() {
  return (
    <CustomerProvider>{/*Todo se engloba por el context utilizando el provider*/}
      <BrowserRouter>
        <Routes>
          {/*Se agregan las rutas de la aplicación*/}
          <Route path='/' element={<Home/>}/>
          <Route path='/customers' element={<Customers/>}/>
        </Routes>
      </BrowserRouter>
    </CustomerProvider>
  )
}

export default App
