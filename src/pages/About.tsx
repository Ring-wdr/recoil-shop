import styles from './css/about.module.css';

export const About = () => {
  return (
    <div className={styles.about}>
      <div className={styles.item}>
        <img
          src='https://weverse-phinf.pstatic.net/MjAyMjEyMzBfMjkx/MDAxNjcyMzcwMTkzOTc4.ldo5L3ynuiTGMGUEI6HNJNzg7xCU_chUqZr6tqH1oAAg.Wn3pz1GY9a1g92Mjiave9k2hztPqjYmSdKzQUs-MSr0g.JPEG/EBA5B4EC84B8EB9DBCED958C20EAB3B5EC8B9D20EC8389EC838120EC9DB4EBAFB8ECA780.jpg?type=w1414'
          alt=''
          width={400}
          height={200}
        />
        LE SSERAFIM FAN GOODS 거래를 희망하는 사이트입니다.
        <br />
        <br />
        사이트 관리자는 공식 1기 FEARNOT로 PJT POCAZ를 진행하면서
        <br />
        LE SSERAFIM의 팬이 되었으며 현재 FE 직무로 근무 중입니다.
      </div>
    </div>
  );
};
