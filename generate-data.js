const faker = require('faker')
const fs = require('fs')
//
faker.locale = 'vi';

// Random data

console.log(faker.commerce.department())
console.log(faker.commerce.productName())
console.log(faker.commerce.productDescription())
console.log(faker.random.uuid())
console.log(faker.image.imageUrl())
console.log(faker.name.findName())
const ramdomCategories = (n) => {
    if (n <= 0) return []
    const categoryList = []

    Array.from(new Array(n)).forEach(() => {
        const category = {
            id: faker.random.uuid(),
            name: faker.commerce.department(),
            createdAt: Date.now(),
            updatedAt: Date.now(),
        }
        categoryList.push(category)
    })
    return categoryList
}

const ramdomBlogs = (n) => {
    if (n <= 0) return []
    const blogList = []

    Array.from(new Array(n)).forEach(() => {
        const blog = {
            id: faker.random.uuid(),
            name: faker.commerce.productName(),
            title: faker.commerce.productMaterial(),
            content: faker.commerce.productDescription(),
            author: faker.commerce.productName(),
            action: faker.database.type(),
            createdAt: Date.now(),
            updatedAt: Date.now(),
        }
        blogList.push(blog)
    })
    return blogList
}

const ramdomProducts = (categoryList, n) => {
    if (n <= 0) return []
    const productList = []

    for(const category of categoryList) {
        Array.from(new Array(n)).forEach(() => {
            const product = {
                categoryId : category.id,
                id: faker.random.uuid(),
                name: faker.commerce.productName(),
                color: faker.commerce.color(),
                price: Number.parseFloat(faker.commerce.price()),
                description: faker.commerce.productDescription(),
                thumbnailUrl: faker.image.imageUrl(400, 400),
                createdAt: Date.now(),
                updatedAt: Date.now(),
            }
            productList.push(product)
        })
    }



    return productList
}

;(() => {
    const categoryList = ramdomCategories(4)
    const blogList = ramdomBlogs(10)
    const productList = ramdomProducts(categoryList, 10)

    const db = {
        categories: categoryList,
        products: productList,
        profile: {
            name: "zero"
        },
        blogs : blogList
    }
    fs.writeFile('db.json', JSON.stringify(db), () => {
        console.log("write success");
    });
})();
