function addComment() {
    let comment = document.getElementById('comment').value;
    if (comment.trim() !== "") {
        let commentBox = document.createElement("p");
        commentBox.innerText = comment;
        document.getElementById('comments').appendChild(commentBox);
        document.getElementById('comment').value = "";
    }
}