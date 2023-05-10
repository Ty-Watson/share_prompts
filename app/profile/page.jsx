"use client";

import {useState, useEffect} from 'react'
import {useSession} from 'next-auth/react'
import { useRouter } from 'next/router'; 

import Profile from '@components/profile'

const MyProfile = () => {

    const {data: session} = useSession();

    const [posts, setPosts] = useState([]);

    const fetchPosts = async () => {
        const response = await fetch(`/api/users/${session?.user.id}/posts`);
        //console.log(response);
        const data = await response.json();
        console.log(data);
        setPosts(data);
      }
    
      useEffect(() => {       
        if(session?.user.id) fetchPosts();
        console.log(posts);
      }, []);

    const handleEdit = () => {

    }

    const handleDelete = () => {

    }

  return (
    <Profile
        name="My"
        desc="Welcome to your personalized profile page"
        data={posts}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
    />
  )
}

export default MyProfile