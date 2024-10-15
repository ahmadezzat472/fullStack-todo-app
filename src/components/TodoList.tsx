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
import TodoSkeleton from './ui/TodoSkeleton';

/* _________________ local Storage _________________ */
const getUserData = localStorage.getItem("loginUser")
const userData = getUserData ? JSON.parse(getUserData) : null;

const TodoList = () => {
    /* _________________ State _________________ */
    const [isOpenAddModal, setIsOpenAddModal] = useState(false);
    const [isOpenEditModal, setIsOpenEditModal] = useState(false);
    const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false);
    const [isUpdating, setIsUpdating] = useState(false)
    const [todoEdit, setTodoEdit] = useState<ITodo>({
        id: 0,
        documentId: "",
        title: "",
        description: "",
    })
    const [todoAdd, setTodoAdd] = useState({
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
    const openAddModal = () => {
        setIsOpenAddModal(true);
    };

    const closeAddModal = () => {
        setTodoAdd({
            title: "",
            description: "",
        })
        setIsOpenAddModal(false);
    };

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

    const openDeleteModal = (todo: ITodo) => {
        setTodoEdit(todo)
        setIsOpenDeleteModal(true);
    };

    const closeDeleteModal = () => {
        setTodoEdit({
            id: 0,
            title: "",
            description: "",
            documentId: "",
        })
        setIsOpenDeleteModal(false);
    };

    const handleOnChange = (evt: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const {name, value} = evt.target;
        setTodoEdit({
            ... todoEdit,
            [name]: value
        })
    };

    const handleOnChangeAdd = (evt: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const {name, value} = evt.target;
        setTodoAdd({
            ... todoAdd,
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

    const handleSubmitAdd = async(evt: FormEvent<HTMLFormElement>) => {
        evt.preventDefault()
        setIsUpdating(true)
        console.log(todoAdd);
        

        try {
            const response = await axiosInstance.post(`todos?user=${userData.user.id}`, 
                {
                    data: {
                        title: todoAdd.title,
                        description: todoAdd.description
                    }
                },
                {
                    headers: {
                        Authorization: `Bearer ${userData.jwt}`,
                    }
                }
            )
            if(response.status === 201) {
                toast.success("Add successfully.",
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
            closeAddModal()
            setIsUpdating(false)
        }
    }

    const handleRemoveTodo = async () => {
        try {
            const response = await axiosInstance.delete(`todos/${todoEdit.documentId}`, {
                headers: {
                    Authorization: `Bearer ${userData.jwt}`,
                }
            })
            if(response.status === 204) {
                toast.success("Deleted successfully.",
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
            closeDeleteModal()
        }
    }

    /* _________________ Render _________________ */
    if (isPending) return <TodoSkeleton />

    return (
        <div className="space-y-1">
            <div className="flex w-fit mx-auto my-10 gap-x-2">
                <Button variant="default" onClick={openAddModal} size={"sm"}>
                    Post new todo
                </Button>
                {/* <Button variant="outline" onClick={} size={"sm"}>
                    Generate todos
                </Button> */}
            </div>
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
                                    onClick={() => openDeleteModal(todo)}
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

            {/* Modal Edit */}
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
                        <Button variant={"cancel"} onClick={closeEditModal} type='button'>
                            Cancel
                        </Button>
                    </div>
                </form>
                
            </Modal>

            {/* Delete Modal */}
            <Modal
                isOpen={isOpenDeleteModal}
                close={closeDeleteModal}
                title="Are you sure you want to remove this todo from your store ?"
                description="Deleting this todo will remove it permenantly from your inventory. Any associated data, sales history, and other related information will also be deleted. Please make sure this is the intended action."
            >
                <div className="flex items-center space-x-3 mt-4">
                    <Button 
                        variant="danger" 
                        onClick={handleRemoveTodo}
                    >
                        Yes , Remove
                    </Button>
                    <Button variant="cancel" type="button" onClick={closeDeleteModal}>
                        Cancel
                    </Button>
                </div>
            </Modal>

            {/* Add Modal */}
            <Modal close={closeAddModal} isOpen={isOpenAddModal} title='Add A New Todo' >

                <form className='space-y-4' onSubmit={handleSubmitAdd} >
                    <Input name='title' value={todoAdd.title} onChange={handleOnChangeAdd} />
                    <Textarea name='description' value={todoAdd.description} onChange={handleOnChangeAdd} />
                    <div className="flex items-center space-x-3 mt-4">
                        <Button
                            className="bg-indigo-700 hover:bg-indigo-800"
                            isLoading={isUpdating}
                        >
                            Done
                        </Button>
                        <Button variant={"cancel"} onClick={closeAddModal} type='button'>
                            Cancel
                        </Button>
                    </div>
                </form>
                
            </Modal>
        </div>

    )
}

export default TodoList;

