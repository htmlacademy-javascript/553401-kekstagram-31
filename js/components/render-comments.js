const AMOUNT_COMMENTS_SHOWN = 5;

const commentList = document.querySelector('.social__comments');
const commentCount = document.querySelector('.social__comment-shown-count');
const commentListFragment = document.createDocumentFragment();
const template = commentList.children[0].cloneNode(true);

const createComment = (item) => {
  const commentItem = template.cloneNode(true);

  commentItem.querySelector('.social__picture').src = item.avatar;
  commentItem.querySelector('.social__picture').alt = item.name;
  commentItem.querySelector('.social__text').textContent = item.message;

  return commentItem;
};

const renderComments = (commentArray) => {
  const commentLoadBtn = document.querySelector('.comments-loader');
  let counter = 0;

  const shownComment = () => {
    const startIndex = counter * AMOUNT_COMMENTS_SHOWN;
    const endIndex =
      startIndex + AMOUNT_COMMENTS_SHOWN > commentArray.length
        ? commentArray.length
        : startIndex + AMOUNT_COMMENTS_SHOWN;

    for (let i = startIndex; i < endIndex; i++) {
      commentListFragment.append(createComment(commentArray[i]));
    }

    counter++;
    commentCount.textContent = endIndex;
    commentLoadBtn.classList.toggle('hidden', endIndex === commentArray.length);
    commentList.append(commentListFragment);
  };

  commentList.innerHTML = '';
  shownComment();

  commentLoadBtn.addEventListener('click', shownComment);
};

export default renderComments;
