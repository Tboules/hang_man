import { PropsWithChildren } from "react";

export default function Layout({ children }: PropsWithChildren) {
  return (
    <div className="gap-4 flex w-full justify-center items-center flex-col p-10 max-w-screen-lg m-auto">
      {children}
    </div>
  );
}
