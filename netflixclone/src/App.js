import React, {useEffect, useState} from 'react';
import tmdb from './tmdb';
import './App.css';
import Linha_filme from './components/Linha_filme';
import Filme_destaque from './components/Filme_destaque'; 

export default () => {

  const [movieList, setMovieList] = useState([]);
  const [FilmeData, setFilmeDestaque] = useState(null);

  //quando a tela for carregada ele vai executar a função que eu digitar aqui 
  useEffect(()=>{
    const loadAll = async () => {
      //pegando a lista total
      let list = await tmdb.getHomeList();
      setMovieList(list);

      //pegando o featured
      let originals = list.filter(i=>i.slug === 'originals');
      let randomChosen = Math.floor(Math.random() * (originals[0].itens.results.length - 1));
      let chosen = originals[0].itens.results[randomChosen];
      let chosenInfo = await tmdb.getMovieInfo(chosen.id, 'tv');
      setFilmeDestaque(chosenInfo);

    }

    loadAll();
  }, []);

  return (
    <div className='page'>

      {FilmeData && 
        <Filme_destaque item={FilmeData} />
      }

      <section className='lists'>
        {movieList.map((item, key)=>(
          <Linha_filme key={key} title={item.title} itens={item.itens} />
        ))}
      </section>
    </div>
  );
}

