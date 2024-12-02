// # Final Functions

export async function getUnknownToMeArtistsOfUser({
  obscureUser,
  userMe,
  limit,
  period,
  obscurityMeter,
  setData,
  setWaitNumber,
}) {
  let data = [];
  const artists = await getTopArtists({ user: obscureUser, limit, period });
  const artistsTest = await getTopArtists({ user: userMe });
  if (!artists || !artistsTest) return data;

  let artistsData = [];

  for (let i = 0; i < artists.length; i++) {
    setWaitNumber(`${(i + 1).toString().padStart(2, '0')}/${artists.length}`);
    // const artistName = handleName(artists[i]?.name);
    const artistName = artists[i]?.name;
    const artistData = await getArtistData(artistName, userMe);
    if (
      artistData.artist?.stats?.userplaycount < 10 &&
      artistData.artist?.stats?.listeners < obscurityMeter
    ) {
      artistsData.push({
        ...artistData,
        userPlays: artists[i]?.playcount,
        artistName,
      });
      setData((prev) => [
        ...prev,
        {
          userPlays: artists[i]?.playcount,
          artistName,
          url: artistData.artist?.url,
        },
      ]);
    }
  }

  artistsData.sort(
    (a, b) =>
      b.artist?.stats?.playcount / b.artist?.stats?.listeners -
      a.artist?.stats?.playcount / a.artist?.stats?.listeners
  );

  let allTags = [];
  for (let i = 0; i < artistsData.length; i++) {
    const artistTags = [];
    for (let j = 0; j < artistsData[i].artist?.tags?.tag?.length; j++) {
      allTags.push(artistsData[i].artist?.tags.tag[j]?.name);
      artistTags.push(artistsData[i].artist?.tags.tag[j]?.name);
    }
    data.push({
      userPlays: artistsData[i].userPlays,
      myPlays: artistsData[i].artist?.stats?.userplaycount,
      artistName: artistsData[i].artistName,
      url: artistsData[i].artist?.url,
      listeners: artistsData[i].artist?.stats?.listeners,
      ratio:
        artistsData[i].artist?.stats?.playcount /
        artistsData[i].artist?.stats?.listeners,
      tags: artistTags,
    });
  }
  const frequencyMap = allTags.reduce((acc, tag) => {
    acc[tag] = (acc[tag] || 0) + 1;
    return acc;
  }, {});
  const sortedTags = Object.entries(frequencyMap)
    .sort((a, b) => b[1] - a[1]) // Сортировка по частоте (в порядке убывания)
    .map(([tag]) => tag);

  data.tags = sortedTags;
  return data;
}

export async function getObscureArtistsOfUser({
  user,
  limit,
  period,
  obscurityMeter,
  setData,
  setWaitNumber,
}) {
  let data = [];
  const artists = await getTopArtists({ user, limit, period });
  if (!artists) return data;

  let artistsData = [];
  for (let i = 0; i < artists.length; i++) {
    setWaitNumber(`${(i + 1).toString().padStart(2, '0')}/${artists.length}`);
    // const artistName = handleName(artists[i]?.name);
    const artistName = artists[i]?.name;
    const artistData = await getArtistData(artistName);
    console.log(artistName, artistData);
    if (artistData.artist?.stats?.listeners < obscurityMeter) {
      artistsData.push({
        ...artistData,
        userPlays: artists[i]?.playcount,
        artistName,
      });
      setData((prev) => [
        ...prev,
        {
          userPlays: artists[i]?.playcount,
          artistName,
          url: artistData.artist?.url,
        },
      ]);
    }
  }

  artistsData.sort(
    (a, b) =>
      b.artist?.stats?.playcount / b.artist?.stats?.listeners -
      a.artist?.stats?.playcount / a.artist?.stats?.listeners
  );

  let allTags = [];
  for (let i = 0; i < artistsData.length; i++) {
    const artistTags = [];
    for (let j = 0; j < artistsData[i].artist?.tags?.tag?.length; j++) {
      allTags.push(artistsData[i].artist?.tags.tag[j]?.name);
      artistTags.push(artistsData[i].artist?.tags.tag[j]?.name);
    }
    data.push({
      userPlays: artistsData[i].userPlays,
      myPlays: artistsData[i].artist?.stats?.userplaycount,
      artistName: artistsData[i].artistName,
      url: artistsData[i].artist?.url,
      listeners: artistsData[i].artist?.stats?.listeners,
      ratio:
        artistsData[i].artist?.stats?.playcount /
        artistsData[i].artist?.stats?.listeners,
      tags: artistTags,
    });
  }

  const frequencyMap = allTags.reduce((acc, tag) => {
    acc[tag] = (acc[tag] || 0) + 1;
    return acc;
  }, {});
  const sortedTags = Object.entries(frequencyMap)
    .sort((a, b) => b[1] - a[1]) // Сортировка по частоте (в порядке убывания)
    .map(([tag]) => tag);

  data.tags = sortedTags;
  return data;
}

// export async function getArtistsSortedByScrobblesToListenersRatio({
//   user,
//   limit,
//   period,
// }) {
//   let data = [];
//   const artists = await getTopArtists({ user, limit, period });
//   let artistsData = [];

//   for (let i = 0; i < artists.length; i++) {
//     // const artistName = handleName(artists[i]?.name);
//     const artistName = artists[i]?.name;
//     const artistData = await getArtistData(artistName);
//     artistsData.push({
//       ...artistData,
//       userPlays: artists[i]?.playcount,
//     });
//   }

//   artistsData.sort(
//     (a, b) =>
//       b.artist?.stats?.playcount / b.artist?.stats?.listeners -
//       a.artist?.stats?.playcount / a.artist?.stats?.listeners
//   );

//   for (let i = 0; i < artistsData.length; i++) {
//     data.push({
//       userPlays: artistsData[i].userPlays,
//       artistName: artistsData[i].artist?.name,
//       listeners: artistsData[i].artist?.stats?.listeners,
//       ratio:
//         artistsData[i].artist?.stats?.playcount /
//         artistsData[i].artist?.stats?.listeners,
//     });
//   }

//   return data;
// }

// # Complementary Functions
async function getLastFM(method, param) {
  const url = `/api/?url=?method=${method}&${param}`;
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching data:', error);
    return null;
  }
}

async function getTopArtists({ user, limit, period }) {
  const artists = await getLastFM(
    'user.getTopArtists',
    `user=${user}${limit ? `&limit=${limit}` : ''}${
      period ? `&period=${period}` : ''
    }`
  );
  //   console.log(artists.topartists.artist.length);
  return artists?.topartists?.artist;
}

async function getArtistData(artist, userMe) {
  artist = encodeURIComponent(artist);
  artist = encodeURIComponent(artist);
  return await getLastFM(
    'artist.getInfo',
    `artist=${artist}${userMe ? `&username=${userMe}` : ''}`
  );
}

export function capitalizeWords(text) {
  return text
    .split(' ')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

// function handleName(str) {
//   return str.replace(/ /g, '+');
// }
