export default function ProfileDetail({
  desc,
  value,
}: {
  desc: string;
  value: number | string;
}) {
  return (
    <div className="bg-[#111729] inline-flex p-1.5 rounded-lg">
      <p className=" border-r border-[#4A5567] px-4 py-1 text-[#4A5567] font-medium">
        {desc}
      </p>
      <p className="px-4 py-1 text-[#CDD5E0]">{value}</p>
    </div>
  );
}
