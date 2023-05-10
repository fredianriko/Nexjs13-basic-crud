"use client";

import { useState, SyntheticEvent } from "react";
import { useRouter } from "next/navigation";
import { Suspense } from "react";

export default function AddProduct() {
  const [modal, setModal] = useState(false);
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  const handleChange = async () => {
    setModal(!modal);
  };

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault;
    setTimeout(() => {
      setIsLoading(true);
    }, 5000);

    await fetch("http://localhost:5000/products", {
      method: "POST",
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

    setTitle("");
    setPrice("");
    router.refresh();
    setModal(false);
  };

  return (
    <div>
      <button type="button" className="btn" onClick={handleChange}>
        Add New
      </button>
      <input type="checkbox" className="modal-toggle" checked={modal} onChange={handleChange} />

      {/* Modal Component */}
      <div className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Add new product</h3>

          <form onSubmit={handleSubmit}>
            <div className="form-control">
              <label className="label font-bold">Title</label>
              <input type="text" className="input w-full input-bordered" placeholder="Product Name" value={title} onChange={(e) => setTitle(e.target.value)} />
            </div>
            <div className="form-control">
              <label className="label font-bold">Price</label>
              <input type="text" className="input w-full input-bordered" placeholder="Price" value={price} onChange={(e) => setPrice(e.target.value)} />
            </div>

            <div className="modal-action">
              <button type="button" className="btn" onClick={handleChange}>
                Close
              </button>

              {!isLoading ? (
                <button type="submit" className="btn btn-primary">
                  Save
                </button>
              ) : (
                <Suspense>
                  <button type="button" className="btn loading">
                    Loading...
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
