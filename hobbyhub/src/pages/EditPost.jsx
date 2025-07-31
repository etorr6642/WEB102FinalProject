import {useState, useEffect} from 'react'
import { useParams } from 'react-router-dom'
import './EditPost.css'
import {supabase} from '../client'

const EditPost = ({data}) => {

    const {id} = useParams()
    const [post, setPost] = useState({id: null, anime_title: "", arc_season: "", topic: "", episode_num: "", details: "", image: ""})

    const handleChange = (event) => {
        const {name, value} = event.target
        setPost( (prev) => {
            return {
                ...prev,
                [name]:value,
            }
        })
    }

    useEffect(() => {
    const fetchPost = async () => {
      const { data, error } = await supabase
        .from('Posts')
        .select('*')
        .eq('id', id)
        .single()

      if (error) {
        console.error(error)
      } else {
        setPost(data)
      }
    }

    fetchPost()
  }, [id])

    const updatePost = async (event) => {
        event.preventDefault();

        if (!post.topic || !post.anime_title || !post.arc_season || !post.episode_num) {
            alert("Please fill out all fields before submitting.")
            return
        }

        await supabase
            .from('Posts')
            .update({ anime_title: post.anime_title, arc_season: post.arc_season, topic: post.topic, episode_num: post.episode_num, details: post.details, image: post.image})
            .eq('id', id);

        window.location = "/";
    }

   const deletePost = async (event) => {
        event.preventDefault();

        await supabase
            .from('Posts')
            .delete()
            .eq('id', id); 

        window.location = "/";
    }

    return (
        <div>
            <form>
                <label htmlFor="topic">Topic: </label> <br />
                <input type="text" id="topic" name="topic" value={post.topic} onChange={handleChange} /><br />
                <br/>

                <label htmlFor="image">Image: </label> <br />
                <input type="text" id="image" name="image" value = {post.image} onChange={handleChange} /><br />
                <br/>

                <label htmlFor="anime_title">Anime Name: </label><br />
                <input type="text" id="anime_title" name="anime_title" value={post.anime_title} onChange={handleChange} /><br />
                <br/>

                <label htmlFor="arc_season">Arc/Season: </label><br />
                <input type="text" id="arc_season" name="arc_season" value={post.arc_season} onChange={handleChange} /><br />
                <br/>

                <label htmlFor="episode_num">Episode: </label><br />
                <input type="text" id="episode_num" name="episode_num" value={post.episode_num} onChange={handleChange} /><br />
                <br/>

                <label htmlFor="details">Details</label><br />
                <textarea rows="5" cols="50" id="details" name="details" value={post.details} onChange={handleChange} >
                </textarea>
                <br/>
                <input type="submit" value="Submit" onClick ={updatePost}/>
                <button className="deleteButton" onClick={deletePost}>Delete</button>
            </form>
        </div>
    )
}

export default EditPost