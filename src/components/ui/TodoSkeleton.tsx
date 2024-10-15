
const TodoSkeleton = () => {
    return (
        <div
            role="status"
            className="max-w-md p-4 mx-auto space-y-4 divide-y divide-gray-200 rounded  animate-pulse dark:divide-gray-700 md:p-6 dark:border-gray-700"
        >
        {
            Array(5).fill(null).map((_, index) => (
                <div key={index} className="flex items-center justify-between pt-4">
                    <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24 mb-2.5"></div>
                    <div className="flex items-center justify-between space-x-2">
                        <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 w-12"></div>
                        <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 w-12"></div>
                    </div>
                </div>
            ))
        }
        <span className="sr-only">Loading...</span>
        </div>
    );
};

export default TodoSkeleton;
