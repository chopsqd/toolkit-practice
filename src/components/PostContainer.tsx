import React, {useState} from 'react';
import {postAPI} from "../services/PostService";
import PostItem from "./PostItem";

const PostContainer = () => {
    const {data: posts, error, isLoading, refetch} = postAPI.useFetchAllPostsQuery(10, {
        // Аналог debounce
        pollingInterval: 1000
    })

    return (
        <div>
            <div className="posts__list">
                {/*<button onClick={() => refetch()}>REFETCH</button>*/}
                {isLoading && <h1>Идет загрузка...</h1>}
                {error && <h1>Произошла ошибка при загрузке данных</h1>}
                {posts && posts.map(post =>
                    <PostItem key={post.id} post={post}/>
                )}
            </div>
        </div>
    );
};

export default PostContainer;