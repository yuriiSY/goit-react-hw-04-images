const ImageGalleryItem = ({ item, onClick }) => {
  return (
    <li onClick={() => onClick(item)} className="ImageGalleryItem">
      <img
        className="ImageGalleryItem-image"
        src={item.webformatURL}
        alt={item.tags}
      />
    </li>
  );
};

export default ImageGalleryItem;
