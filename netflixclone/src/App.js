import React, {useEffect, useState} from 'react';
import tmdb from './tmdb';
import './App.css';
import Linha_filme from './components/Linha_filme';
import Filme_destaque from './components/Filme_destaque'; 
import Header from './components/Header';

export default () => {

  const [movieList, setMovieList] = useState([]);
  const [FilmeData, setFilmeDestaque] = useState(null);
  const [blackHeader, setBlackHeader] = useState(false);

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

  useEffect(()=>{
    const scrollListener = () => {
      if(window.scrollY > 20)
      {
        setBlackHeader(true);
      }
      else
      {
        setBlackHeader(false);
      }
    }

    window.addEventListener('scroll', scrollListener);
    
    return () => {
      window.removeEventListener('scroll', scrollListener)
    }
  }, []);

  return (
    <div className='page'>

      <Header black = {blackHeader} />

      {FilmeData && 
        <Filme_destaque item={FilmeData} />
      }

      <section className='lists'>
        {movieList.map((item, key)=>(
          <Linha_filme key={key} title={item.title} itens={item.itens} />
        ))}
      </section>

      <footer>
        Feito com <span role="img" aria-label="coração">❤️</span> pela B7Web<br/>
        Direitos de imagem para Netflix<br/>
        Dados pegos no site Themoviedb.org
      </footer>

    </div>
  );
}

