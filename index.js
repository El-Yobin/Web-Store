function fillGallery() {
  const gallery = document.querySelector('.gallery');
  const galleryWrapper = document.createElement('div');
  galleryWrapper.setAttribute('id', 'gallery');
  galleryWrapper.setAttribute('class', 'gallery__wrapper');
  for (let i = 0; i < 12; i += 1) {
    const item = document.createElement('div');
    item.setAttribute('class', 'gallery__item');
    item.style.flex = `0.5 1 ${Math.random() * 100 + 150}px`;
    const img = document.createElement('img');
    img.setAttribute('src', `images\\/${i}.jpg`);
    img.setAttribute('class', 'gallery__image');
    item.append(img);
    galleryWrapper.append(item);
  }
  gallery.append(galleryWrapper);
}

fillGallery();
