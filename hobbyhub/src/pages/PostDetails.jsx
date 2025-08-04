import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { supabase } from '../client';
import './PostDetails.css'

const PostDetails = () => {
    const { id } = useParams();
    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(true);
    const [comments,setComments]=useState([])
    const [newComment,setNewComment]=useState("")

    //fetch data from posts
    useEffect(() => {
        const fetchPost = async () => {
        setLoading(true);
        const { data, error } = await supabase
            .from('Posts')
            .select()
            .eq('id', id)
            .single();

        if (error) {
            console.error(error);
        } else {
            setPost(data);
        }
        setLoading(false);
        };

        if (id) fetchPost();
    }, [id]);

    //show if page is loading
    if (loading) return <p>Loading...</p>;

    //show if post was not found
    if (!post) return <p>No Post found.</p>;

    // // Fetch comments
    // useEffect(() => {
    //     const fetchComments = async () => {
    //     const { data, error } = await supabase
    //         .from('Comments')
    //         .select()
    //         .eq('post_id', id)
    //         .order('created_at', { ascending: false });

    //     if (error) console.error(error);
    //     else setComments(data);
    //     };

    //     if (id) fetchComments();
    // }, [id]);

    //add comment to database
    const handleAddComment = async (e) =>{
        e.preventDefault();
        if(!newComment.trim()) return;

        const {data, error}=await supabase
        .from ("Comments")
        .insert([{comment:newComment,post_id: id}])

        if (error){
            console.error(error)
        }else{
            setComments([data[0],...comments]);
            setNewComment("");
        }
    }
  

  
  return (
    <div >
      <div className="imageContainer">
       
          <img
            src={post.image}
            alt={post.anime_title + ' icon'}
            className="animeImage"
          />
        
      </div>

      <div className='postDetails'>
        <h3 className="topic">Topic: </h3> 
        <p>{post.topic}</p>
      </div>

      <div className='postDetails'>
        <h3>Anime: </h3> 
        <p>{post.anime_title}</p>
      </div>

      <div className='postDetails'>
        <h3>Arc/Season: </h3> 
        <p>{post.arc_season}</p>
      </div>

      <div className='postDetails'>
        <h3>Episode: </h3> 
        <p>{post.episode_num}</p>
      </div>

      <div className='postDetails'>
        <h3>Details: </h3> 
        <p>{post.details}</p>
      </div>
      
      
      <Link to={`/edit/${post.id}`}>
        <button>Edit Post</button>
      </Link>
      <Link to="/">
        <button>Back to Posts</button>
      </Link>

      {/* Comment section */}
      <div className="comments-section">
        <h3>Comments</h3>

        {/* submit comment */}
        <form onSubmit={handleAddComment}>
          <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            rows="3"
            placeholder="Write a comment..."
            style={{ width: '100%', padding: '0.5rem' }}
          ></textarea>
          <button type="submit">Post Comment</button>
        </form>

        {/* list comments */}
        <ul>
          {comments.length > 0 ? (
            comments.map(comment => (
              <li key={comment.id} style={{ marginTop: '1rem', borderBottom: '1px solid #ddd' }}>
                <p>{comment.content}</p>
                <small>{new Date(comment.created_at).toLocaleString()}</small>
              </li>
            ))
          ) : (
            <p>No comments yet.</p>
          )}
        </ul>
      </div>

    </div>
  );
};

export default PostDetails;