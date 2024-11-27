import { Icon } from "@iconify/react";

const mainNavItems = [
  {
    href: "/dashboard",
    label: "Beranda",
    icon: <Icon icon="uil:home-alt" className="text-2xl" />,
  },
];

const informationNavItems = [
  {
    href: "/dashboard/informasi/peta-mku",
    label: "Peta MKU",
    icon: <Icon icon="material-symbols:map-outline" className="text-2xl" />,
  },
  {
    href: "/dashboard/informasi/berita",
    label: "Berita",
    icon: <Icon icon="iconamoon:news-light" className="text-2xl" />,
  },
];

const aboutNavItems = [
  {
    href: "/dashboard/tentang/profil",
    label: "Profil",
    icon: <Icon icon="iconamoon:profile-light" className="text-2xl" />,
  },
  {
    href: "/dashboard/tentang/pegawai",
    label: "Pegawai",
    icon: <Icon icon="clarity:employee-group-line" className="text-2xl" />,
  },
];

const subjectNavItems = [
  {
    href: "/dashboard/mata-kuliah",
    label: "Mata Kuliah",
    icon: <Icon icon="nimbus:university" className="text-2xl" />,
  },
];

const workProgramNavItems = [
  {
    href: "/dashboard/program-kerja",
    label: "Program Kerja",
    icon: <Icon icon="mdi:work-outline" className="text-2xl" />,
  },
];

const facilityNavItems = [
  {
    href: "/dashboard/sarana-dan-prasarana",
    label: "Sarana & Prasarana",
    icon: <Icon icon="carbon:building" className="text-2xl" />,
  },
];

export const AdminNav = [
  {
    title: "UTAMA",
    items: mainNavItems,
  },
  {
    title: "INFORMASI",
    items: informationNavItems,
  },
  {
    title: "TENTANG",
    items: aboutNavItems,
  },
  {
    title: "MATA KULIAH",
    items: subjectNavItems,
  },
  {
    title: "PROGRAM KERJA",
    items: workProgramNavItems,
  },
  {
    title: "SARANA & PRASARANA",
    items: facilityNavItems,
  },
];
