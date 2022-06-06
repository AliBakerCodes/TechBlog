const newPostHandler = async (evt)=> {
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

document.querySelector('#create-post-form').addEventListener('submit', newPostHandler);

