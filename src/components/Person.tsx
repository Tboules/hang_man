import { PropsWithChildren } from "react";

interface IPersonProps {
  stage: number;
}

export default function Person({ stage }: IPersonProps) {
  return (
    <Gallow>
      <div className="absolute top-16 right-[-60px]">
        <div className="relative flex flex-col items-center w-32">
          {stage > 0 && <Head />}
          {stage > 1 && <Body />}
          {stage > 2 && <Arm bodyPart={{ type: "arm", side: "right" }} />}
          {stage > 3 && <Arm bodyPart={{ type: "arm", side: "left" }} />}

          <div className="flex">
            <Leg
              styles={stage > 4 ? "" : "invisible"}
              bodyPart={{ type: "leg", side: "left" }}
            />
            <Leg
              styles={stage > 5 ? "" : "invisible"}
              bodyPart={{ type: "leg", side: "right" }}
            />
          </div>
        </div>
      </div>
    </Gallow>
  );
}

function Gallow({ children }: PropsWithChildren) {
  return (
    <div className="p-4">
      <div className="relative before:absolute before:w-72 before:h-2 before:bottom-0 before:right-16 before:bg-black after:w-2 after:h-16 after:bg-black after:absolute after:right-0 after:top-0 w-64 h-96 border-t-8 border-l-8 border-black">
        {children}
      </div>
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
      <div className="h-24 w-2 bg-black" />
    </>
  );
}

interface IBodyPart {
  side: "left" | "right";
  type: "arm" | "leg";
}

function determineStylesBasedOnBodyPart(bodyPart: IBodyPart): string {
  const { side, type } = bodyPart;
  if (type == "arm") {
    if (side == "right") {
      return "right-5 rotate-[335deg]";
    }

    if (side == "left") {
      return "left-5 rotate-[25deg]";
    }
  }

  if (type == "leg") {
    if (side == "left") {
      return "rotate-[25deg] -translate-x-2";
    }

    if (side == "right") {
      return "rotate-[335deg] translate-x-2";
    }
  }

  return "";
}

function Arm({ bodyPart }: { bodyPart: IBodyPart }) {
  return (
    <>
      <div
        className={`w-12 h-2 bg-black absolute top-20 ${determineStylesBasedOnBodyPart(
          bodyPart
        )}`}
      />
    </>
  );
}

function Leg({ bodyPart, styles }: { bodyPart: IBodyPart; styles: string }) {
  return (
    <>
      <div
        className={`h-14 w-2 bg-black -translate-y-2 ${determineStylesBasedOnBodyPart(
          bodyPart
        )} ${styles}`}
      />
    </>
  );
}
