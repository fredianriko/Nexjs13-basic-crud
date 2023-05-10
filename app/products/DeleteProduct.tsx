"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Suspense } from "react";

type Product = {
  id: number;
  title: string;
  price: number;
};

export default function DeleteProduct(product: Product) {
  const [modal, setModal] = useState(false);

  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  const handleChange = async () => {
    setModal(!modal);
  };

  const handleDelete = async (productId: number) => {
    setTimeout(() => {
      setIsLoading(true);
    }, 5000);

    await fetch(`http://localhost:5000/products/${productId}`, {
      method: "DELETE",
    });

    // loading state finish
    setTimeout(() => {
      setIsLoading(false);
    }, 3000);

    router.refresh();
    setModal(false);
  };

  return (
    <div>
      <button type="button" className="btn btn-error btn-sm" onClick={handleChange}>
        Delete
      </button>
      <input type="checkbox" className="modal-toggle" checked={modal} onChange={handleChange} />

      {/* Modal Component */}
      <div className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Delete this data {product.title}</h3>

          <div className="modal-action">
            <button type="button" className="btn" onClick={handleChange}>
              Close
            </button>

            {!isLoading ? (
              <button type="button" className="btn btn-primary" onClick={() => handleDelete(product.id)}>
                Delete
              </button>
            ) : (
              <Suspense>
                <button type="button" className="btn loading">
                  Deleting...
                </button>
              </Suspense>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
