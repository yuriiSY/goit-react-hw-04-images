import ImageGalleryItem from 'components/ImageGalleryItem/ImageGalleryItem';

const ImageGallery = ({ items, showModal }) => {
  const elements = items.map(item => (
    <ImageGalleryItem key={item.id} onClick={showModal} item={item} />
  ));

  return <ul className="ImageGallery">{elements}</ul>;
};

export default ImageGallery;
