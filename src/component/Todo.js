import React, { useEffect, useState } from "react";

const Todo = () => {
  const [img, setImg] = useState("");
  const [product, setProduct] = useState("");
  const [price, setPrice] = useState("");
  const [products, setProducts] = useState([]);
  const [save, setSave] = useState(null);

  const addTask = () => {
    if (img === "" || product === "" || price === "") {
      alert("заполните пустое место!!!");
    } else if (products.some((el) => el.name === product)) {
      alert("такое продук уже существует!!!");
    } else {
      let newTask = {
        id: products.length ? products[products.length - 1].id + 1 : 1,
        url: img,
        name: product,
        mani: price,
      };
      let task = JSON.parse(localStorage.getItem("todo")) || [];
      task.push(newTask);
      localStorage.setItem("todo", JSON.stringify(task));
      readProduct();
      setImg("");
      setProduct("");
      setPrice("");
    }
  };
  const readProduct = () => {
    let task = JSON.parse(localStorage.getItem("todo")) || [];
    setProducts(task);
  };

  const KeyDown = (e) => {
    if (e.key === "Enter") {
      addTask();
    }
  };

  const greenTask = (btn) => {
    localStorage.setItem(
      "todo",
      JSON.stringify([...products.filter((el) => el.id !== btn)])
    );
    readProduct();
  };

  const editProduct = (data) => {
    setImg(data.url);
    setProduct(data.name);
    setPrice(data.mani);
    setSave(data.id);
  };

  const taskEditProduct = (btnId) => {
    let task = JSON.parse(localStorage.getItem("todo")) || [];
    task = products.map((el, idx, arr) => {
      return el.id === btnId
        ? { ...el, url: img, name: product, mani: price }
        : el;
    });
    localStorage.setItem("todo", JSON.stringify(task));
    readProduct();
    setImg("");
    setProduct("");
    setPrice("");
    setSave(null);
  };
  const Cheked = (chekData) => {
    let task = JSON.parse(localStorage.getItem("todo")) || [];
    task = products.map((el) => {
      return el.id === chekData.id ? { ...el, checked: !el.checked } : el;
    });
    localStorage.setItem("todo", JSON.stringify(task));
    readProduct();
  };

  useEffect(() => {
    readProduct();
  }, []);

  return (
    <div className="container">
      <form class="flex items-center justify-center mt-[80px] flex-col gap-5">
        <label for="voice-search" class="sr-only">
          Search
        </label>
        <div class="relative w-[50%] flex items-center justify-center flex-col gap-4 ">
          <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none"></div>
          <input
            onKeyDown={(e) => KeyDown(e)}
            value={img}
            onChange={(e) => setImg(e.target.value)}
            type="text"
            id="voice-search"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="..."
          />
          <input
            onKeyDown={(e) => KeyDown(e)}
            value={product}
            onChange={(e) => setProduct(e.target.value)}
            type="text"
            id="voice-search"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="..."
          />
          <input
            onKeyDown={(e) => KeyDown(e)}
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            type="text"
            id="voice-search"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="..."
          />
        </div>
        <button
          onClick={save ? () => taskEditProduct(save) : () => addTask()}
          type="button"
          class="text-gray-900 bg-gradient-to-r from-red-200 via-red-300 to-yellow-200 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-red-100 dark:focus:ring-red-400 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
        >
          {save ? "Save Poduct" : "Add Product"}
        </button>

        <div class="relative overflow-x-auto shadow-md sm:rounded-lg w-[50%]">
          <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" class="px-6 py-3">
                  Namber
                </th>
                <th scope="col" class="px-6 py-3">
                  IMG
                </th>
                <th scope="col" class="px-6 py-3">
                  Product Name
                </th>
                <th scope="col" class="px-6 py-3">
                  Price
                </th>
                <th scope="col" class="px-6 py-3">
                  Edit
                </th>
                <th scope="col" class="px-6 py-3">
                  Action
                </th>
                <th scope="col" class="px-6 py-3">
                  Cheked
                </th>
              </tr>
            </thead>
            <tbody>
              {products.map((el, idx, arr) => (
                <tr
                  key={el.id}
                  class="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700"
                >
                  <th
                    scope="row"
                    class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    {idx + 1}
                  </th>
                  <td class="px-6 py-4">
                    <img src={el.url} alt="img" width={50} />
                  </td>
                  <td class="px-6 py-4">{el.name}</td>
                  <td class="px-6 py-4">{el.mani} $</td>
                  <td class="px-6 py-4">
                    <button
                      onClick={() => editProduct(el)}
                      type="button"
                      class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                    >
                      Default
                    </button>
                  </td>
                  <td class="px-6 py-4">
                    <button
                      onClick={() => greenTask(el.id)}
                      type="button"
                      class="text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                    >
                      delete
                    </button>
                  </td>
                  <td class="px-6 py-4">
                    <input
                      onChange={() => Cheked(el)}
                      id="checked-checkbox"
                      checked={el.checked}
                      type="checkbox"
                      placeholder="chek"
                      class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </form>
    </div>
  );
};

export default Todo;
