import { useMutation, useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';

const UpdateProfile = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");


    const { data, isLoading, isError, error } = useQuery({
        queryKey: ["user", id],
        queryFn: () => {
            return axios.get(`http://127.0.0.1:3000/api/user/getuser/${id}`);
        },
        staleTime: 60 * 1000,
    });


    const { mutate: updateUserMutation } = useMutation({
        mutationFn: (updateData) => {
            return axios.patch(`http://127.0.0.1:3000/api/user/updateuser/${id}`, updateData, { withCredentials: true });
        },
        onSuccess: (data) => {
            console.log("updatedata", data);

            navigate(`/profile/${id}`);
        },
        onError: (error) => {
            console.log(error);
        }
    })

    const handleUpdateProfile = async (e) => {
        e.preventDefault();
        updateUserMutation({ name, email });

    }


    useEffect(() => {
        setName(data?.data?.name)
        setEmail(data?.data?.email)
    }, [data]);

    return (
        <div className='h-screen w-full bg-black/90 flex justify-center items-center'>


            <form
                onSubmit={handleUpdateProfile}
                className='flex  items-center gap-5'
            >


                <div>
                    <label htmlFor="name" className="sr-only">Name</label>

                    <div className="relative">
                        <input
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            type="text"
                            className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                            placeholder="Enter name"
                        />

                    </div>
                </div>
                <div>
                    <label htmlFor="email" className="sr-only">Email</label>

                    <div className="relative">
                        <input
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            type="email"
                            className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                            placeholder="Enter email"
                        />

                    </div>
                </div>

                <button
                    type="submit"
                    className="inline-block rounded-lg bg-blue-500 px-5 py-3 text-sm font-medium text-white"
                >
                    Update
                </button>

            </form>

        </div>
    )
}

export default UpdateProfile