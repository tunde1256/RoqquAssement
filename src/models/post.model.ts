import db from "../config/db";

export const getPostsByUserId = async (user_id: number) => {
  return db("posts").where({ user_id });  
};

export const createPost = async (post: { title: string; body: string; user_id: number }) => {
  try {
    const [id] = await db("posts").insert(post);
    return { id, ...post };
  } catch (error) {
    console.error("Error creating post:", error);
    throw error;
  }
};

export const deletePost = async (id: number) => {
  return db("posts").where({ id }).del();
};

export const getPostsByUserIdWithPagination = async (user_id: number, page: number, pageSize: number) => {
  return db("posts")
    .where({ user_id }) 
    .offset((page - 1) * pageSize)
    .limit(pageSize);
};

export const countPostsByUserId = async (user_id: number): Promise<any> => {
  const count = await db("posts").where({ user_id }).count();  
  return count[0]["count(*)"];
};
