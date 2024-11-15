export default function HeaderDetailPage({ title, description }) {
  return (
    <div className="mt-2 bg-white rounded p-6 flex flex-col justify-center items-center gap-1">
      <h1 className="text-2xl font-semibold text-center">{title}</h1>
      {description ? (
        <h3 className="text-base text-center mt-3">{description}</h3>
      ) : null}
    </div>
  );
}
