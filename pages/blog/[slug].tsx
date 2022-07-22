import { readdirSync } from "fs";
import { GetStaticProps, NextPage } from "next";
import matter from "gray-matter";
import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkHtml from "remark-html";
import Layout from "@components/layouts/layout";

const Post: NextPage<{ post: string; data: any }> = ({ post, data }) => {
  return (
    <Layout seoTitle="Blog Detail" title={data?.title}>
      <div
        className="blog-post-content"
        dangerouslySetInnerHTML={{ __html: post }}
      ></div>
    </Layout>
  );
};

export function getStaticPaths() {
  return {
    paths: [],
    fallback: "blocking",
  };
}

export const getStaticProps: GetStaticProps = async (ctx) => {
  const { data, content } = matter.read(`./posts/${ctx.params?.slug}.md`);
  const { value } = await unified()
    .use(remarkParse)
    .use(remarkHtml)
    .process(content);
  return {
    props: {
      post: value,
      data: data,
    },
  };
};

export default Post;
