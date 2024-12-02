// import Image from 'next/image';
// import image from '/image.webp';
import { useState } from 'react';
import { capitalizeWords } from './lib';

function Display({ data, status, waitNumber }) {
  const [filterMode, setFilterMode] = useState('');
  const [sortMode, setSortMode] = useState('userPlays');

  if (status === 'loaded' && data && data.length !== 0) {
    data.sort((a, b) => b[sortMode] - a[sortMode]);
  }

  const FilteredByTags = () => {
    // Подсчитываем количество исполнителей для каждого тега
    const tagCounts = data.reduce((acc, item) => {
      item.tags.forEach((tag) => {
        acc[tag] = (acc[tag] || 0) + 1;
      });
      return acc;
    }, {});

    // Фильтруем теги, где исполнителей больше 2
    let filteredTags = Object.keys(tagCounts)
      .filter((tag) => tagCounts[tag] > 1)
      .sort((a, b) => tagCounts[b] - tagCounts[a]);

    if (filteredTags.length > 15) {
      filteredTags = Object.keys(tagCounts)
        .filter((tag) => tagCounts[tag] > 2)
        .sort((a, b) => tagCounts[b] - tagCounts[a]);
    }

    return filteredTags.map((tag, index) => (
      <div key={index}>
        <p className="text-center font-bold mt-2 border border-t-black bg-[hsl(46,63%,97%)]">
          {capitalizeWords(tag)}
        </p>
        <div>
          {data.map((item, index) => (
            <div key={index} className="ml-5">
              {item.tags.includes(tag) ? (
                <>
                  {index + 1}.{' '}
                  <a
                    href={item.url}
                    className="text-[hsl(255,50%,25%)] underline hover:text-[hsl(255,10%,35%)]"
                  >
                    {item.artistName}
                  </a>
                  , {Math.round(item[sortMode])}
                </>
              ) : (
                ''
              )}
            </div>
          ))}
        </div>
      </div>
    ));
  };

  return (
    <div className="bg-light-bg grid min-h-[165px] h-max shadow-md m-3 p-4 rounded-lg max-w-[500px]">
      {status === 'loaded' && (
        <div className="mx-auto">
          <div className="flex items-center relative">
            <button
              className="text-[hsl(46,63%,97%)] rounded-lg py-1 px-2 mr-1 bg-dark-button-default hover:bg-dark-button-hover"
              onClick={() => setFilterMode('filter-by-tags')}
            >
              By tags
            </button>
            <button
              className="text-[hsl(46,63%,97%)] rounded-lg py-1 px-2 bg-dark-button-default hover:bg-dark-button-hover"
              onClick={() => setFilterMode('')}
            >
              Default
            </button>
            <div className="float-right ml-1.5">
              Sort by{' '}
              <select
                className="bg-dark-button-default text-[hsl(46,63%,97%)] pl-1 cursor-help"
                onChange={(e) => setSortMode(e.target.value)}
                value={sortMode}
                title="Ratio = Total Scrobbles / Total Listeners"
              >
                <option value="userPlays">top</option>
                <option value="ratio">ratio</option>
                <option value="listeners">listeners</option>
              </select>
            </div>
          </div>
          <div className="mx-6 mt-1.5">
            {filterMode === '' &&
              data.map((item, index) => (
                <div key={index}>
                  {index + 1}.{' '}
                  <a
                    href={item.url}
                    className="text-[hsl(255,50%,25%)] underline hover:text-[hsl(255,10%,35%)] max-w-[300px] inline-block align-text-bottom text-nowrap white-space-nowrap overflow-hidden text-ellipsis"
                  >
                    {item.artistName}
                  </a>
                  , {Math.round(item[sortMode])}
                </div>
              ))}
            {filterMode === 'filter-by-tags' && <FilteredByTags />}
          </div>
        </div>
      )}

      {status === 'loading' && (
        <>
          <div className="relative h-full flex flex-col items-center justify-center w-[min(360px,85dvw)]">
            <p className="z-10 flex items-center justify-center text-[hsl(255,50%,20%)] font-bold text-2xl mb-0.5">
              Data is loading&nbsp;
              <span className="font-mono font-sans">
                {waitNumber ? ` ${waitNumber}` : ''}
              </span>
            </p>

            <p className="z-10 flex items-center justify-center font-bold text-[hsl(255,50%,20%)] ">
              Please wait
            </p>
            {/* <p className="z-10 flex items-center justify-center text-black">
              For 100 artists it can take up to 30 seconds.
            </p> */}
          </div>
          <div className="bg-light-bg grid h-max mx-3 p-4 rounded-lg max-w-[500px]">
            <div className="mx-auto">
              <div className="mx-6">
                {data?.map((item, index) => (
                  <div key={index}>
                    {index + 1}.{' '}
                    <a
                      href={item.url}
                      className="text-[hsl(255,50%,25%)] underline hover:text-[hsl(255,10%,35%)] max-w-[300px] inline-block align-text-bottom text-nowrap white-space-nowrap overflow-hidden text-ellipsis"
                    >
                      {item.artistName}
                    </a>
                    , {Math.round(item.userPlays)}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </>
      )}

      {status === 'initial' && (
        <div className="h-full flex items-center justify-center w-[min(368px,85dvw)]">
          <p className="mx-3">
            Hello! This is a small utility that compares two Last.FM accounts
            and shows you artists which{' '}
            <span className="text-[hsl(255,50%,25%)] font-semibold">
              you are not familiar with
            </span>{' '}
            (scrobbled less than 10 times) and{' '}
            <span className="text-[hsl(255,50%,25%)] font-semibold">
              {' '}
              have few listeners
            </span>
            .
          </p>
        </div>
      )}

      {status === 'error' && (
        <div className="flex flex-col relative select-none">
          <div className="relative flex items-center justify-center h-full">
            <img src="/image2.webp" className="absolute h-full object-cover" />
          </div>
          <p className="text-2xl text-center mx-5">Error!</p>
        </div>
      )}
    </div>
  );
}

export default Display;
