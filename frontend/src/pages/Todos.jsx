import { useMutation, useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import AuthContext from '../context/AuthContext';

const Todos = () => {
    const { token } = useContext(AuthContext);

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");


    // Ensure query runs only if token exists
    const { data, isLoading, isError, error, refetch } = useQuery({
        queryKey: ["todos"],
        queryFn: () => {
            return axios.get('http://127.0.0.1:3000/api/todo/getalltodos', {
                headers: {
                    Authorization: 'Bearer ' + token,
                    "Content-Type": "application/json",
                },
                withCredentials: true
            });
        },
        staleTime: 60 * 1000,
        cacheTime: 5 * 60 * 1000,

    });



    const { mutate: addTodoMutation } = useMutation({
        mutationFn: (todoData) => {
            return axios.post(`http://127.0.0.1:3000/api/todo/createtodo`, todoData, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: "Bearer " + token,
                },
                withCredentials: true,
            });
        },
        onSuccess: (data) => {
            console.log("add todo", data);
            setTitle("")
            setDescription("")
            refetch()
        },
        onError: (error) => {
            console.log(error);
        }
    });


    // Mutation for deleting todos
    const { mutate: deleteTodoMutation } = useMutation({
        mutationFn: (todoId) => {
            return axios.delete(`http://127.0.0.1:3000/api/todo/deletetodo/${todoId}`, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: "Bearer " + token,
                },
                withCredentials: true,
            });
        },
        onSuccess: (data) => {
            console.log("Todo deleted", data);
            refetch();
        },
        onError: (error) => {
            console.log(error);
        }
    });

    // Deletion handler
    const handleDeleteTodo = (todoId) => {
        deleteTodoMutation(todoId);
    };

    const handleAddTodo = async (e) => {
        e.preventDefault();
        addTodoMutation({ title, description });
    };

    // Conditional rendering based on loading, error, or success
    if (isLoading) {
        return <h1>....loading</h1>;
    }

    if (isError) {
        return <h1>{error?.message}</h1>;
    }

    return (
        <div className='bg-black/90 h-full w-full flex flex-col '>
            {/* <button onClick={refetch}>Fetch Todos</button> */}


            <div className='py-5 mx-auto'>
                <form

                    className='flex  items-center gap-5'
                >
                    <div>
                        <input
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            type="text"
                            placeholder='Title'
                            className='p-2 rounded-sm font-semibold'
                        />
                    </div>
                    <div>

                        <input
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            type="text"
                            placeholder='description'
                            className='p-2 rounded-sm font-semibold'
                        />
                    </div>

                    <button onClick={handleAddTodo} className='p-2 m-2 text-white bg-black rounded-md w-fit text-center'>Add Todo</button>
                </form>
            </div>

            {data?.data && data?.data?.map((todo) => (
                <div key={todo._id}>
                    <div className='bg-black/80 text-white p-2 m-5 rounded-md flex justify-between items-center px-10'>
                        <Link to={`/todos/${todo?._id}`}>
                            <h1>title: {todo?.title}</h1>
                            <span>description: {todo?.description}</span>
                        </Link>
                        <div className='flex items-center gap-6'>
                            <button onClick={() => handleDeleteTodo(todo?._id)}>❌</button>
                            <button>🖊</button>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Todos;














// import { useMutation, useQuery } from '@tanstack/react-query'
// import axios from 'axios'
// import React, { useContext } from 'react'
// import { Link } from 'react-router-dom';
// import AuthContext from '../context/AuthContext';

// const Todos = () => {
//     const { token } = useContext(AuthContext);


//     const { data, isLoading, isError, error } = useQuery({
//         queryKey: ["todos"],
//         queryFn: () => {

//             return axios.get('http://127.0.0.1:3000/api/todo/getalltodos', {
//                 headers: {
//                     Authorization: 'Bearer ' + token,
//                     "Content-Type": "application/json",
//                 }, withCredentials: true
//             });
//         },
//         staleTime: 60 * 1000,
//         enabled: !!token,
//     });


//     if (isLoading) {
//         return <h1>....loading</h1>
//     }

//     if (isError) {
//         return <h1>{error?.message}</h1>
//     }


//     const { mutate: deleteTodoMutation } = useMutation({
//         mutationFn: (todoId) => {
//             return axios.delete(`http://127.0.0.1:3000/api/todo/deletetodo/${todoId}`, {
//                 headers: {
//                     "Content-Type": "application/json",
//                     Authorization: "Bearer " + token,
//                 },
//                 withCredentials: true,
//             })
//         },

//         onSuccess: (data) => {
//             console.log("tododeleda", data);
//         },
//         onError: (error) => {
//             console.log(error);
//         }
//     })


//     const handleDeleteTodo = async (todoId) => {

//         deleteTodoMutation(todoId);

//     }


//     return (
//         <div>
//             {
//                 data?.data && data?.data?.map((todo) => (
//                     <div >
//                         <div className='bg-gray-500 p-2 m-5 rounded-md flex justify-around items-center'>
//                             <Link to={`/todos/${todo?._id}`}>
//                                 <h1>title:  {todo?.title}</h1>
//                                 <span>description:  {todo?.description}</span>
//                             </Link>
//                             <div className='flex items-center gap-6'>
//                                 <button onClick={() => handleDeleteTodo(todo?._id)} >❌</button>
//                                 <button  >🖊</button>
//                             </div>
//                         </div>

//                     </div>
//                 ))
//             }
//         </div>
//     )
// }

// export default Todos