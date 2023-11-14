export default function Person() {
  return (
    <div className="relative">
      <Head />
      <Body />
      <Arm side="left" />
      <Arm side="right" />
    </div>
  );
}

function Head() {
  return (
    <>
      <div className="h-14 w-14 bg-black rounded-full relative after:absolute after:bg-white after:top-2 after:right-2 after:h-10 after:w-10 after:rounded-full" />
    </>
  );
}

function Body() {
  return (
    <>
      <div className="h-24 w-2 bg-black absolute left-6" />
    </>
  );
}

interface IBodySideProps {
  side: "left" | "right";
}

function Arm({ side }: IBodySideProps) {
  console.log(side);
  return (
    <>
      <div />
    </>
  );
}
