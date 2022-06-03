import React, {useEffect, useState} from 'react';
import tmdb from './tmdb';
import './App.css';
import Linha_filme from './components/Linha_filme';


export default () => {

  const [movieList, setMovieList] = useState([]);

  //quando a tela for carregada ele vai executar a função que eu digitar aqui 
  useEffect(()=>{
    const loadAll = async () => {
      //pegando a lista total
      let list = await tmdb.getHomeList();
      setMovieList(list);
    }

    loadAll();
  }, []);

  return (
    <div className='page'>
      <section className='lists'>
        {movieList.map((item, key)=>(
          <Linha_filme key={key} title={item.title} itens={item.itens} />
        ))}
      </section>
    </div>
  );
}

