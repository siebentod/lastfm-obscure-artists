'use client';

import './index.css';
import LinksIcons from './LinksIcons';
import Display from './Display';
import { useState } from 'react';
import {
  getUnknownToMeArtistsOfUser,
  getObscureArtistsOfUser,
  getArtistsSortedByScrobblesToListenersRatio,
} from './lib';
import Interface from './Interface';

function App() {
  const [userMe, setUserMe] = useState('');
  const [obscureUser, setObscureUser] = useState('activeshooter');
  const [obscurityMeter, setObscurityMeter] = useState(10000);
  const [limit, setLimit] = useState(25);
  const [period, setPeriod] = useState('overall');
  const [operationChosen, setOperationChosen] = useState('3');
  const [data, setData] = useState([]);
  const [status, setStatus] = useState('initial');

  async function getLastFMdata({
    userMe,
    obscureUser,
    obscurityMeter,
    limit,
    operationChosen,
  }) {
    setStatus('loading');
    let data;
    if (operationChosen === '1') {
      data = await getArtistsSortedByScrobblesToListenersRatio({
        user: userMe,
        limit,
        period,
      });
    }
    if (operationChosen === '2') {
      data = await getObscureArtistsOfUser({
        user: obscureUser,
        limit,
        period,
        obscurityMeter,
      });
    }
    if (operationChosen === '3') {
      data = await getUnknownToMeArtistsOfUser({
        obscureUser,
        userMe,
        limit,
        period,
        obscurityMeter,
      });
    }
    console.log(data);
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
        />
        <Display data={data} status={status} />
      </main>
      <LinksIcons color="text-light-bg" noabout />
    </div>
  );
}

export default App;
