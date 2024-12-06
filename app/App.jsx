'use client';

import './index.css';
import LinksIcons from './LinksIcons';
import Display from './Display';
import { useState } from 'react';
import {
  getUnknownToMeArtistsOfUser,
  getObscureArtistsOfUser,
  // getArtistsSortedByScrobblesToListenersRatio,
} from './lib';
import Interface from './Interface';

function App() {
  const [userMe, setUserMe] = useState('');
  const [obscureUser, setObscureUser] = useState('activeshooter');
  const [obscurityMeter, setObscurityMeter] = useState(10000);
  const [limit, setLimit] = useState(50);
  const [period, setPeriod] = useState('overall');
  const [operationChosen, setOperationChosen] = useState('3');
  const [data, setData] = useState([]);
  const [status, setStatus] = useState('initial');
  const [waitNumber, setWaitNumber] = useState('');

  async function getLastFMdata({
    userMe,
    obscureUser,
    obscurityMeter,
    limit,
    operationChosen,
    status,
    setStatus,
    setData,
    setWaitNumber,
  }) {
    if (status === 'loading') return;
    setStatus('loading');
    setData([]);
    setWaitNumber('');
    let data;
    // if (operationChosen === '1') {
    //   data = await getArtistsSortedByScrobblesToListenersRatio({
    //     user: userMe,
    //     limit,
    //     period,
    //   });
    // }
    if (operationChosen === '2') {
      data = await getObscureArtistsOfUser({
        user: obscureUser,
        limit,
        period,
        obscurityMeter,
        setData,
        setWaitNumber,
      });
    }
    if (operationChosen === '3') {
      data = await getUnknownToMeArtistsOfUser({
        obscureUser,
        userMe,
        limit,
        period,
        obscurityMeter,
        setData,
        setWaitNumber,
      });
    }
    data.length ? setStatus('loaded') : setStatus('error');
    setData(data);
  }

  return (
    <div className="pt-12">
      <main className="mx-auto relative flex flex-wrap justify-center">
        <Interface
          userMe={userMe}
          setUserMe={setUserMe}
          obscureUser={obscureUser}
          setObscureUser={setObscureUser}
          obscurityMeter={obscurityMeter}
          setObscurityMeter={setObscurityMeter}
          limit={limit}
          period={period}
          setPeriod={setPeriod}
          setLimit={setLimit}
          operationChosen={operationChosen}
          setOperationChosen={setOperationChosen}
          getLastFMdata={getLastFMdata}
          status={status}
          setStatus={setStatus}
          setData={setData}
          setWaitNumber={setWaitNumber}
        />
        <Display data={data} status={status} waitNumber={waitNumber} />
      </main>
      <LinksIcons color="text-light-bg" noabout />
    </div>
  );
}

export default App;
