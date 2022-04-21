import { galleryItems } from './gallery-items.js';

// Change code below this line
const gallery = document.querySelector('.gallery');
let instance = null;

const createGallery = (galleryItems) =>
    galleryItems.map(({ preview, original, description }) =>
        `<div class="gallery__item">
            <a class="gallery__link"
                href="${original}">
                <img
                class="gallery__image"
                src="${preview}"
                data-source="${original}"
                alt="${description}"
                />
            </a>
        </div>`).join('');   

gallery.insertAdjacentHTML('beforeend', createGallery(galleryItems));

function onImgClick(e) {
    e.preventDefault(); 

    if (e.target.nodeName !== 'IMG') 
        return;
    
    instance = basicLightbox.create(
        `<img
        class="gallery__image"
        src = "${e.target.dataset.source}"
        />`,
    {
    onShow: () => {
        window.addEventListener('keydown', onEscPress);
    },
    onClose: () => {
        window.removeEventListener('keydown', onEscPress);
    },
        }
    );
    
instance.show();
};

gallery.addEventListener('click', onImgClick);

function onEscPress(e){
    if (e.code === 'Escape') {
        instance.close();
    };
};