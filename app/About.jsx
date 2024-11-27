import LinksIcons from './LinksIcons';

function About() {
  return (
    <>
      <div className="flex flex-col justify-center items-center h-[100dvh]">
        <div className="grid max-w-screen-sm shadow-md m-3 py-7 px-10 rounded-lg bg-light-bg">
          Сравнение стоимости акции (или другого тикера: облигации, фонда) между
          двумя датами + разница индекса между теми же датами.
        </div>
      </div>
      <LinksIcons noabout home color="text-light-bg" />
    </>
  );
}

export default About;
