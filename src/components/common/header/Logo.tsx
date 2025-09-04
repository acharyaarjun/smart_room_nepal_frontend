import Image from "next/image";

interface Props {
  appName: string;
}

export default function Logo({ appName }: Props) {
  return (
    <div className="flex justify-between items-center w-full md:w-auto">
      <Image
        src="/long-logo.png"
        alt="Logo"
        width={400}
        height={400}
        className="h-[55px] w-auto"
        title={appName}
      />
    </div>
  );
}
