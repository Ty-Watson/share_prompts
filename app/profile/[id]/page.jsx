"use client";

import {useState, useEffect} from 'react';
import { useSearchParams } from 'next/navigation'; 
import Profile from '@components/Profile';

const UserProfile = ({params}) => {
    const searchParams = useSearchParams();
    //get the username from the params id
    const userName = searchParams.get("name");

    
    
    const [posts, setPosts] = useState([]);

    const fetchPosts = async () => {
        const response = await fetch(`/api/users/${params.id}/posts`);
        //console.log(response);
        const data = await response.json();
        console.log(data);
        setPosts(data);
      }
    
      useEffect(() => {       
        if(params?.id) fetchPosts();        
      }, [params.id]);

   

  return (
    <Profile
        name={userName}  
        desc={`Welcome to ${userName}'s personalized profile page. Explore ${userName}'s exceptional prompts and be inspired by the power of their imagination`}      
        data={posts}       
    />
  )
}

export default UserProfile