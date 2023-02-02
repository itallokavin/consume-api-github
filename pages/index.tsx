import { useRouter } from 'next/router';
import { useState } from 'react'
import axios from 'axios'
import style from './home.module.css'

export default function Home() {
  
  const valorInicial = {
    username : ''
  }

  const [valor,setValor] = useState(valorInicial)
  
  let [nome, setNome] = useState('')
  let [company, setCompany] = useState('')
  let [avatar, setAvatar] = useState('')

  function handleChange(e:any){
    const {name,value} = e.target;
    setValor({...valor,[name]:value});
  }

  const router = useRouter()

  function handleSubmit(e:any){
    e.preventDefault();
    axios
    .get(`https://api.github.com/users/`+ valor.username)

    .then((resp)=>{
      setNome(resp.data.name)
      setCompany(resp.data.bio)
      setAvatar(resp.data.avatar_url)
    })
    .catch(()=>{
      console.log('Deu erro.')
    })

  }
  
  return (
    <>
      <div className={style.campReq}>
        <div className={style.title}>
          <h2>Informe um usuário do github: </h2>
        </div>
        <div className={style.input}>
            <form onSubmit={handleSubmit}>
              <input 
                type="text" 
                placeholder='username' 
                name='username'
                id='username'
                onChange={handleChange}
              />
              <input type="submit" value="Buscar" className={style.send} />
            </form>
          </div>
      </div>

      <div className={style.campRes}>
        <div className={style.card}>
          <div className={style.cardHeader}>
            <div className={style.headerImg}>
              <img src={avatar}/>
            </div>
            <div className={style.headerTitle}>
              <h3>{nome}</h3>
              <p>{company}</p>
            </div>
          </div>
        </div>
      </div>
  </>
  )
}
