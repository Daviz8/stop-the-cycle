import NewsFeedClient from "./news-feed-client";

export const metadata = {
  title: "Church News and Updates",
  description:
    "Stay connected with our monthly theme, weekly news, missions, outreaches and testimonies.",
};

export default function NewsPage() {
  return <NewsFeedClient />;
}
