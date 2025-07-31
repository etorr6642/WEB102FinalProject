import { useState } from 'react'
import './Card.css'
import more from './more.png'
import { Link } from 'react-router-dom'
import {supabase} from '../client'


const Card = (props) =>  {

  const [count, setCount] = useState(props.likeCount)

  const updateCount = async (event) => {
    event.preventDefault();

    await supabase
      .from('Posts')
      .update({ likeCount: count + 1})
      .eq('id', props.id)

    setCount((count) => count + 1);
  }

  return (
      <div className="Card">
          <Link to={'edit/'+ props.id}><img className="moreButton" alt="edit button" src={more} /></Link>
          <h2 className="topic">{"Topic: " + props.topic}</h2>
          <p className ="creation_time">Posted at: {new Date(props.created_at).toLocaleString()}</p>
          <button className="likeButton" onClick={updateCount} >👍 Like Count: {count}</button>
      </div>
  );
};

export default Card