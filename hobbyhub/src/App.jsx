import './App.css';
import React from 'react';
import { useRoutes } from 'react-router-dom'
import ReadPosts from './pages/ReadPosts'
import CreatePost from './pages/CreatePost'
import EditPost from './pages/EditPost'
import { Link } from 'react-router-dom'
import PostDetails from './pages/PostDetails';


const App = () => {
  
  // Sets up routes
  let element = useRoutes([
    {
      path: "/",
      element:<ReadPosts />
    },
    {
      path:"/edit/:id",
      element: <EditPost  />
    },
    {
      path:"/new",
      element: <CreatePost />
    },
    {
      path: "/summary/:id",
      element: <PostDetails/>
    }
  ]);

  return ( 

    <div className="App">

      <div className="header">
        <h1>😱 Plot Twist Café</h1>
        <Link to="/"><button className="headerBtn"> View all posts 👀  </button></Link>
        <Link to="/new"><button className="headerBtn"> Submit post ✍️ </button></Link>
      </div>
        {element}
    </div>

  )
}

export default App
