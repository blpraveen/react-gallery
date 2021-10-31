import React, { useState, useCallback } from 'react';
import ReactDOM from 'react-dom';
import Gallery from './Gallery';
import Dropzone from './Dropzone';
import Carousel, { Modal, ModalGateway } from 'react-images';
import {ModalContainer, ModalDialog} from 'react-modal-dialog';
import { startStatic, stopStatic, inject } from 'narcissus';
const ExampleBasic = ({photos, title, direction}) => {
    const [currentImage, setCurrentImage] = useState(0);
  const [viewerIsOpen, setViewerIsOpen] = useState(false);
  const [isShowingModal, setIsShowingModal] = useState(false);

   const openLightbox = useCallback((event, { photo, index }) => {
    setCurrentImage(index);
    setViewerIsOpen(true);
  }, []);
   function handleClick() { setIsShowingModal(true)}
  function handleClose(){setIsShowingModal(false)}
  const closeLightbox = () => {
    setCurrentImage(0);
    setViewerIsOpen(false);
  };
    return (
      <div>
        <div className="card">
        <div className="card-header">Photos <button className="btn btn-info add-button float-right"  onClick={handleClick}>Add Photos</button></div>
        <div className="card-body">
        <Gallery photos={photos} direction={direction} onClick={openLightbox}/>
        <ModalGateway>
        {viewerIsOpen ? (
          <Modal onClose={closeLightbox}>
            <Carousel
              currentIndex={currentImage}
              views={photos.map(x => ({
               ...x,
                srcset: x.srcSet,
                caption: x.title,
              }))}
            />
          </Modal>
        ) : null}
      </ModalGateway>
      {isShowingModal && (
          <ModalContainer onClose={handleClose} >
          <ModalDialog  style={{
      height: '400px',
      overflow: 'auto',
    }} onClose={handleClose}>
                     <Dropzone />
          </ModalDialog>
        </ModalContainer>
        )}
        
      </div>
      </div>
      </div>
    );
}

export default ExampleBasic;
