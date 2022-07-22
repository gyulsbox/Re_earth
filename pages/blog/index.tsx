import Layout from "@components/layouts/layout";
import { readdirSync, readFileSync } from "fs";
import matter from "gray-matter";
import { NextPage } from "next";
import Link from "next/link";

interface Post {
  title: string;
  date: string;
  category: string;
  slug: string;
}

const Blog: NextPage<{ posts: Post[] }> = ({ posts }) => {
  return (
    <Layout title="블로그" seoTitle="Blog">
      <h1 className="font-semibold text-lg text-center my-5">Latest Posts</h1>
      <ul className="flex flex-col items-center">
        {posts.map((post, index) => (
          <div key={index} className="mb-5 text-center">
            <Link href={`/blog/${post.slug}`}>
              <a>
                <span className="text-lg text-cyan-800">{post.title}</span>
                <div>
                  <span className="text-sm">
                    {post.date} / {post.category}
                  </span>
                </div>
              </a>
            </Link>
          </div>
        ))}
      </ul>
    </Layout>
  );
};

export async function getStaticProps() {
  const blogPosts = readdirSync("./posts").map((file) => {
    const content = readFileSync(`./posts/${file}`, "utf-8");
    const [slug, _] = file.split(".");
    return { ...matter(content).data, slug };
  });
  return {
    props: {
      posts: blogPosts,
    },
  };
}

export default Blog;
