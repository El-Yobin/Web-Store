const getProducts = async (url, params) => {
  const paramsStrings = params
    ? Object.entries(params).map(([param, value]) => `${param}=${value}`)
    : [];

  const paramsString = paramsStrings.length
    ? `?${paramsStrings.join('&')}`
    : '';

  const urlString = `http://localhost:4000/${url}${paramsString}`;

  return fetch(urlString).then(r => r.json());
};

function fillGallery(products) {
  const wrapper = document.querySelector('.catalog__wrapper');
  const container = document.createElement('div');
  container.setAttribute('class', 'products');

  for (let i = 0; i < products.length; i += 1) {
    const containerWrapper = document.createElement('div');
    containerWrapper.setAttribute('class', 'product');

    const imageContainer = document.createElement('div');
    imageContainer.setAttribute('class', 'product__imgContainer');
    containerWrapper.append(imageContainer);

    const image = document.createElement('div');
    image.setAttribute('class', 'product__img');
    image.setAttribute(
      'style',
      `background-image: url(images/${products[i].id_model}.jpg)`
    );
    imageContainer.append(image);

    const discription = document.createElement('div');
    discription.setAttribute('class', 'product__discription');

    const title = document.createElement('h4');
    title.innerHTML = products[i].name;
    discription.append(title);

    const price = document.createElement('h6');
    price.innerHTML = `${products[i].price} $`;
    discription.append(price);

    containerWrapper.append(discription);

    container.append(containerWrapper);
  }

  wrapper.append(container);
}

const main = async () => {
  const products = await getProducts('api/products', { limit: 10 });

  fillGallery(products);
};

main();

const form = document.querySelector('.filter');

form.submit = () => {
  const formValues = Object.fromEntries(
    Array.from(form.elements).map(({ name, value }) => [name, value])
  );
  formValues.limit = 10;
  const refresh = async () => {
    const products = await getProducts('api/products', formValues);

    document
      .querySelector('.catalog__wrapper')
      .removeChild(document.querySelector('.products'));

    fillGallery(products);
  };

  refresh();
};

form.onchange = () => {
  form.submit();
};
