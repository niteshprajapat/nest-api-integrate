import { useMutation, useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

const Profile = () => {
    const { id } = useParams();
    const navigate = useNavigate();


    const { data, isLoading, isError, error } = useQuery({
        queryKey: ["user", id],
        queryFn: () => {
            return axios.get(`http://127.0.0.1:3000/api/user/getuser/${id}`);
        },
        staleTime: 60 * 1000,
    });


    const { mutate: deleteUserMutation } = useMutation({
        mutationFn: () => {
            return axios.delete(`http://127.0.0.1:3000/api/user/deleteuser/${id}`, { withCredentials: true })
        },
        onSuccess: (data) => {
            console.log("dadadadad", data);
        },
        onError: (error) => {
            console.log(error);
        }
    });


    const handleDelete = async (e) => {
        e.preventDefault();
        deleteUserMutation();

    }

    if (isLoading) {
        return <h1>....loading</h1>
    }

    if (isError) {
        return <h1>{error?.message}</h1>
    }









    return (
        <div className='my-10'>
            {
                <div className='flex justify-around items-center'>
                    <div>
                        <h1>ID: {data?.data?._id}</h1>
                        <h1>user: {data?.data?.name}</h1>
                        <h1>Email: {data?.data?.email}</h1>
                    </div>
                    <div className='flex flex-col gap-3'>
                        <button onClick={() => navigate(`/update/${id}`)} className='bg-blue-500 p-2 rounded-md text-white'>Update Profile</button>
                        <button onClick={handleDelete} className='bg-red-500 p-2 rounded-md text-white'>Delete Account</button>
                    </div>
                </div>
            }




        </div>
    )
}

export default Profile