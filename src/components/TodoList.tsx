import axiosInstance from '../config/axios.config'
import useCustomQuery from '../hooks/useAuthenticatedQuery';
import Button from './ui/Button'
import { useQuery } from '@tanstack/react-query'

/* _________________ local Storage _________________ */
const getUserData = localStorage.getItem("loginUser")
const userData = getUserData ? JSON.parse(getUserData) : null;

const TodoList = () => {
    const { isPending, data } = useCustomQuery({
        queryKey: ['todos'], 
        url: "/users/me?populate=todos", 
        config: {
            headers: {
                Authorization: `Bearer ${userData.jwt}`
            }
        }
    })   
    
    if (isPending) return 'Loading...'

    return (
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
    )
}

export default TodoList