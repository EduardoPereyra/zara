import React, { useEffect, useState } from "react";
import { DragDropContext } from "@hello-pangea/dnd";
import ProductList from "../product-list/product-list";
import {
  reorderProductMap,
  reorderProductMapList,
} from "../../utilities/reorder";
import styles from "./drag-and-drop.module.css";
import { Droppable } from "@hello-pangea/dnd";
import { useSearchParams } from "next/navigation";
import Image from "next/image";

export default function DragAndDrop() {
  const [productMap, setProductMap] = useState([]);
  const [lastIndex, setLastIndex] = useState(0);
  const [backup, setBackup] = useState(false);
  const searchParams = useSearchParams();

  useEffect(() => {
    const backupInfo = localStorage.getItem("productMap");
    if (backupInfo) {
      setBackup(true);
      const backupInfoParsed = JSON.parse(backupInfo);
      setProductMap(backupInfoParsed);
      setLastIndex(backupInfoParsed.length);
      return;
    }
    const searchIdsString = searchParams.get("ids");
    if (searchIdsString) {
      const fetchProducts = async () => {
        try {
          const products = await getProducts(searchIdsString);
          const initialProductMapData = products.data.map((product, index) => ({
            products: [product], // Assuming each product is in its own group initially
            align: "left", // You can set the default alignment as needed
            id: `G-${index}`,
          }));
          setProductMap(initialProductMapData);
          setLastIndex(initialProductMapData.length);
        } catch (error) {
          console.error("Error fetching products:", error.message);
        }
      };

      fetchProducts();
    }
  }, [searchParams]);

  const getProducts = async (searchIdsString) => {
    const response = await fetch(`/api/products?ids=${searchIdsString}`, {
      method: "GET",
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Something went wrong");
    }
    return data;
  };

  const add = () => {
    const newLastIndex = lastIndex + 1;
    setProductMap((prevProductMap) => [
      ...prevProductMap,
      {
        products: [],
        align: "left",
        id: newLastIndex.toString(),
      },
    ]);
    setLastIndex(newLastIndex);
  };

  const removeEmpty = () => {
    setProductMap((prevProductMap) =>
      prevProductMap.filter((item) => item.products.length > 0)
    );
  };

  const modifyAlignment = (id, newAlign) => {
    setProductMap((prevProductMap) =>
      prevProductMap.map((item) =>
        item.id === id ? { ...item, align: newAlign } : item
      )
    );
  };

  const onDragEnd = (result) => {
    // Dropped outside the list
    if (!result.destination) {
      return;
    }

    if (result.type === "CARD") {
      const reorderedProductMap = reorderProductMap(
        productMap,
        result.source,
        result.destination
      );
      setProductMap(reorderedProductMap);
    } else {
      const reorderedProductMap = reorderProductMapList(
        productMap,
        result.source.index,
        result.destination.index
      );
      setProductMap(reorderedProductMap);
    }
    removeEmpty();
  };

  const changeBackup = () => {
    backup
      ? localStorage.removeItem("productMap")
      : localStorage.setItem("productMap", JSON.stringify(productMap));
    setBackup(!backup);
  };

  if (!productMap) {
    return <div>Loading</div>;
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId='productMap' type='LIST'>
        {(dropProvided) => (
          <div ref={dropProvided.innerRef} {...dropProvided.droppableProps}>
            {productMap.map((item, index) => (
              <ProductList
                internalScroll
                key={item.id}
                listId={item.id}
                listType='CARD'
                products={item.products}
                align={item.align}
                modifyAlignment={modifyAlignment}
                index={index}
              />
            ))}
            {dropProvided.placeholder}
            <div className={styles.buttonsContainer}>
              <button className={styles.addButton} onClick={add}>
                Add
              </button>
              {!backup && (
                <button className={styles.saveButton} onClick={changeBackup}>
                  <Image
                    src='/images/save.png'
                    alt='Save'
                    width={32}
                    height={32}
                  />
                </button>
              )}
              {backup && (
                <button className={styles.saveButton} onClick={changeBackup}>
                  <Image
                    src='/images/delete.png'
                    alt='Delete'
                    width={32}
                    height={32}
                  />
                </button>
              )}
            </div>
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
}
