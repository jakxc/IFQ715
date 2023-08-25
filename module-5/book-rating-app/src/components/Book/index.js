const Book = ({key, title, author, likes, dislikes, setLikes, setDislikes}) => {
    return (
        <>
            <div>
                <h3>{title}</h3>
                <h5>{author}</h5>
                <p>Likes: {likes}</p>
                <p>Dislikes: {dislikes}</p>
                <button onClick={setLikes(key)}>Like</button>
                <button onClick={setDislikes(key)}>Dislike</button>
            </div>
        </>
    )
}

export default Book;