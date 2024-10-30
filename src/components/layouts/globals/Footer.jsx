import { Icon } from "@iconify/react";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="-m-2 bg-[#333333] text-white py-8 px-5">
      <div className="flex gap-2">
        <Image
          src="/logo-unhas.png"
          alt="MKU Unhas"
          width={200}
          height={200}
          className="w-9"
        />
        <div>
          <h1 className="font-semibold text-sm">UPT Mata Kuliah Umum</h1>
          <h2 className="text-xs">Universitas Hasanuddin</h2>
        </div>
      </div>

      <div className="mt-10 text-sm flex items-start">
        <div className="w-1/2 flex flex-col gap-1">
          <h4 className="font-semibold mb-1">TENTANG KAMI</h4>
          <p>Latar Belakang</p>
          <p>Visi Misi</p>
          <p>Tujuan</p>
          <p>Staf Akademik</p>
        </div>
        {/*  */}
        <div className="w-1/2 flex flex-col gap-1">
          <h4 className="font-semibold mb-1">MATA KULIAH UMUM</h4>
          <p>Humaniora</p>
          <p>Saintek</p>
        </div>
      </div>

      <div className="mt-10 flex flex-col gap-1">
        <h4 className="font-semibold mb-1">INFORMASI</h4>
        <p>Peta MKU</p>
        <p>Berita</p>
      </div>

      <div className="mt-10 text-sm">
        <h4 className="font-semibold mb-1">KAMPUS</h4>
        <p>
          Jl. Samadi No.1 Kelurahan Jawa Kecamatan Martapura Kota Kab.Banjar -
          Kalimantan Selatan <br />
          Telp/Fax : 0511-4721812
        </p>
      </div>

      <div className="mt-10 text-sm">
        <h4 className="font-semibold mb-1">TEMUKAN KAMI</h4>
        <div className="mt-2 flex items-center gap-1">
          <Icon icon="iconoir:instagram" className="text-2xl" />
          <Icon icon="iconoir:facebook" className="text-2xl" />
          <Icon icon="iconoir:youtube" className="text-3xl" />
        </div>
      </div>
    </footer>
  );
}
