import { RepoDetail } from "../App";

export default function CardRepo({
  name,
  description,
  html_url,
  stargazers_count,
  forks_count,
  language,
  updated_at,
}: RepoDetail) {
  return (
    <a href={html_url}>
      <div className="rounded-lg p-4 bg-gradient-to-r from-[#111729] to-[#1D1B48] hover:-translate-y-2 hover:shadow-2xl hover:shadow-slate-900">
        <div className="container mx-auto">
          <p className="text-[#CDD5E0] text-ms font-bold">{name}</p>
          <p className="text-[#4A5567] mt-2">
            {description ? description : "No description"}
          </p>
          <div className="pt-4 flex gap-4">
            <div className="flex gap-1">
              <img src="./Chield_alt.svg" alt="" />
              <p className="text-[#CDD5E0]">MIT</p>
            </div>
            <div className="flex gap-1">
              <img src="./Nesting.svg" alt="" />
              <p className="text-[#CDD5E0]">{forks_count}</p>
            </div>
            <div className="flex gap-1">
              <img src="./Star.svg" alt="" />
              <p className="text-[#CDD5E0]">{stargazers_count}</p>
            </div>
            <p className="text-[#CDD5E0] text-xs pt-1">
              updated {updated_at} days ago
            </p>
          </div>
        </div>
      </div>
    </a>
  );
}
