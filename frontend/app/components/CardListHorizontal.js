"use client";
import MediaCard from "./MediaCard";
import styles from "./styles/CardListHorizontal.module.css";
import { useRef, useState, useEffect } from "react";

export default function CardListHorizontal({ items = [] }) {
  const listRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  // Mouse Events
  const handleMouseDown = (e) => {
    setIsDragging(true);
    setStartX(e.pageX - listRef.current.offsetLeft);
    setScrollLeft(listRef.current.scrollLeft);
  };

  const handleMouseLeave = () => setIsDragging(false);
  const handleMouseUp = () => setIsDragging(false);

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const moveX = e.pageX - listRef.current.offsetLeft;
    const move = (moveX - startX) * 2;
    listRef.current.scrollLeft = scrollLeft - move;
  };

  // Touch Events
  const handleTouchStart = (e) => {
    setIsDragging(true);
    const touch = e.touches[0];
    setStartX(touch.pageX - listRef.current.offsetLeft);
    setScrollLeft(listRef.current.scrollLeft);
  };

  const handleTouchEnd = () => setIsDragging(false);

  const handleTouchMove = (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const touch = e.touches[0];
    const moveX = touch.pageX - listRef.current.offsetLeft;
    const move = (moveX - startX) * 2;
    listRef.current.scrollLeft = scrollLeft - move;
  };

  // ✅ Wheel Scroll Events (prevent vertical scroll)
  useEffect(() => {
    const list = listRef.current;
    const handleWheel = (e) => {
      if (!list) return;
      e.preventDefault();
      list.scrollLeft += e.deltaY;
    };

    if (list) {
      list.addEventListener("wheel", handleWheel, { passive: false });
    }

    return () => {
      if (list) {
        list.removeEventListener("wheel", handleWheel);
      }
    };
  }, []);

  return (
    <div
      ref={listRef}
      className={styles.cardListContainer}
      onMouseDown={handleMouseDown}
      onMouseLeave={handleMouseLeave}
      onMouseUp={handleMouseUp}
      onMouseMove={handleMouseMove}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      onTouchMove={handleTouchMove}
    >
      {items.map((item, index) => (
        <MediaCard key={index} {...item} />
      ))}
    </div>
  );
}
