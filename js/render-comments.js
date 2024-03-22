const commentList = document.querySelector('.social__comments');
const commentListFragment = document.createDocumentFragment();

const renderComments = (commentArray) => {
  commentArray.forEach((comment) => {
    const commentItem = commentList.children[0].cloneNode(true);

    commentItem.querySelector('.social__picture').src = comment.avatar;
    commentItem.querySelector('.social__picture').alt = comment.name;
    commentItem.querySelector('.social__text').textContent = comment.message;

    commentListFragment.append(commentItem);
  });

  commentList.innerHTML = '';
  commentList.append(commentListFragment);
};

export default renderComments;
