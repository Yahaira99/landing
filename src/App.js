import React, { Fragment } from 'react';
import Header from "./Componentes/Header";
import Formulario from "./Componentes/Formulario";

function App() {
  return (
    document.body.style.backgroundColor = "#282c34",
    <div >
      <Fragment>
        <Header titulo='¡Bienvenido a obvio Latam!' />
        <br></br>
        <Formulario />
        <br></br>
      </Fragment>
    </div>

  );
}

export default App;
