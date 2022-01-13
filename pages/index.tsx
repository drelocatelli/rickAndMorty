import { useState, useEffect } from "react";
import { useQuery } from "react-query";
import Centered from "../Components/Centered";
import Header from "../Components/Header";

export default function Home() {

  const [page, setPage] = useState(1);

  const fetchProjects = (page = 1) => fetch(`https://rickandmortyapi.com/api/character?page=${page}`)
    .then((res) => res.json());

  const { isLoading, isError, error, data, isFetching, isPreviousData } = useQuery(['characters', page], () => fetchProjects(page), { keepPreviousData: false });


  useEffect(() => {
    console.log(data)
  }, [])


  if (isLoading || isFetching) return (<>
    <Header />
    <Centered>
      Carregando...
    </Centered>
  </>)

  if (error) return (<>
    <Header />
    <Centered>
      Ocorreu um erro, tente novamente mais tarde.
    </Centered>
  </>)



  return (
    <>
      <Header />
      <Centered className='columnied'>
        {data.results.map((item) => {
          return (
            <div key={item.id} style={{ marginBottom: '30px' }}>
              <img style={{ borderRadius: '50px', float: 'left' }} src={item.image} width={50} height={50} />
              <div style={{ position: 'relative', top: '10px', left: '10px' }}>
                {item.name}
                <br />
                <b style={{ fontSize: '12px' }}>{item.species}</b>
              </div>
              <div style={{ clear: 'both' }}></div>
            </div>

          )
        })}
      </Centered>
      <Centered>
        <hr />
        Page {page} &nbsp;&nbsp;
        <button type="button" onClick={() => setPage(old => Math.max(old - 1, 0))} disabled={page === 1}>Anterior</button>
        &nbsp;
        <button type="button" onClick={() => { if (!isPreviousData) { setPage(old => old + 1) } }} disabled={page === data.info.pages}>
          Próximo
        </button>
      </Centered>
    </>
  )
}
