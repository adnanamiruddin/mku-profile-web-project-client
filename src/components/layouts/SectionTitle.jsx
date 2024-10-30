export default function SectionTitle({ title }) {
  return (
    <div className="mt-6 bg-white rounded py-2 px-3">
      <h1 className="text-sm font-semibold flex items-center gap-2">
        <span className="bg-[#942828] p-1.5 rounded-full"></span> {title}
      </h1>
    </div>
  );
}
