import { useEffect, useState } from "react";
import axios from "axios";
import { AgTable } from "@/components/AgTable";
import { AgTableHeader } from "@/components/AgTableHeader";
import styles from "./css/home.module.css";
import global from "./css/global.module.css";

type ArtistData = {
  title: string;
  relaseDate: string;
  rank: number;
};

export const Home = () => {
  const [data, setData] = useState<ArtistData[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const ctl = new AbortController();
    const { signal } = ctl;
    (() => {
      axios
        .get("/api/vibeWeb/musicapiweb/vibe/v1/chart/track/total", { signal })
        .then((res) => res.data.response.result.chart.items.tracks)
        .then((tracks: any[]) => {
          setData(
            tracks.reduce(
              (result: ArtistData[], track: any) =>
                track.artists[0].artistName === "LE SSERAFIM (르세라핌)"
                  ? [
                      ...result,
                      {
                        title: track.album.albumTitle,
                        releaseDate: track.album.releaseDate,
                        rank: track.rank.currentRank,
                      },
                    ]
                  : result,
              []
            )
          );
          setLoading(false);
        });
    })();
    return () => ctl.abort();
  }, []);
  return (
    <div className={styles.main}>
      <div className={styles.greeting}>
        <span>LE SSERAFIM SHOP</span>에 오신 것을 환영합니다!
      </div>
      <div className={global.container}>
        <div>TOP 100 중 LE SSERAFIM 곡 순위</div>
        <div className={styles.table}>
          {loading ? (
            <div>chart loading..</div>
          ) : (
            <AgTable rowData={data}>
              <AgTableHeader
                field="rank"
                order={1}
                flex={2}
                headerName="순위"
              />
              <AgTableHeader
                field="title"
                order={2}
                flex={3}
                headerName="이름"
              />
              <AgTableHeader
                field="releaseDate"
                order={3}
                flex={3}
                headerName="발매일자"
              />
            </AgTable>
          )}
        </div>
      </div>
      <div className={styles.albums}>
        <img
          src="https://sourcemusic.com/resources/discography/cfae49df-6597-465f-b21f-7b7597560ed1.png"
          alt="(KOR) Alt Tag"
        ></img>
        <img
          src="https://sourcemusic.com/resources/discography/c82a4114-7be3-44cd-bb3f-fcec274c018c.png"
          alt="(KOR) Alt Tag"
        ></img>
      </div>
    </div>
  );
};
