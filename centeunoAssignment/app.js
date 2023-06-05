const express = require('express');
const app = express();
const fs = require('fs');



//API1 for product list
app.get('/api/products/list', (req, res) => {
  const { size, page } = req.query;

  // Read the JSON file
  fs.readFile('item_list.json', 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Internal Server Error' });
    }

    const itemList = JSON.parse(data);

    // Calculate the start and end indexes for pagination
    const startIndex = (page - 1) * size;
    const endIndex = startIndex + size;

    // Get the paginated items
    const paginatedItems = itemList
      .slice(startIndex, endIndex)
      .map(({ id, item_name, item_image, item_price }) => ({
        id,
        item_name,
        item_image,
        item_price
      }));

    res.json(paginatedItems);
  });
});

//API2 for product details

app.get('/api/products/:id', (req, res) => {
  const { id } = req.params;

  // Read the JSON file
  fs.readFile('item_list.json', 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Internal Server Error' });
    }

    const itemList = JSON.parse(data);

    // Find the product with the matching ID
    const product = itemList.find(item => item.id === parseInt(id));

    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    res.json(product);
  });
});

// Start the server
const port = 3000;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
