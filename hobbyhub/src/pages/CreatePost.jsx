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

        if (!post.topic || !post.anime_title || !post.arc_season || !post.episode_num) {
            alert("Please fill out all fields before submitting.")
            return
        }

        await supabase
            .from('Posts')
            .insert({anime_title: post.anime_title, arc_season: post.arc_season,  topic: post.topic, episode_num: post.episode_num, details: post.details})
            .select();

        window.location = "/";
    }

    return (
        <div>
            <form>
                <label htmlFor="topic">Topic: </label> <br />
                <input type="text" id="topic" name="topic" onChange={handleChange} /><br />
                <br/>

                <label htmlFor="Image">Image: </label> <br />
                <input type="text" id="Image" name="Image" onChange={handleChange} /><br />
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
                <input type="submit" value="Submit" onClick={createPost} />
            </form>
        </div>
    )
}

export default CreatePost