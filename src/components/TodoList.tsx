import { useState } from 'react';
import useCustomQuery from '../hooks/useAuthenticatedQuery';
import Button from './ui/Button'
import Input from './ui/Input';
import Modal from './ui/Modal';

/* _________________ local Storage _________________ */
const getUserData = localStorage.getItem("loginUser")
const userData = getUserData ? JSON.parse(getUserData) : null;

const TodoList = () => {
    /* _________________ State _________________ */
    const [isOpenEditModal, setIsOpenEditModal] = useState(false);
    const { isPending, data } = useCustomQuery({
        queryKey: ['todos'], 
        url: "/users/me?populate=todos", 
        config: {
            headers: {
                Authorization: `Bearer ${userData.jwt}`
            }
        }
    })   
    
    /* _________________ Handler _________________ */
    const openEditModal = () => setIsOpenEditModal(true);
    const closeEditModal = () => setIsOpenEditModal(false);

    /* _________________ Render _________________ */
    if (isPending) return 'Loading...'

    return (
        <>
            <div className="space-y-4">
            {
                data.todos.length ? (
                    data.todos.map( (todo) => 
                        <div 
                            key={todo.id}
                            className="flex items-center justify-between hover:bg-gray-100 duration-300 p-3 rounded-md even:bg-gray-100"
                        >
                            <p className="w-full font-semibold"> {todo.title} </p>
                            <div className="flex items-center justify-end w-full space-x-3">
                                <Button
                                    variant={"default"}
                                    size={"sm"}
                                    onClick={openEditModal}
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
                <div className="flex items-center space-x-3 mt-4">
                    <Button
                        className="bg-indigo-700 hover:bg-indigo-800"
                    >
                    Update
                    </Button>
                    <Button variant={"cancel"} onClick={closeEditModal}>
                        Cancel
                    </Button>
                </div>
            </Modal>
        </>
    )
}

export default TodoList