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
        <div>

            <div>
                <Link to={'/todos'}>TODOS</Link>
            </div>


            {
                <div >
                    <Link to={`/profile/${user?._id}`}>
                        <h1>ID: {user._id}</h1>
                        <h1>user: {user.name}</h1>
                        <h1>Email: {user.email}</h1>
                    </Link>
                </div>
            }
        </div>
    )
}

export default Home