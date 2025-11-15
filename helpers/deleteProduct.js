const deleteProduct = (id) => {
  const i = products.findIndex((p) => p.id === id);
  return i === -1 ? null : products.splice(i, 1)[0];
};

module.exports = deleteProduct;
