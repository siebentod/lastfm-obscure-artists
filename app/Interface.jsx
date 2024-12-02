function Interface({
  userMe,
  setUserMe,
  obscureUser,
  setObscureUser,
  obscurityMeter,
  setObscurityMeter,
  limit,
  period,
  setPeriod,
  setLimit,
  operationChosen,
  setOperationChosen,
  getLastFMdata,
  setStatus,
  status,
  setData,
  setWaitNumber,
}) {
  return (
    <div className="bg-light-bg border border-[#4f0000] grid m-3 p-4 shadow-md rounded-lg xs:w-[400px] w-[350px] h-max">
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          await getLastFMdata({
            userMe,
            obscureUser,
            obscurityMeter,
            limit,
            operationChosen,
            setStatus,
            status,
            setData,
            setWaitNumber,
          });
        }}
      >
        <div className="my-1 grid grid-cols-[max-content_auto] justify-center text-right">
          {operationChosen === '1' || operationChosen === '2' ? (
            <>
              <p className="mx-1 my-0.5 text-[15px]">Username</p>
              <input
                type="text"
                className="bg-light-input border border-light-bg pl-1"
                value={obscureUser}
                onChange={(e) => {
                  setObscureUser(e.target.value);
                }}
                required
              ></input>
            </>
          ) : (
            <>
              <p className="mx-1 my-0.5 text-[15px]">My username</p>
              <input
                type="text"
                className="bg-light-input border border-light-bg pl-1"
                value={userMe}
                onChange={(e) => {
                  setUserMe(e.target.value);
                }}
                required
              ></input>
              <p className="mx-1 my-0.5 text-[15px]">Trve User name</p>
              <input
                type="text"
                className="bg-light-input border border-light-bg pl-1"
                value={obscureUser}
                onChange={(e) => {
                  setObscureUser(e.target.value);
                }}
                required
              ></input>
            </>
          )}
          <div className="mt-4"></div>
          <div className="mt-4"></div>
          <p className="mx-1 my-0.5 text-[15px]">Operation type</p>
          <select
            className="bg-light-input border border-light-bg pl-1 w-full overflow-ellipsis"
            onChange={(e) => setOperationChosen(e.target.value)}
            value={operationChosen}
          >
            {/* <option value="1">
              Get artists, sorted by Total Scrobbles to Total Listeners ratio
            </option> */}
            <option value="2">Get obscure artists</option>
            <option value="3">Get unknown to me obscure artists</option>
          </select>
          <p className="mx-1 my-0.5 text-[15px]">Top ... artists</p>
          <select
            className="bg-light-input border border-light-bg pl-1 w-full overflow-ellipsis"
            value={limit}
            onChange={(e) => {
              setLimit(e.target.value);
            }}
          >
            <option value="25">From Top 25 Artists</option>
            <option value="50">From Top 50 Artists</option>
            <option value="100">From Top 100 Artists</option>
            <option value="150">From Top 150 Artists</option>
            <option value="200">From Top 200 Artists</option>
            <option value="250">From Top 250 Artists</option>
          </select>
          <p className="mx-1 my-0.5 text-[15px]">Period</p>
          <select
            className="bg-light-input border border-light-bg pl-1 w-full overflow-ellipsis"
            value={period}
            onChange={(e) => {
              setPeriod(e.target.value);
            }}
          >
            <option value="overall">Overall</option>
            <option value="12month">Last Year</option>
          </select>
          <div className="mt-4"></div>
          <div className="mt-4"></div>
          <p className="mx-1 my-0.5 text-[15px]">Obscurity threshold</p>
          <input
            type="text"
            className="bg-light-input border border-light-bg pl-1"
            value={obscurityMeter}
            onChange={(e) => {
              if (!isNaN(Number(e.target.value))) {
                setObscurityMeter(Number(e.target.value));
              } else {
                setObscurityMeter(''); // или любое другое значение по умолчанию
              }
            }}
            required
          ></input>
        </div>

        {/* <p className="text-[0.938rem] text-center">
            Введите месяц (2022-05) или день (2022-05-05)
          </p> */}

        <button
          className="text-[hsl(46,63%,97%)] bg-dark-button-default hover:bg-dark-button-hover block m-auto mt-2.5 py-2.5 px-5 rounded-lg transition shadow text-[1rem] disabled:cursor-not-allowed disabled:hover:bg-dark-button-default"
          disabled={status === 'loading'}
        >
          Get Data
        </button>
      </form>
    </div>
  );
}

export default Interface;
