const productService = require('./productService');

const list = async (req,res) => {
    try {
        let page = req.query.page;
        const itemsPerPage = 9;
        page = productService.pageValidation(page);
        const list = await productService.getAllProducts(page, itemsPerPage);
        const brands = await productService.getProductBrands();
        const categories = await productService.getProductCategories();
        const products = list.rows;
        const count = Math.ceil(list.count/itemsPerPage);
        res.render('user/productList', { 
            title: 'Electro - Product List',
            products, 
            categories,
            brands,
            page,
            count
        });
    } catch (error) {
        res.render('error',{error});
    }

}

const details = async (req, res) => {
    try {
        const id = Number(req.params.productID);
        const product = await productService.getDetails(id);
        const relatedProducts = await productService.getDetailRelatedProducts(product.idProduct, product.category);
        const image = await productService.getDetailImages(id);
        res.render('user/productDetails', { title: `${product.name} | Electro`, product, image, relatedProducts });
    } catch (error) {
        res.render('error',{error});
    }
}

const checkout = async (req, res) => {
    try {
        res.render('user/checkout', { title: 'Electro - Checkout' });
    } catch (error) {
        res.render('error',{error});
    }
};
module.exports = {list, details, checkout};