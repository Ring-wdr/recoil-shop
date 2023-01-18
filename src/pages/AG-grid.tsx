import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import { AgTable } from '@/components/AgTable';
import { AgTableHeader } from 'components/AgTableHeader';
import axios from 'axios';
import { useEffect, useState } from 'react';
import styles from './css/global.module.css';

type ArtistData = {
  title: string;
  relaseDate: string;
  rank: number;
};

export const AgGrid = () => {
  const [data, setData] = useState<ArtistData[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const ctl = new AbortController();
    const { signal } = ctl;
    (() => {
      axios
        .get('/api/vibeWeb/musicapiweb/vibe/v1/chart/track/total', { signal })
        .then((res) => res.data.response.result.chart.items.tracks)
        .then((tracks: any[]) => {
          setData(
            tracks.reduce(
              (result: ArtistData[], track: any) =>
                track.artists[0].artistName === 'LE SSERAFIM (르세라핌)'
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
    <div className={styles.container}>
      <div>TOP 100 중 LE SSERAFIM 곡 순위</div>
      <div
        style={{
          height: 400,
          width: 900,
          marginTop: '1rem',
        }}
      >
        {loading ? null : (
          <AgTable rowData={data}>
            <AgTableHeader field='rank' order={1} flex={1} headerName='순위' />
            <AgTableHeader field='title' order={2} flex={2} headerName='이름' />
            <AgTableHeader
              field='releaseDate'
              order={3}
              flex={2}
              headerName='발매일자'
            />
          </AgTable>
        )}
      </div>
    </div>
  );
};
