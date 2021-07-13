import React, { useState } from 'react';
import { useMutation, useQuery } from "@apollo/client";
import { AUTHORS, addBookMutation, BOOKS } from '../queries/queries';

function AddBook() {
    const [bookInfo, setBookInfo] = useState({
        name: '',
        genre: '',
        authorId: ''
    });

    const { loading, error, data } = useQuery(AUTHORS);

    const [createLink] = useMutation(addBookMutation, {
        variables: {
            name: bookInfo.name,
            genre: bookInfo.genre,
            authorId: bookInfo.authorId
        },
        refetchQueries: [{ query: BOOKS }]
    });

    const submitForm = e => {
        e.preventDefault();
        createLink();
    }

    if (error) return <p>Error :(</p>;

    return (
        <form action="" id="add-book" onSubmit={submitForm}>
            <div className="field">
                <label>Book Name</label>
                <input type="text" onChange={(e) => setBookInfo({ ...bookInfo, name: e.target.value })} />
            </div>
            <div className="field">
                <label>Genre</label>
                <input type="text" onChange={(e) => setBookInfo({ ...bookInfo, genre: e.target.value })} />
            </div>
            <div className="field">
                <label>Author</label>
                <select name="" id="" onChange={(e) => setBookInfo({ ...bookInfo, authorId: e.target.value })}>
                    <option value="">Select Author</option>
                    {
                        loading
                            ?
                            <option disabled>Loading Authors...</option>
                            :
                            data.authors.map(author => (
                                <option value={author.id} key={author.id}>
                                    {author.name}
                                </option>)
                            )
                    }
                </select>
            </div>
            <button>+</button>
        </form>
    );
}

export default AddBook;
