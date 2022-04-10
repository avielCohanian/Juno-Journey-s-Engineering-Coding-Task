import React from 'react';
import { useEffect, useState } from 'react/cjs/react.development';
import { fetchImageUrls } from '../api/index';
import { Loading } from './Loading';

export const ImageCarousel = (props) => {
  const [imgs, setImgs] = useState();
  const [page, setPage] = useState(0);

  useEffect(() => {
    getImgs();
  }, []);

  const getImgs = async () => {
    const imgsData = await fetchImageUrls();
    setImgs(imgsData);
  };

  const changeImg = (num) => {
    if (num) {
      setPage((prevPage) => prevPage + 1);
      if (page >= imgs.length) {
        setPage(0);
      }
    } else {
      setPage((prevPage) => prevPage - 1);
      if (page < 0) {
        setPage(imgs.length);
      }
    }
  };

  return (
    <section className="img-carousel">
      <ul className="clean-list">
        {imgs &&
          imgs.length &&
          imgs.map((img, idx) =>
            idx === page ? (
              <li key={idx}>
                <img src={img}></img>
              </li>
            ) : null
          )}
        <div>
          <span onClick={() => changeImg(0)} className="fas fa-chevron-left btn">
            left
          </span>
          <span onClick={() => changeImg(1)} className="fas fa-chevron-right btn">
            right
          </span>
        </div>

        <div className="proj-idx">
          {imgs &&
            imgs.length &&
            imgs.map((img, idxTitle) => (
              <span
                key={idxTitle}
                style={{ backgroundColor: idxTitle - 1 === page ? '#ff00005c' : '#9e9e9e6b' }}
                onClick={() => setPage(idxTitle - 1)}
              ></span>
            ))}
        </div>
      </ul>
    </section>
  );
};
