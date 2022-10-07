import { useState, useEffect } from 'react';
import { getImages, searchImages } from 'api/api';

import { Container } from './AppStyled';

import ImageGallery from "./ImageGallery/ImageGallery";
import Loader from './Loader/Loader';
import Button from './Button/Button';
import Searchbar from './Searchbar/Searchbar';
import Modal from './Modal/Modal';

export default function App() {

  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [searchName, setSearchName] = useState("");
  const [isItems, setIsItems] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [largeModalImgURL, setlargeModalImgURL] = useState("");
  const [modalTags, setmodalTags] = useState("");

  useEffect(() => {
    fetchImages();
  }, []);

  useEffect((prevState) => {
    if (!searchName && prevState.page !== page) {
      fetchImages();
      return;
    }
    if((searchName && prevState.searchName !== searchName) ||
    prevState.page !== page) {
      fetchSearchImages(searchName, page);
    }
  }, [page, searchName]);

  async function fetchImages() {
    setLoading(true);
    setIsItems(true);
    try {
      const data = await getImages(page);
      if (page === 1 && !searchName) {
        setItems([...data.hits]);
      }
      if (!searchName && page > 1) {
        setItems((prev) => [...prev, ...data.hits]);
      }
    } 
    catch (error) {
      setError(error);
    }
    finally {
      setLoading(false);
    }
  }

  async function fetchSearchImages() {
    const { searchName, page } = this.state;
    setLoading(true);
    setIsItems(true);
    try {
      const searchData = await searchImages(searchName, page);
      if (!searchData.hits.length && searchName) {
        setIsItems(false);
      }
      if (page === 1 && searchName) {
        setItems([...searchData.hits]);
      }
      if (searchName) {
        setItems((prev) => [...prev, ...searchData.hits]);
      } 
    } 
    catch (error) {
      setError(error);
    }
    finally {
      setLoading(false);
    }
  }

  const loadMore = () => {
    setPage((prev) => prev + 1);
  }

  const onSearch = ({searchName}) => {
    setSearchName(searchName);
    setPage(1);
  }

  const openModal = ({ largeImageURL, tags }) => {
    setModalOpen(true);
    setlargeModalImgURL(largeImageURL);
    setmodalTags(tags);
  }

  const closeModal = () => {
    setModalOpen(false);
    setlargeModalImgURL("");
    setmodalTags("");
  }
  console.log(items);
  const isImages = Boolean(items.length);

  return (
    <Container>
        {modalOpen && <Modal tags={modalTags} largeImageURL={largeModalImgURL} onClose={closeModal}/>}
        <Searchbar onSearch={onSearch}/>
        {loading && <Loader />}
        {error && <h2>Oops, something went wrong. Please try to reload the page</h2>}
        {isImages && <ImageGallery items={items} onClick={openModal}/>}
        {!isItems && !isImages && <h2>We didn't find any images for "{searchName}"</h2>}
        {isImages && isItems && items.length % 12 === 0 && <Button loadMore={loadMore}/>}
        {items.length % 12 !== 0 && <h2>There are no more images for your search query</h2>}
    </Container>
  )
}


// export default class App extends Component {

//   state = {
//     items: [],
//     loading: false,
//     error: null,
//     page: 1,
//     searchName: "",
//     isItems: true,
//     modalOpen: false,
//     modalContent: {
//       largeImageURL: "",
//       tags: "",
//     }
//   }  

//   componentDidMount() {
//     this.fetchImages();
//   }

//   componentDidUpdate(_, prevState) {
//     const { page, searchName } = this.state;
//     if (!searchName && prevState.page !== page) {
//       this.fetchImages();
//       return;
//     }
//     if((searchName && prevState.searchName !== searchName) ||
//     prevState.page !== page) {
//       this.fetchSearchImages(searchName, page);
//     }
//   }

//   async fetchImages() {
//     const { searchName, page } = this.state;
//     this.setState({
//         loading: true,
//         isItems: true,
//     });

//     try {
//       const data = await getImages(page);
//       this.setState(({items}) => {
//         if (page === 1 && !searchName) {
//           return {
//             items: [...data.hits]
//           }
//         }
//         if (!searchName && page > 1) {
//           return {
//             items: [...items, ...data.hits]
//           }
//         }
//       })
//     } catch (error) {
//       this.setState({
//         error
//       })
//     }
//     finally {
//       this.setState({
//         loading: false
//       })
//     }
//   }

//   async fetchSearchImages() {
//     const { searchName, page } = this.state;
//     this.setState({
//         loading: true,
//         isItems: true,
//     });

//     try {
//       const searchData = await searchImages(searchName, page);
//       if (!searchData.hits.length && searchName) {
//         this.setState({
//           isItems: false
//         })
//       }
//       this.setState(({items}) => {
//         if (page === 1 && searchName) {
//           return {
//             items: [...searchData.hits]
//           }
//         }
//         if (searchName) {
//           return {
//             items: [...items, ...searchData.hits]
//           }
//         }
//       })
//     } catch (error) {
//       this.setState({
//         error
//       })
//     }
//     finally {
//       this.setState({
//         loading: false
//       })
//     }
//   }

//   loadMore = () => {
//     this.setState(({page}) => {
//       return {
//         page: page + 1,
//       }
//     })
//   }

//   onSearch = ({searchName}) => {
//     this.setState({
//       searchName,
//       page: 1
//     })
//   }

//   openModal = (modalContent) => {
//     this.setState({
//       modalOpen: true,
//       modalContent
//     })
//   }

//   closeModal = () => {
//     this.setState({
//       modalOpen: false,
//       modalContent: {
//         largeImageURL: "",
//         tags: "",
//       }
//     })
//   }

//   render() {
//     const { items, loading, error, searchName, isItems, modalOpen, modalContent } = this.state;
//     const { loadMore, onSearch, closeModal, openModal } = this;
//     const isImages = Boolean(items.length);

//     return (
//       <Container>
//         {modalOpen && <Modal tags={modalContent.tags} largeImageURL={modalContent.largeImageURL} onClose={closeModal}/>}
//         <Searchbar onSearch={onSearch}/>
//         {loading && <Loader />}
//         {error && <h2>Oops, something went wrong. Please try to reload the page</h2>}
//         {isImages && <ImageGallery items={items} onClick={openModal}/>}
//         {!isItems && !isImages && <h2>We didn't find any images for "{searchName}"</h2>}
//         {isImages && isItems && items.length % 12 === 0 && <Button loadMore={loadMore}/>}
//         {items.length % 12 !== 0 && <h2>There are no more images for your search query</h2>}
//       </Container>
//     )
//   }
// }



