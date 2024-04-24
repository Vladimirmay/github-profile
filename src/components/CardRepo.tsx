import { RepoDetail } from "../App";
import { formatDistanceToNow } from "date-fns";

export default function CardRepo({
  name,
  description,
  html_url,
  stargazers_count,
  forks_count,
  updated_at,
  license,
}: RepoDetail) {
  if (
    typeof updated_at !== "string" ||
    !/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}Z$/.test(updated_at)
  ) {
    console.error("Invalid updated_at value:", updated_at);
    return null;
  }

  const inputDate = new Date(updated_at);
  if (isNaN(inputDate.getTime())) {
    console.error("Invalid input date:", inputDate);
    return null;
  }

  const timeToUpdate = formatDistanceToNow(inputDate, { addSuffix: true });
  // const timeToUpdate = formatDistanceToNow(new Date(updated_at), {
  //   addSuffix: true,
  // });
  return (
    <a href={html_url}>
      <div className="rounded-lg p-4 bg-gradient-to-r from-[#111729] to-[#1D1B48] hover:-translate-y-2 hover:shadow-2xl hover:shadow-slate-900">
        <div className="container mx-auto">
          <p className="text-[#CDD5E0] text-ms font-bold">{name}</p>
          <p className="text-[#4A5567] mt-2">
            {description ? description : "No description"}
          </p>
          <div className="pt-4 flex gap-4">
            {license && (
              <div className="flex gap-1">
                <img src="./Chield_alt.svg" alt="" />
                <p className="text-[#CDD5E0]">MIT</p>
              </div>
            )}
            <div className="flex gap-1">
              <img src="./Nesting.svg" alt="" />
              <p className="text-[#CDD5E0]">{forks_count}</p>
            </div>
            <div className="flex gap-1">
              <img src="./Star.svg" alt="" />
              <p className="text-[#CDD5E0]">{stargazers_count}</p>
            </div>
            <p className="text-[#CDD5E0] text-xs pt-1">
              updated {timeToUpdate} days ago
            </p>
          </div>
        </div>
      </div>
    </a>
  );
}
