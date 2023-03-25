import { CachedImage } from "@/components/cachedImage";
import { useEffect, useRef, useState } from "react";
import styles from "./css/swipe.module.css";

const imgSwipeArr = [
  "/resources/artist/fc8bad3b-d097-4cc9-bce5-d5c026d42c6f.jpg",
  "/resources/artist/8a791820-d707-4679-8ef1-2e0485800289.jpg",
  "/resources/artist/61af4ae2-9739-4e5e-a672-9c60a97c17cb.jpg",
  "/resources/artist/aa52511a-c39c-427b-8c3f-64f57020b27d.jpg",
  "/resources/artist/b44aebd9-f5f0-49a8-89a1-65e730109285.jpg",
];

export const Swipe = () => {
  const imgRef = useRef<HTMLUListElement>(null);
  const [page, setPage] = useState(0);

  const prevPage = () =>
    setPage((prev) =>
      prev > 0
        ? (imgRef.current?.scroll({
            left: 400 * (prev - 1),
            behavior: "smooth",
          }),
          prev - 1)
        : prev
    );

  const nextPage = () =>
    setPage((prev) =>
      prev < 4
        ? (imgRef.current?.scroll({
            left: 400 * (prev + 1),
            behavior: "smooth",
          }),
          prev + 1)
        : prev
    );

  useEffect(() => {
    const timer = setInterval(() => {
      setPage((prev) =>
        prev < 4
          ? (imgRef.current?.scroll({
              left: 400 * (prev + 1),
              behavior: "smooth",
            }),
            prev + 1)
          : (imgRef.current?.scroll({ left: 0 }), 0)
      );
    }, 2000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.center}>
        <button onClick={prevPage}>&lt;</button>
        <ul className={styles.swiper} ref={imgRef}>
          {imgSwipeArr.map((src, index) => (
            <li key={src}>
              <CachedImage
                src={src}
                alt={`${index}`}
                width={400}
                height={500}
              />
            </li>
          ))}
        </ul>
        <button onClick={nextPage}>&gt;</button>
      </div>
      {page + 1} / 5
    </div>
  );
};
