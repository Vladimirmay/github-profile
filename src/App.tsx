import { useEffect, useState } from "react";
import ProfileDetail from "./components/ProfileDetail";
import CardRepo from "./components/CardRepo";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
} from "@clerk/clerk-react";

export interface RepoDetail {
  id: number;
  name: string;
  description: string;
  html_url: string;
  stargazers_count: number;
  forks_count: number;
  language: string;
  updated_at: string;
  license: {
    key: string;
    name: string;
  } | null;
}

interface UserDetail {
  id: number;
  login: string;
  avatar_url: string;
  name: string;
  bio: string;
  public_repos: number;
  followers: number;
  following: number;
  location: string;
}

function App() {
  const [dataFetch, setDataFetch] = useState<UserDetail | null>(null);
  const [repoList, setRepoList] = useState<RepoDetail[]>([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  useEffect(() => {
    try {
      const fetchDataRepo = async () => {
        const response = await fetch(
          `https://api.github.com/users/${search}/repos?page=${page}&per_page=4`
        );
        const data = await response.json();
        if (Array.isArray(data)) {
          setRepoList((prevRepoList) => [...prevRepoList, ...data]);
        } else {
          setRepoList((prevRepoList) => [...prevRepoList, data]);
        }
        console.log(data);
      };
      fetchDataRepo();
    } catch (err) {
      console.log(err);
    }
  }, [search, page]);

  useEffect(() => {
    try {
      const fetchDataUser = async () => {
        const response = await fetch(`https://api.github.com/users/${search}`);
        const data = await response.json();
        setDataFetch(data);
        console.log(data);
      };
      fetchDataUser();
    } catch (err) {
      console.log(err);
    }
  }, [search]);

  if (!dataFetch) {
    return <div>Loading...</div>;
  }
  const handleLoadMoreClick = () => {
    const totalPages = Math.ceil(dataFetch.public_repos / 4);
    if (page < totalPages) {
      setPage(page + 1);
    } else {
      setPage(totalPages);
    }
  };
  return (
    <div>
      <div>
        <header>
          <SignedOut>
            <SignInButton />
          </SignedOut>
          <SignedIn>
            <UserButton />
          </SignedIn>
        </header>
      </div>
      <div className="relative">
        <img
          className="w-screen"
          src="./hero-image-github-profile.png"
          alt="hero"
        />
        <div className="w-1/3 absolute top-10 left-1/2 transform -translate-x-1/2">
          <div className="relative">
            <img
              src="./Search.svg"
              alt="search"
              className="absolute top-3 left-2"
            />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              name="search"
              placeholder="username"
              className="w-full bg-[#364153] h-12 rounded-xl pl-10 text-white focus:outline-none focus:ring focus:ring-[#3662E3]"
            />
          </div>
        </div>
        <div className="px-52">
          <img
            src={dataFetch.avatar_url}
            alt="profile"
            className="w-40 h-40 rounded-3xl absolute top-56"
          />
          <div className="pl-52 pt-4 flex  justify-around">
            <ProfileDetail desc="Followers" value={dataFetch.followers} />
            <ProfileDetail desc="Following" value={dataFetch.following} />
            <ProfileDetail desc="Location" value={dataFetch.location} />
          </div>
          <div className="pt-16">
            <p className="text-3xl font-semibold text-[#CDD5E0]">
              {dataFetch.login}
            </p>
            <p className="text-[#CDD5E0]">{dataFetch.bio}</p>
          </div>

          <div className="grid grid-cols-2 gap-6 pt-8">
            {repoList.slice(0, page * 4).map((repo: RepoDetail) => (
              <CardRepo key={repo.id} {...repo} />
            ))}
          </div>
          {repoList.length > 4 && (
            <div className="flex justify-center my-10 text-[#CDD5E0] hover:text-[#3662E3]">
              <button onClick={handleLoadMoreClick}>
                View more repositories
              </button>
            </div>
          )}
        </div>
      </div>
      <div></div>
    </div>
  );
}

export default App;
