const editPostHandler = async (evt)=> {
    evt.preventDefault();
    const title = document.querySelector('#edit-post-title').value 
    const body = document.querySelector('#edit-blog-textarea').value;
    const postId= window.location.pathname.split('/')[2]
    await fetch(`/api/posts/edit/${postID}`,{
        method: 'POST',
        body: JSON.stringify({
            title,
            body,
            postId
        }),
        headers: { 'Content-Type' : 'application/JSON'},
    });

    // window.location.replace('/dashboard');

}

const newDeletePostHandler = async (evt)=> {
    evt.preventDefault();
    const title = document.querySelector('#create-post-title').value 
    const body = document.querySelector('#create-post-content').value;

    await fetch('/api/posts',{
        method: 'POST',
        body: JSON.stringify({
            title,
            body,
        }),
        headers: { 'Content-Type' : 'application/JSON'},
    });

    // window.location.replace('/dashboard');

}

document.querySelector('#create-post-form').addEventListener('submit', editPostHandler);
document.querySelector('#delete-post-button').addEventListener('submit', newDeletePostHandler);

