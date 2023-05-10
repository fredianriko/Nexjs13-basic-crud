"use client";

import { useState, SyntheticEvent } from "react";
import { useRouter } from "next/navigation";
import { Suspense } from "react";

type Product = {
  id: number;
  title: string;
  price: number;
};

export default function UpdateProduct(product: Product) {
  // state
  const [modal, setModal] = useState(false);
  const [title, setTitle] = useState(product.title);
  const [price, setPrice] = useState(product.price);
  const [isLoading, setIsLoading] = useState(false);

  // Event handler
  const router = useRouter();

  const handleChange = async () => {
    setModal(!modal);
  };

  const handleUpdate = async (e: SyntheticEvent) => {
    e.preventDefault;
    setTimeout(() => {
      setIsLoading(true);
    }, 5000);

    await fetch(`http://localhost:5000/products/${product.id}`, {
      method: "PATCH",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        title: title,
        price: price,
      }),
    });

    // loading state finish
    setTimeout(() => {
      setIsLoading(false);
    }, 3000);

    router.refresh();
    setModal(false);
  };

  // Rendering component
  return (
    <div>
      <button type="button" className="btn btn-info btn-sm" onClick={handleChange}>
        Edit
      </button>
      <input type="checkbox" className="modal-toggle" checked={modal} onChange={handleChange} />

      {/* Modal Component */}
      <div className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Edit {product.title}</h3>

          <form onSubmit={handleUpdate}>
            <div className="form-control">
              <label className="label font-bold">Title</label>
              <input type="text" className="input w-full input-bordered" placeholder="Product Name" value={title} onChange={(e) => setTitle(e.target.value)} />
            </div>
            <div className="form-control">
              <label className="label font-bold">Price</label>
              <input type="text" className="input w-full input-bordered" placeholder="Price" value={price} onChange={(e) => setPrice(Number(e.target.value))} />
            </div>

            <div className="modal-action">
              <button type="button" className="btn" onClick={handleChange}>
                Close
              </button>

              {!isLoading ? (
                <button type="submit" className="btn btn-primary">
                  Update
                </button>
              ) : (
                <Suspense>
                  <button type="button" className="btn loading">
                    Updating...
                  </button>
                </Suspense>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
