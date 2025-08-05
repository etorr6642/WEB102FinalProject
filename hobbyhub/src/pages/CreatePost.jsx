import { useState } from 'react'
import './CreatePost.css'
import {supabase} from '../client'

const CreatePost = () => {

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
    

    const createPost = async (event) => {
        event.preventDefault();

        if (!post.topic) {
            alert("Please fill out Topic field before submitting.")
            return
        }

        await supabase
            .from('Posts')
            .insert({anime_title: post.anime_title, arc_season: post.arc_season,  topic: post.topic, episode_num: Number(post.episode_num), details: post.details, image:post.image})
            .select();

        window.location = "/";

        if(error){
            console.error("Supabase insert error: ", error);
            alert ("There was an error");
            return;
        }
    }

    return (
        <div>
            <form>
                <label htmlFor="topic">Topic: </label> <br />
                <input type="text" id="topic" name="topic" onChange={handleChange} /><br />
                <br/>

                <label htmlFor="image">Image: </label> <br />
                <input type="text" id="image" name="image" onChange={handleChange} /><br />
                <br/>

                <label htmlFor="anime_title">Anime Name: </label><br />
                <input type="text" id="anime_title" name="anime_title" onChange={handleChange} /><br />
                <br/>

                <label htmlFor="arc_season">Arc/Season: </label><br />
                <input type="text" id="arc_season" name="arc_season" onChange={handleChange} /><br />
                <br/>

                <label htmlFor="episode_num">Episode: </label><br />
                <input type="number" id="episode_num" name="episode_num" onChange={handleChange} /><br />
                <br/>

                <label htmlFor="details">Details</label><br />
                <textarea rows="5" cols="50" id="details" name="details" onChange={handleChange} >
                </textarea>
                <br/>
                <button type="submit" onClick={createPost}>Submit</button>
            </form>
        </div>
    )
}

export default CreatePost