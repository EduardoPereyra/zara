import React from "react";
import Image from "next/image";
import styles from "./product-item.module.css";

const getAvatarStyle = (isDragging) => ({
  marginRight: `${grid}px`,
  borderColor: isDragging ? "lightgreen" : "grey",
  borderWidth: `${grid}px`,
  boxShadow: isDragging ? `2px 2px 1px lightgreen` : "none",
});

const grid = 8;

export default function ProductItem({ product, provided }) {
  return (
    <div
      style={getAvatarStyle(false)}
      className={styles.productItemContainer}
      ref={provided.innerRef}
      {...provided.draggableProps}
      {...provided.dragHandleProps}
    >
      <Image src={product.img} alt={product.name} width={80} height={80} />
      <h1>{product.name}</h1>
      <p>{product.price}</p>
    </div>
  );
}
