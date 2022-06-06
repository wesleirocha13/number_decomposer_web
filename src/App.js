import { useState } from 'react';
import './App.css';
import Header from './components/Header';
import axios from 'axios';
import { API_URL } from './database'
import Swal from 'sweetalert2';

export default function App() {

  const [hasResult, setHasResult] = useState(false);
  const [number, setNumber] = useState('');
  const [resultDecompose, setResultDecompose] = useState({});

  const decompose = async ()=>{
    try{
      if(number === '') throw Error('Informe um valor válido.')
      const response = await axios.get(`${API_URL}/decompose/${number}`);
      setHasResult(true);
      setResultDecompose(response.data);
    }catch(err){
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: err?.response?.data?.message || err?.message || 'Erro ao realizar a decomposição, tente novamente!',        
      })
    }    
  }

  const formatResult = (result)=>{
    return result.toString().replace(/,/gi, ', ')
  }

  return (
    <div className='page'>
      <Header />
      <div className='container'>
        <div className="main-card">
          <h3 className="title">Informe o número a ser decomposto</h3>
          <div className="container-calc">
            <input 
              type="number" 
              name="input-number" 
              id="input-number" 
              placeholder="Insira o número" 
              min={0} value={number} 
              onChange={(evt)=> setNumber(evt.target.value)}
            />
            <input type="button" value="Calcular" onClick={()=> decompose()}/>
          </div><br />
          {hasResult && (
            <div>
              <h3 className="title">Resultado</h3>
              <p><b>Número informado:</b> {resultDecompose.number}</p>
              <p><b>Divisores:</b> {formatResult(resultDecompose.factors)}</p>
              <p><b>Divisores primos:</b> {formatResult(resultDecompose.primeFactors)}</p>
          </div>
          )}          
        </div>
      </div>
    </div>
  );
}
