import { useState, useEffect } from 'react'
import Card from '../components/Card'
import {supabase} from '../client'

const ReadPosts = (props) => {

    const [posts, setPosts] = useState([])

    useEffect(() => {
        const fetchPosts = async () => {
            const {data} = await supabase
                .from('Posts')
                .select()
                .order('created_at', { ascending: true });

            // set state of posts
            setPosts(data)
        }
        fetchPosts();
    }, [props])

    
    
    return (
        <div className="ReadPosts">
            {
                posts && posts.length > 0 ?
                [...posts]
                .sort((a, b) => a.id - b.id)
                .map((post,index) => 
                    <Card 
                        key={post.id}
                        id={post.id}
                        created_at={post.created_at} 
                        anime_title={post.anime_title}
                        arc_season={post.arc_season}
                        episode_num={post.episode_num}
                        likeCount={post.likeCount}
                        topic ={post.topic}
                        details={post.detials}
                        image ={post.image}
                    />
                ) : <h2>{'No Discussions Yet 😞'}</h2>
            }
        </div>  
    )
}

export default ReadPosts