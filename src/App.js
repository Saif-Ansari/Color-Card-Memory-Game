import './App.css';
import {useEffect,useState} from 'react'
import {shuffle} from './util'
function App() {

  const [data,setData] = useState([])
  const [score,setScore] = useState(0);
  const [highScore,setHighScore] = useState(0);
  const [selectedIDs,setSelectedIDs] = useState([])
  useEffect(()=>{

    async function fetchData() {
      const response = await fetch('https://jsonplaceholder.typicode.com/photos');
      const json= await response.json();
      setData(json.slice(0,12))
    }
    fetchData()
  },[])
  console.log({data})

  const onImageClick = (id) => {
    if(selectedIDs.includes(id)){
      setScore(0);
      setSelectedIDs([])
      if(score >= highScore){
        setHighScore(score)
      }
    }else{
      setSelectedIDs((prevIDs)=>[...prevIDs,id])
      setData(shuffle(data))
      setScore(prevScore => prevScore + 1)
     
    }
    console.log({id})
  }
  return (
    <div className="App">
      <h1>Color Cards Memory Game</h1>
      <div className="score-cards-wrap">
        <div className="card your-score">Your Score<span className=""> : {score}</span></div>
        <div className="card max-score">Max Score<span className=""> : {data.length}</span></div>
        <div className="card high-score">High Score<span className=""> : {highScore}</span></div>

      </div>
      <div className='images-wrapper'>
        {data.length ? data.map(data=>(<img className='image' onClick={()=>onImageClick(data.id)} src={data.url} width={200} height={200}/>)) : <span> loading...</span>}
      </div>
      
    </div>
  );
}

export default App;
