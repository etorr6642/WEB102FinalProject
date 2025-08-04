import { useState, useEffect } from 'react'
import Card from '../components/Card'
import {supabase} from '../client'

const ReadPosts = (props) => {

    const [posts, setPosts] = useState([])
    const [sortOrder, setSortOrder]=useState("asc")
    const [sortField, setSortField]=useState("created_at")
    const [searchQuery, setSearchQuery]= useState("")

    useEffect(() => {
        const fetchPosts = async () => {
            const {data} = await supabase
                .from('Posts')
                .select()
                .order(sortField, { ascending: sortOrder==='asc' });

            // set state of posts
            setPosts(data)
        }
        fetchPosts();
    }, [sortField, sortOrder])

    // handles sort based on created_at or likes
    const handleSort = (field) => {
        if (sortField === field) {
            // Toggle order if already sorting by this field
            setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"));
        } else {
            // Switch to new field and default to descending
            setSortField(field);
            setSortOrder("desc");
        }
    };

    //filters post by search bar
    const fildertedPost = posts.filter((post)=>
        post.topic?.toLowerCase().includes(searchQuery.toLowerCase())
    );

    
    
    return (
        <>
        {/* sort buttons */}
        <div className='sortButtons'>
            <button onClick={() => handleSort("created_at")}>
                Sort by Time ({sortOrder === "asc" && sortField === "created_at" ? "Oldest" : "Newest"})
            </button>

            <button onClick={() => handleSort("likeCount")}>
                Sort by Likes ({sortOrder === "asc" && sortField === "likeCount" ? "Least" : "Most"})
            </button>
        </div>

        {/* search bar */}
        <div className ="searchBar">
            <input type="text" placeholder="Search by topic.." value ={searchQuery} onChange={(e)=>setSearchQuery(e.target.value)}/>
        </div>
        
        {/* make card for each post based on searchQuery */}
        <div className="ReadPosts">
            
            {
                fildertedPost && fildertedPost.length > 0 ?
                [...fildertedPost]
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
                ) : <h2>{'No Discussions Found 😞'}</h2>
            }
        </div>  

        </>
    )
}

export default ReadPosts