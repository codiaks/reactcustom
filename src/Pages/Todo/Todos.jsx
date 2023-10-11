import {
  useGetTodosQuery
} from "../../store/query/apiSlice";

export const Todos = () => {
  const { data: todos, isError, isLoading, error } = useGetTodosQuery();

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>{JSON.stringify(error)}</p>;
  if(todos?.length === 0) return <button>No Data</button>
  return (
    <>
      {todos?.map((todo) => (
        <p key={todo.id}>{todo.title}</p>
      ))}
    </>
  );
};
