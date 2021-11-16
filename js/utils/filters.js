const compareComments = (pictureA, pictureB) => {

  if(pictureA.comments.length > pictureB.comments.length) {
    return -1;
  }
  if (pictureB.comments.length > pictureA.comments.length) {
    return 1;
  }
  return 0;
};

const mixPictures = () => Math.random() > 0.5 ? 1 : -1;


export {compareComments, mixPictures};
