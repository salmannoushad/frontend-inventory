import React, { useState, useEffect } from "react";
import {
    DndContext,
    useDroppable,
    useDraggable,
    closestCenter,
} from "@dnd-kit/core";
import axios from "axios";
import { Paper, Typography, Grid } from "@mui/material";

// Draggable Item Component
function DraggableItem({ id, name }) {
    const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
        id,
    });

    const style = {
        transform: transform
            ? `translate3d(${transform.x}px, ${transform.y}px, 0)`
            : undefined,
        padding: "10px",
        margin: "5px 0",
        backgroundColor: "#e3f2fd",
        border: "1px solid #90caf9",
        borderRadius: "8px",
        boxShadow: isDragging ? "0 5px 15px rgba(0,0,0,0.3)" : "none",
        cursor: "move",
        zIndex: isDragging ? 999 : 1,
        opacity: isDragging ? 0.8 : 1,
    };

    return (
        <div ref={setNodeRef} {...listeners} {...attributes} style={style}>
            <Typography variant="body2" color="textSecondary">{name}</Typography>
        </div>
    );
}

// Droppable Category Component
function DroppableCategory({ id, items }) {
    const { setNodeRef } = useDroppable({ id });

    return (
        <Paper ref={setNodeRef} sx={{ p: 2, minHeight: 300, borderRadius: 2, border: "1px solid #ddd" }}>
            <Typography variant="h6" gutterBottom>
                {id}
            </Typography>
            {items.map((item) => (
                <DraggableItem key={`${id}-${item._id}`} id={item._id} name={item.name} />
            ))}
        </Paper>
    );
}

// Main Kanban Board Component
function KanbanBoard({ products }) {
    const [categories, setCategories] = useState({
        Uncategorized: [],
        Category1: [],
        Category2: [],
    });

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/products`);
                const products = response.data;

                const categorizedProducts = {
                    Uncategorized: [],
                    Category1: [],
                    Category2: [],
                };

                products.forEach((product) => {
                    const productId = product._id;
                    const productWithId = { ...product, _id: productId };

                    if (product.category === "Uncategorized") {
                        categorizedProducts.Uncategorized.push(productWithId);
                    } else if (product.category === "Category1") {
                        categorizedProducts.Category1.push(productWithId);
                    } else if (product.category === "Category2") {
                        categorizedProducts.Category2.push(productWithId);
                    }
                });

                setCategories(categorizedProducts);
            } catch (error) {
                console.error("Error fetching products:", error);
            }
        };

        fetchProducts();
    }, [products]);

    const handleDragEnd = async (event) => {
        const { active, over } = event;

        if (!over) return;

        if (active.id === over.id) return;

        const sourceCategory = Object.keys(categories).find((category) =>
            categories[category].some((item) => item._id === active.id)
        );

        const destinationCategory = over.id;

        if (sourceCategory === destinationCategory) return;

        if (sourceCategory && destinationCategory) {
            const sourceItems = [...categories[sourceCategory]];
            const destinationItems = [...categories[destinationCategory]];

            const [movedItem] = sourceItems.splice(
                sourceItems.findIndex((item) => item._id === active.id),
                1
            );

            destinationItems.push(movedItem);

            try {
                await axios.put(`${process.env.REACT_APP_API_BASE_URL}/api/products/${movedItem._id}`, {
                    category: destinationCategory,
                });

                setCategories({
                    ...categories,
                    [sourceCategory]: sourceItems,
                    [destinationCategory]: destinationItems,
                });
            } catch (error) {
                console.error("Error updating product category:", error);
            }
        }
    };

    return (
        <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
            <Grid container spacing={3}>
                {Object.entries(categories).map(([category, items]) => (
                    <Grid item xs={12} sm={6} md={4} key={category}>
                        <DroppableCategory id={category} items={items} />
                    </Grid>
                ))}
            </Grid>
        </DndContext>
    );
}

export default KanbanBoard;
