import { fetchComments } from "./api";
import { useQuery } from "@tanstack/react-query";

import "./PostDetail.css";

export function PostDetail({ post, deleteMutation, updateTitleMutation }) {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["comments", post.id],
    queryFn: () => fetchComments(post.id),
  });

  if (isLoading) {
    return <h3>Loading comments...</h3>;
  }

  if (isError) {
    return (
      <>
        <h3>Error fetching comments</h3>
        <p>{error.toString()}</p>
      </>
    );
  }

  return (
    <>
      <h3 style={{ color: "blue" }}>{post.title}</h3>
      <div>
        <button onClick={() => deleteMutation.mutate(post.id)}>Delete</button>
        {deleteMutation.isPending && <p>Deleting...</p>}
        {deleteMutation.isError && (
          <p style={{ color: "red" }}>{deleteMutation.error.toString()}</p>
        )}
        {deleteMutation.isSuccess && <p>Post {post.title} (not) deleted!</p>}
      </div>
      <div>
        <button onClick={() => updateTitleMutation.mutate(post.id)}>
          {updateTitleMutation.isPending ? "Updating..." : "Update title"}
        </button>
        {updateTitleMutation.isError && (
          <p style={{ color: "red" }}>{updateTitleMutation.error.toString()}</p>
        )}
      </div>
      <p>{post.body.replace(/"/g, "&quot;")}</p>
      <h4>Comments</h4>
      {data.map((comment) => (
        <li key={comment.id}>
          {comment.email}: {comment.body}
        </li>
      ))}
    </>
  );
}
