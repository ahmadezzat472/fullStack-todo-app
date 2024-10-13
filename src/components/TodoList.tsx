import { ChangeEvent, FormEvent, useState } from 'react';
import useCustomQuery from '../hooks/useAuthenticatedQuery';
import Button from './ui/Button'
import Input from './ui/Input';
import Modal from './ui/Modal';
import { IErrorResponse, ITodo } from '../interfaces';
import Textarea from './ui/Teaxtarea';
import axiosInstance from '../config/axios.config';
import toast from 'react-hot-toast';
import { AxiosError } from 'axios';

/* _________________ local Storage _________________ */
const getUserData = localStorage.getItem("loginUser")
const userData = getUserData ? JSON.parse(getUserData) : null;

const TodoList = () => {
    /* _________________ State _________________ */
    const [isOpenEditModal, setIsOpenEditModal] = useState(false);
    const [isUpdating, setIsUpdating] = useState(false)
    const [todoEdit, setTodoEdit] = useState<ITodo>({
        id: 0,
        documentId: "",
        title: "",
        description: "",
    })
    const { isPending, data } = useCustomQuery({
        /* ${todoEdit.id} => when update on item occure => the id of item will change => 
         thus, queryKey Changes => then useCustomQuery is execute and this we need to get new updated data */
        queryKey: ['TodoList', `${todoEdit.id}`], 
        url: "/users/me?populate=todos", 
        config: {
            headers: {
                Authorization: `Bearer ${userData.jwt}`
            }
        }
    })   
    
    /* _________________ Handler _________________ */
    const openEditModal = (todo: ITodo) => {
        setTodoEdit(todo)
        setIsOpenEditModal(true);
    };

    const closeEditModal = () => {
        setTodoEdit({
            id: 0,
            title: "",
            description: "",
            documentId: "",
        })
        setIsOpenEditModal(false);
    };

    const handleOnChange = (evt: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const {name, value} = evt.target;
        setTodoEdit({
            ... todoEdit,
            [name]: value
        })
    };

    const handleSubmit = async(evt: FormEvent<HTMLFormElement>) => {
        evt.preventDefault()
        setIsUpdating(true)

        try {
            const response = await axiosInstance.put(`todos/${todoEdit.documentId}`, 
                {
                    data: {
                        title: todoEdit.title,
                        description: todoEdit.description
                    }
                },
                {
                    headers: {
                        Authorization: `Bearer ${userData.jwt}`,
                    }
                }
            )
            if(response.status === 200) {
                toast.success("updated successfully.",
                    {
                        position: "bottom-center",
                        duration: 4000,
                        style: {
                            backgroundColor: "black",
                            color: "white",
                            width: "fit-content",
                        },
                    }
                );
            }
        } catch(error) {
            console.log(error);
            // ** should declare the type of error (typescript)
            const errorObj = error as AxiosError<IErrorResponse>
            toast.error(`${errorObj.message}`,
                {
                    position: "bottom-center",
                    duration: 4000,
                    style: {
                        backgroundColor: "black",
                        color: "white",
                        width: "fit-content",
                    },
                }
            );
        } finally {
            closeEditModal()
            setIsUpdating(false)
        }
    }

    /* _________________ Render _________________ */
    if (isPending) return 'Loading...'

    return (
        <>
            <div className="space-y-4">
            {
                data.todos.length ? (
                    data.todos.map( (todo: ITodo) => 
                        <div 
                            key={todo.id}
                            className="flex items-center justify-between hover:bg-gray-100 duration-300 p-3 rounded-md even:bg-gray-100"
                        >
                            <p className="w-full font-semibold"> {todo.title} </p>
                            <div className="flex items-center justify-end w-full space-x-3">
                                <Button
                                    variant={"default"}
                                    size={"sm"}
                                    onClick={() => openEditModal(todo)}
                                >
                                    Edit
                                </Button>
                                <Button
                                    variant={"danger"}
                                    size={"sm"}
                                >
                                    Remove
                                </Button>
                            </div>
                        </div>
                    )
                ) : (
                    <h3>No Todos Yet</h3>
                )
            }
            </div>
            <Modal close={closeEditModal} isOpen={isOpenEditModal} title='Edit Todo' >
                <form className='space-y-4' onSubmit={handleSubmit} >
                    <Input name='title' value={todoEdit.title} onChange={handleOnChange} />
                    <Textarea name='description' value={todoEdit.description} onChange={handleOnChange} />
                    <div className="flex items-center space-x-3 mt-4">
                        <Button
                            className="bg-indigo-700 hover:bg-indigo-800"
                            isLoading={isUpdating}
                        >
                            Update
                        </Button>
                        <Button variant={"cancel"} onClick={closeEditModal}>
                            Cancel
                        </Button>
                    </div>
                </form>
                
            </Modal>
        </>
    )
}

export default TodoList;

