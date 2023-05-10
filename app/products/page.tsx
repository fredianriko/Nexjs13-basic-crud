import AddProduct from "./AddProduct";
import DeleteProduct from "./DeleteProduct";
import UpdateProduct from "./UpdateProduct";

type Product = {
  id: number;
  title: string;
  price: number;
};

async function getProductList() {
  const res = await fetch("http://localhost:5000/products", { cache: "no-store" });
  return res.json();
}

export default async function page() {
  const products: Product[] = await getProductList();

  const componentUI = (
    <div className="py-10 px-10">
      {/* add new product button modals */}
      <div className="py-5">
        <AddProduct />
      </div>

      {/* TABLE */}
      <table className="table w-full">
        <thead>
          <tr>
            <th>ID</th>
            <th>Product Name</th>
            <th>Price</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {products.map((product, index) => (
            <tr key={product.id}>
              <td>{index + 1}</td>
              <td>{product.title}</td>
              <td>{product.price}</td>
              <td className="flex space-x-2">
                <UpdateProduct {...product} />
                <DeleteProduct {...product} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  return componentUI;
}
