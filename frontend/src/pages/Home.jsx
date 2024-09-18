import { useQuery } from '@tanstack/react-query'
import React, { useContext } from 'react'
import AuthContext from '../context/AuthContext';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Home = () => {
    const { user } = useContext(AuthContext);
    console.log("user", user)


    // const { data, isLoading, isError, error } = useQuery({
    //     queryKey: ["user", user._id],
    //     queryFn: () => {
    //         return axios.get(`http://127.0.0.1:3000/api/user/getuser/${user?._id}`);
    //     },
    //     staleTime: 60 * 1000,
    // });

    // if (isLoading) {
    //     return <h1>....loading</h1>
    // }

    // if (isError) {
    //     return <h1>{error?.message}</h1>
    // }

    return (
        <div className='flex flex-col justify-center items-center h-screen w-full'>

            <div className='p-2 m-2 text-white bg-black rounded-md w-fit'>
                <Link to={'/todos'} className='text-center'>See all Todos</Link>
            </div>


            {
                <div className='my-10'>
                    <Link to={`/profile/${user?._id}`}>
                        <h1 className='text-[20px] font-bold'>ID: {user._id}</h1>
                        <h1 className='text-[20px] font-bold'>user: {user.name}</h1>
                        <h1 className='text-[20px] font-bold'>Email: {user.email}</h1>
                    </Link>
                </div>
            }
        </div>
    )
}

export default Home