import {BrowserRouter, Route, Routes} from "react-router-dom"
import CrudOperations from "./components/crudOperation/CrudOperations"

function App() {


  return (
    <>

    <BrowserRouter>
    
    <Routes>

    <Route path="/" element={<CrudOperations/>} />



    </Routes>
    
    
    
    </BrowserRouter>


    </>
  )
}

export default App
