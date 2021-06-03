const commentFormHandler = async function(event) {
    event.preventDefault();

    const comment_text = document.querySelector('#comment_text').value.trim();
    const post_id = document.querySelector('.new-comment-form').dataset.postid;
    // const post_id = window.location.toString().split('/')[
    //     window.location.toString().split('/').length - 1

    if (comment_text) {
        await fetch('/api/comments', {
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

document.querySelector('.comment_text').addEventListener('submit', commentFormHandler);