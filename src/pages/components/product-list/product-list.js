import React from "react";
import { Droppable, Draggable } from "@hello-pangea/dnd";
import Product from "../product-item/product-item";
import styles from "./product-list.module.css";

const grid = 8;

const getWrapperStyle = (isDraggingOver, align) => ({
  backgroundColor: isDraggingOver ? "#D2D2D2" : "#F5F5F5",
  padding: `${grid}px`,
  alignItems: getAlign(align),
  margin: `${grid}px 0`,
  borderRadius: "12px",
});

const getAlign = (align) => {
  return align === "left"
    ? "flex-start"
    : align === "right"
    ? "flex-end"
    : "center";
};

export default function ProductList(props) {
  const renderBoard = (dropProvided) => {
    const { products, align } = props;

    return (
      <>
        <div className={styles.alignButtonsContainer}>
          <button
            className={align === "left" ? styles.buttonSelected : ""}
            onClick={() => props.modifyAlignment(listId, "left")}
          >
            Left
          </button>
          <button
            className={align === "center" ? styles.buttonSelected : ""}
            onClick={() => props.modifyAlignment(listId, "center")}
          >
            Center
          </button>
          <button
            className={align === "right" ? styles.buttonSelected : ""}
            onClick={() => props.modifyAlignment(listId, "right")}
          >
            Right
          </button>
        </div>
        <div className={styles.container}>
          <div
            className={styles.dropZone}
            style={{ justifyContent: getAlign(align) }}
            ref={dropProvided.innerRef}
          >
            {products.map((product, index) => (
              <Draggable
                key={product.id}
                draggableId={product.id}
                index={index}
              >
                {(dragProvided) => (
                  <Product product={product} provided={dragProvided} />
                )}
              </Draggable>
            ))}
            {dropProvided.placeholder}
          </div>
        </div>
      </>
    );
  };
  const { listId, listType, internalScroll, isCombineEnabled, align, index } =
    props;

  return (
    <Draggable draggableId={listId} index={index}>
      {(provided) => (
        <div
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
        >
          <Droppable
            droppableId={listId}
            type={listType}
            direction='horizontal'
            isCombineEnabled={isCombineEnabled}
          >
            {(dropProvided, dropSnapshot) => (
              <div
                style={getWrapperStyle(dropSnapshot.isDraggingOver, align)}
                {...dropProvided.droppableProps}
              >
                {internalScroll ? (
                  <div className={styles.scrollContainer}>
                    {renderBoard(dropProvided)}
                  </div>
                ) : (
                  renderBoard(dropProvided)
                )}
              </div>
            )}
          </Droppable>
        </div>
      )}
    </Draggable>
  );
}
