import styles from './css/home.module.css';

export const Home = () => {
  return (
    <div className={styles.main}>
      <div className={styles.greeting}>
        <span>LE SSERAFIM SHOP</span>에 오신 것을 환영합니다!
      </div>
      <div className={styles.albums}>
        <img
          src='https://sourcemusic.com/resources/discography/cfae49df-6597-465f-b21f-7b7597560ed1.png'
          alt='(KOR) Alt Tag'
        ></img>
        <img
          src='https://sourcemusic.com/resources/discography/c82a4114-7be3-44cd-bb3f-fcec274c018c.png'
          alt='(KOR) Alt Tag'
        ></img>
      </div>
    </div>
  );
};
