const getProducts = async (url, params) => {
    const paramsStrings = params ? Object.entries(params).map(([param, value]) => `${param}=${value}`) : [];

    const paramsString = paramsStrings.length ? `/?${paramsStrings.join('&')}` : '';

    const urlString = `http://localhost:4000/${url}${paramsString}`;

    const getProducts = async () => fetch(urlString);

    return getProducts().then(r => r.json())
}

const main = async () => {

    const productsWomen = await getProducts('api/products', {
        category: 'Women',
    })

    console.log(productsWomen);
    fillGallery(productsWomen);
}

main();

function fillGallery(products) {

    const wrapper = document.querySelector('.categoryMen__wrapper')
    const container = document.createElement('div');
    container.setAttribute('class', 'products');

    for (let i = 0; i < products.length; i++) {
        const containerWrapper = document.createElement('div');
        containerWrapper.setAttribute('class', 'product');

        const image = document.createElement('img');
        image.setAttribute('class', 'product__img');
        image.setAttribute('src', `images\/${products[i].id_model}.jpg`)
        containerWrapper.append(image);

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


