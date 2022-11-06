import React, {useState} from 'react';
import {postAPI} from "../services/PostService";
import PostItem from "./PostItem";
import {IPost} from "../models/IPost";

const PostContainer = () => {
    const {data: posts, error, isLoading, refetch} = postAPI.useFetchAllPostsQuery(15, {
        // Аналог debounce
        pollingInterval: 1000
    })
    const [createPost, {error: createError, isLoading: isCreateLoading}] = postAPI.useCreatePostMutation()
    const [updatePost, {}] = postAPI.useUpdatePostMutation()
    const [deletePost, {}] = postAPI.useDeletePostMutation()

    const handleCreate = async () => {
        const title = prompt('Введите заголовок поста')
        await createPost({title, body: title} as IPost)
    }

    const handleRemove = (post: IPost) => {
        deletePost(post)
    }

    const handleUpdate = (post: IPost) => {
        updatePost(post)
    }

    return (
        <div>
            <div className="posts__list">
                {/*<button onClick={() => refetch()}>REFETCH</button>*/}
                <button onClick={handleCreate}>Add new post</button>

                {isLoading && <h1>Идет загрузка...</h1>}
                {error && <h1>Произошла ошибка при загрузке данных</h1>}

                {posts && posts.map(post =>
                    <PostItem
                        key={post.id}
                        post={post}
                        remove={handleRemove}
                        update={handleUpdate}
                    />
                )}
            </div>
        </div>
    );
};

export default PostContainer;