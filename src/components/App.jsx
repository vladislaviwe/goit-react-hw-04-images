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
    const fetchImages = async() => {
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
  
    const fetchSearchImages = async() => {
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
        if (page !== 1 && searchName) {
          console.log(searchData.hits);
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

    if (!searchName) {
      fetchImages();
      return;
    }
    if(searchName) {
      fetchSearchImages(searchName, page);
    }
  }, [page, searchName]);

  const loadMore = () => {
    setPage((prev) => prev + 1);
  }

  const onSearch = (searchName) => {
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

  const isImages = Boolean(items.length);

  return (
    <div>
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
    </div>
  )
}