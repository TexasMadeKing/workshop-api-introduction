import * as React from "react";
import api from "./api";

const Posts: React.FC = () => {
  interface Post {
    id: number;
    title: string;
    associated_topics?: string[];
    content?: string;
    url_for_post: string;
  }

  const [posts, setPosts] = React.useState<Post[]>([]);

  const handleApiResponse = (response: any) => {
    console.log("Res", response.data);
    setPosts(response.data.posts);
  };

  const handleError = (error: any) => {
    alert("Something went wrong");
  };

  const getData = React.useCallback(() =>
    api.get("posts").then(handleApiResponse).catch(handleError),
    []
  );

  React.useEffect(() => {
    getData();
  }, []);

  const content =
    posts.length === 0 ? (
      <div>Loading...</div>
    ) : (
      posts.map((post) => (
        <div key={post.id} className="post-container">
          <a href={post.url_for_post} target="_blank" rel="noopener noreferrer" className="title">
            {post.title}
          </a>

          <div className="topics">
            {post.associated_topics?.length > 0 &&
              post.associated_topics.map((topic: string) => (
                <div key={topic} className="label">
                  {topic}
                </div>
              ))}
          </div>

          <div>{post.content && post.content.replace(/(<([^>]+)>)/gi, "")}</div>
        </div>
      ))
    );

  return <div>{content}</div>;
};

export default Posts;
