'use client';

import './index.css';
import LinksIcons from './LinksIcons';
import Display from './Display';
import { useEffect, useState } from 'react';
import {
  getUnknownToMeArtistsOfUser,
  getObscureArtistsOfUser,
  // getArtistsSortedByScrobblesToListenersRatio,
} from './lib';
import Interface from './Interface';

function App() {
  const [abortController, setAbortController] = useState(null);
  const [userMe, setUserMe] = useState('');
  const [obscureUser, setObscureUser] = useState('activeshooter');
  const [obscurityMeter, setObscurityMeter] = useState(10000);
  const [limit, setLimit] = useState(100);
  const [period, setPeriod] = useState('overall');
  const [operationChosen, setOperationChosen] = useState('3');
  const [data, setData] = useState([]);
  const [status, setStatus] = useState('initial');
  const [waitNumber, setWaitNumber] = useState('');

  useEffect(() => {
    if (status === 'stopped' && abortController) {
      abortController.abort();
      setAbortController(null);
    }
  }, [status, abortController]);

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const meParam = searchParams.get('me');
    const userParam = searchParams.get('user');

    if (meParam && userParam) {
      // Set the user values first
      setUserMe(meParam);
      setObscureUser(userParam);

      // Then trigger data fetch
      getLastFMdata({
        userMe: meParam,
        obscureUser: userParam,
        obscurityMeter,
        limit,
        operationChosen,
        status,
        setStatus,
        setData,
        setWaitNumber,
      });
    }
  }, []); // Add dependencies

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

    const controller = new AbortController();
    setAbortController(controller);

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

    try {
      if (operationChosen === '2') {
        data = await getObscureArtistsOfUser({
          user: obscureUser,
          limit,
          period,
          obscurityMeter,
          setData,
          setWaitNumber,
          abortController: controller
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
          abortController: controller
        });
      }
      if (status !== 'stopped') {
        data.length ? setStatus('loaded') : setStatus('error');
        setData(data);
      }
    } catch (error) {
      console.error(error);
      if (error.name === 'AbortError') {
        setStatus('initial');
        setData([]);
      } else {
        setStatus('error');
      }
    } finally {
      setAbortController(null);
    }
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
