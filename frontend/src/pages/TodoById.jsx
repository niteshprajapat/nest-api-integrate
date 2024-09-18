import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React, { useContext } from 'react'
import { useParams } from 'react-router-dom'
import AuthContext from '../context/AuthContext';

const TodoById = () => {
    const { id } = useParams();
    const { token } = useContext(AuthContext);


    const { data, isLoading, isError, error } = useQuery({
        queryKey: ["todo", id],
        queryFn: () => {
            return axios.get(`http://127.0.0.1:3000/api/todo/gettodo/${id}`, {
                headers: {
                    'Content-Type': "application/json",
                    Authorization: "Bearer " + token
                },
                withCredentials: true,
            });
        },
        staleTime: 5 * 1000
    })

    if (isLoading) {
        return <h1>....loading</h1>;
    }

    if (isError) {
        return <h1>{error?.message}</h1>;
    }

    console.log("data", data);

    return (
        <div>
            <h1>{data?.data?.title}</h1>
            <span>{data?.data?.description}</span>
        </div>
    )
}

export default TodoById