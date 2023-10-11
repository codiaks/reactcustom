import { apiSlice } from "../index";

const todoSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getTodos: builder.query({
      query: (todo) => ({
        url: "todos",
        method: "GET",
      }),
      transformResponse: (response) => {
        console.log(response, "ssss");
        let copy = response.filter((r) => r.id <= 10);
        return copy.sort((a, b) => b.id - a.id);
      },
      providesTags: ["Todos"], // defining a tag for this call
    }),
    addTodo: builder.mutation({
      query: (todo) => ({
        url: "/todos",
        method: "POST",
        body: todo,
      }),
      invalidatesTags: ["Todos"], // invalidate this tag for this mutation so that data can automatically re-fetched
    }),
    updateTodo: builder.mutation({
      query: (todo) => ({
        url: `todos/${todo.id}`,
        method: "PUT",
        body: todo,
      }),
      invalidatesTags: ["Todos"], // invalidate this tag for this mutation so that data can automatically re-fetched
    }),
    deleteTodo: builder.mutation({
      query: (id) => ({
        url: `/todos/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Todos"], 
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetTodosQuery,
  useAddTodoMutation,
  useDeleteTodoMutation,
  useUpdateTodoMutation,
} = todoSlice;
