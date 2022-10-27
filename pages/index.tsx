import { useRouter } from 'next/router';
import { useState } from 'react'
import axios from 'axios'

export default function Home() {
  
  const valorInicial = {
    username : ''
  }

  const [valor,setValor] = useState(valorInicial)
  
  function handleChange(e){
    const {name,value} = e.target;
    setValor({...valor,[name]:value});
  }

  const router = useRouter()

  function handleSubmit(e){
    e.preventDefault();
    axios
    .get(`https://api.github.com/users/`+ valor.username)

    .then((resp)=>{
      console.log('Deu certo')
      const login = resp.data.name
      console.log(login)
    })
    .catch(()=>{
      console.log('Deu erro.')
    })

  }
  
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input 
            type="text" 
            placeholder='username' 
            name='username'
            id='username'
            onChange={handleChange}
          />
          <input type="submit" value="Enviar" />
      </form>

      <input id='result' />

    </div>

    
  )
}
