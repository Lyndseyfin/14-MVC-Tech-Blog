const commentFormHandler = async function(event) {
    event.preventDefault();

    const comment_text = document.querySelector('#comment').value.trim();
    const post_id = document.querySelector('#new-comment-form').dataset.postid;
    // const post_id = window.location.toString().split('/')[
    //     window.location.toString().split('/').length - 1
    console.log(comment_text)
    if (comment_text) {
       let response = await fetch('/api/comments', {
            method: 'POST',
            body: JSON.stringify({
                post_id,
                comment_text
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (response.ok) {
            document.location.reload();
        } else {
            alert(response.statusText);
        }
    }
}

document.querySelector('#new-comment-form').addEventListener('submit', commentFormHandler);