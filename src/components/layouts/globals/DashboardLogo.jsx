import Image from "next/image";

export default function DashboardLogo() {
  return (
    <div>
      <div className="flex items-center">
        <Image
          src="/logo-unhas.png"
          alt="Unhas"
          width={500}
          height={500}
          className="w-9"
        />
        <h1 className="ms-2 text-2xl font-serif font-bold">Mata Kuliah Umum</h1>
      </div>
      <h2 className="font-sans font-semibold mt-2 uppercase">
        Universitas Hasanuddin
      </h2>
    </div>
  );
}
