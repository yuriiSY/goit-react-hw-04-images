import { useState, useEffect } from 'react';
import { searcgPhotos } from 'api/photos';
import Searchbar from 'components/Searchbar/Searchbar';
import ImageGallery from 'components/ImageGallery/ImageGallery';
import Button from 'components/Button/Button';
import Modal from 'components/Modal/Modal';
import Loader from 'components/Loader/Loader';

const SearchImage = () => {
  const [search, setSearch] = useState('');
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [photoDetails, setPhotoDetails] = useState({});
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [totalHits, setTotalHits] = useState(0);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        const { data } = await searcgPhotos(search, page);
        setPhotos(prevPhotos =>
          data?.hits ? [...prevPhotos, ...data.hits] : prevPhotos
        );
        setTotalHits(data?.totalHits ? data.totalHits : 0);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    if (search) {
      fetchPosts();
    }
  }, [page, search]);

  const handleSearch = ({ search }) => {
    setSearch(search);
    setPhotos([]);
    setPage(1);
    setTotalHits(0);
  };

  const loadMore = () => {
    setPage(prevPage => prevPage + 1);
  };

  const showModal = ({ largeImageURL }) => {
    setModalIsOpen(true);
    setPhotoDetails({
      largeImageURL,
    });
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setPhotoDetails({});
  };

  const isPresent = Boolean(photos.length);
  const isEnd = isPresent && totalHits > photos.length;

  return (
    <div className="App">
      <Searchbar onSubmit={handleSearch} />
      {loading && <Loader />}
      {error && <p>{error}</p>}
      {isPresent && <ImageGallery showModal={showModal} items={photos} />}
      {isEnd && (
        <Button onClick={loadMore} type="button">
          Load More
        </Button>
      )}
      {modalIsOpen && <Modal close={closeModal} modalData={photoDetails} />}
    </div>
  );
};

// class SearchImage extends Component {
//   state = {
//     search: '',
//     photos: [],
//     loading: false,
//     error: null,
//     page: 1,
//     photoDetails: [],
//     modalIsOpen: false,
//     totalHits: 0,
//   };

//   async componentDidUpdate(prevProps, prepState) {
//     const { search, page } = this.state;
//     if ((search && search !== prepState.search) || page !== prepState.page) {
//       this.setState({
//         loading: true,
//       });
//       try {
//         const { data } = await searcgPhotos(search, page);
//         this.setState(({ photos }) => ({
//           photos: data?.hits ? [...photos, ...data.hits] : photos,
//           totalHits: data?.totalHits ? data.totalHits : 0,
//         }));
//       } catch (error) {
//         this.setState({
//           error: error.message,
//         });
//       } finally {
//         this.setState({
//           loading: false,
//         });
//       }
//     }
//   }

//   handleSearch = ({ search }) => {
//     this.setState({
//       search,
//       photos: [],
//       page: 1,
//       totalHits: 0,
//     });
//   };

//   loadMore = () => {
//     this.setState(({ page }) => ({
//       page: page + 1,
//     }));
//   };

//   showModal = ({ largeImageURL }) => {
//     this.setState({
//       modalIsOpen: true,
//       photoDetails: {
//         largeImageURL,
//       },
//     });
//   };

//   closeModal = () => {
//     this.setState({
//       modalIsOpen: false,
//       photoDetails: {},
//     });
//   };

//   render() {
//     const { handleSearch, loadMore, showModal, closeModal } = this;
//     const { photos, loading, error, modalIsOpen, photoDetails, totalHits } =
//       this.state;

//     const isPresent = Boolean(photos.length);
//     const isEnd = isPresent && totalHits > photos.length;

//     return (
//       <div className="App">
//         <Searchbar onSubmit={handleSearch} />
//         {loading && <Loader />}
//         {error && <p>{error}</p>}
//         {isPresent && <ImageGallery showModal={showModal} items={photos} />}
//         {isEnd && (
//           <Button onClick={loadMore} type="button">
//             Load More
//           </Button>
//         )}
//         {modalIsOpen && <Modal close={closeModal} modalData={photoDetails} />}
//       </div>
//     );
//   }
// }

export default SearchImage;
