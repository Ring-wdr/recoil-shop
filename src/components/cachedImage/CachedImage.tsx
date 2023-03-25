import { useState, useEffect, ImgHTMLAttributes } from "react";

export const CachedImage = ({
  src = "",
  ...props
}: ImgHTMLAttributes<HTMLImageElement>) => {
  const [image, setImage] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      const imageCache = await caches.open("image-cache");
      const cachedResponse = await imageCache.match(src);
      if (cachedResponse) {
        setImage(cachedResponse.url);
      } else {
        const response = await fetch(src);
        if (response.ok) {
          await imageCache.put(src, response.clone());
          setImage(response.url);
        }
      }
    })();
  }, [src]);

  return <>{image && <img src={image} {...props} />}</>;
};
