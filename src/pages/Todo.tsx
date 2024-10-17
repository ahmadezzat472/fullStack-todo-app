import useCustomQuery from "../hooks/useAuthenticatedQuery";
import { ChangeEvent, useState } from "react";
import Paginator from "../components/ui/Paginator";
import TodoSkeleton from "../components/ui/TodoSkeleton";

/* _________________ local Storage _________________ */
const getUserData = localStorage.getItem("loginUser")
const userData = getUserData ? JSON.parse(getUserData) : null;

const TodosPage = () => {
    /* _________________ State _________________ */
    const [page, setPage] = useState<number>(1);
    const [pageSize, setPageSize] = useState<number>(10);
    const [sortBy, setSortBy] = useState<string>("DESC");
    const { isLoading, data, isFetching } = useCustomQuery({
        queryKey: [`todos-page-${page}`, `${pageSize}`, `${sortBy}`], //**todos */
        url: `/todos?pagination[pageSize]=${pageSize}&pagination[page]=${page}&sort=createdAt:${sortBy}`,
        config: {
            headers: {
                Authorization: `Bearer ${userData.jwt}`,
            },
        },
    });

    /* _________________ Handler _________________ */
    const onClickPrev = () => {
        setPage((prev) => prev - 1);
    };

    const onClickNext = () => {
        setPage((prev) => prev + 1);
    };

    const onChangePageSize = (e: ChangeEvent<HTMLSelectElement>) => {
        setPageSize(+e.target.value);
    };

    const onChangeSortBy = (e: ChangeEvent<HTMLSelectElement>) => {
        setSortBy(e.target.value);
    };    

    /* _________________ Render _________________ */
    if (isLoading) return <TodoSkeleton />

    return (
        <>
            <div className="flex items-center justify-between space-x-2">
                <div className="flex items-center justify-between space-x-2 text-md">
                    <select
                        className="border-2 border-indigo-600 rounded-md p-2"
                        value={sortBy}
                        onChange={onChangeSortBy}
                    >
                        <option disabled>Sort by</option>
                        <option value="ASC">Oldest</option>
                        <option value="DESC">Latest</option>
                    </select>
                    <select
                        className="border-2 border-indigo-600 rounded-md p-2"
                        value={pageSize}
                        onChange={onChangePageSize}
                    >
                        <option disabled>Page Size</option>
                        <option value={10}>10</option>
                        <option value={50}>50</option>
                        <option value={100}>100</option>
                    </select>
                </div>
            </div>
            <div className="my-20 space-y-6">
                {data.data.length ? (
                    data.data.map(
                        ({
                            id,
                            title,
                            description
                        }: {
                            id: number;
                            title: string;
                            description: string;
                        }, idx: number) => {
                        return (
                            <div
                                key={id}
                                className="flex items-center justify-between hover:bg-gray-100 duration-300 p-3 rounded-md even:bg-gray-100"
                            >
                                <h3 className="w-full font-semibold">
                                    {id}- {idx} - {title} - {description}
                                </h3>
                            </div>
                        );
                        }
                    )
                ) : (
                <h3>No Todos Yet</h3>
                )}
                
                { <Paginator
                    isLoading={isLoading || isFetching}
                    total={data.meta.pagination.total}
                    page={page}
                    pageCount={data.meta.pagination.pageCount}
                    onClickPrev={onClickPrev}
                    onClickNext={onClickNext}
                /> }
            </div>
        </>
    );
};

export default TodosPage;

/*
{data: Array(25), meta: {…}}
    data: Array(25)
        0: {id: 74, documentId: 'byh8ryinyo1qt857iytu9wx4', title: 'react', createdAt: '2024-10-17T16:09:55.989Z', updatedAt: '2024-10-17T16:11:02.394Z', …}
        .....
    meta: 
        pagination: {page: 1, pageSize: 25, pageCount: 3, total: 51}    
*/
