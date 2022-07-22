import type { GetStaticPaths, GetStaticProps, NextPage } from "next";
import Layout from "@components/layouts/layout";
import TextArea from "@components/textarea";
import { useRouter } from "next/router";
import useSWR from "swr";
import { Comment, Post, User } from "@prisma/client";
import Link from "next/link";
import useMutation from "@libs/client/useMutation";
import { formatTime, setClassName } from "@libs/client/utils";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import Image from "next/image";
import client from "@libs/server/client";

interface CommentWithUser extends Comment {
  user: User;
}

interface PostWithUser extends Post {
  user: User;
  comments: CommentWithUser[];
  _count: {
    comments: number;
    empathy: number;
  };
}

interface CommunityPostResponse {
  ok: boolean;
  post: PostWithUser;
  isEmpathy: boolean;
}

interface CommentForm {
  comment: string;
}

interface CommentResponse {
  ok: boolean;
  comment: Comment;
}

const CommunityPostDetail: NextPage<CommunityPostResponse> = ({ post }) => {
  const router = useRouter();
  const { register, handleSubmit, reset } = useForm<CommentForm>();
  const { data, mutate } = useSWR<CommunityPostResponse>(
    router.query.id ? `/api/posts/${router.query.id}` : null,
  );
  const [empathy, { loading }] = useMutation(
    `/api/posts/${router.query.id}/empathy`,
  );
  const [sendComment, { data: commentData, loading: commentLoading }] =
    useMutation<CommentResponse>(`/api/posts/${router.query.id}/comment`);
  const onEmpathyClick = () => {
    if (!data) return;
    mutate(
      {
        ...data,
        post: {
          ...data?.post,
          _count: {
            ...data?.post._count,
            empathy: data.isEmpathy
              ? data?.post._count.empathy - 1
              : data?.post._count.empathy + 1,
          },
        },
        isEmpathy: !data.isEmpathy,
      },
      false,
    );
    if (!loading) {
      empathy({});
    }
  };
  const onValid = (form: CommentForm) => {
    if (commentLoading) return;
    sendComment(form);
  };
  useEffect(() => {
    if (commentData && commentData.ok) {
      reset();
      mutate();
    }
  }, [commentData, reset]);

  return (
    <Layout canGoBack seoTitle="Community Detail" title="게시글">
      <div>
        <span className="inline-flex my-3 ml-4 items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
          {post.categories}
        </span>
        <div className="flex mb-3 px-4 pb-3 border-b items-center space-x-3">
          {
            <Image
              className="w-12 h-12 rounded-full bg-slate-300"
              src={`https://imagedelivery.net/w46l_DmHQSMJLI8NrmR8QQ/${post?.user?.avatar}/avatar`}
              width={48}
              height={48}
            />
          }
          <div>
            <p className="text-sm font-medium text-gray-700">
              {post?.user.name}
            </p>
            <Link href={`/users/profiles/${post?.user.id}`}>
              <a className="text-xs font-medium text-gray-500">
                View profile &rarr;
              </a>
            </Link>
          </div>
        </div>
        <div>
          <div className="mt-2 px-4 text-gray-700">
            <div>
              <span className="text-gray-900 font-medium text-lg">
                {post?.question}
              </span>
              <span className="flex justify-end text-sm">
                {formatTime(post?.createdAt)}
              </span>
            </div>
            <p className="mt-2 text-base">{post?.contents}</p>
          </div>
          <div className="flex px-4 space-x-5 mt-3 text-gray-700 py-2.5 border-t border-b-[2px]  w-full">
            <button
              onClick={onEmpathyClick}
              className={setClassName(
                "flex space-x-2 items-center text-sm",
                data?.isEmpathy ? "text-teal-400" : "",
              )}
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                ></path>
              </svg>
              <span>
                궁금해요
                {data ? data?.post?._count.empathy : post._count.empathy}
              </span>
            </button>
            <span className="flex space-x-2 items-center text-sm">
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                ></path>
              </svg>
              <span>
                답변 {data ? data?.post?._count.comments : post._count.comments}
              </span>
            </span>
          </div>
        </div>
        <div className="px-4 my-5 space-y-5">
          {data?.post?.comments.map((comment) => (
            <div key={comment.id} className="flex items-start space-x-3">
              {comment.user.avatar ? (
                <Image
                  className="w-12 h-12 rounded-full bg-slate-300"
                  src={`https://imagedelivery.net/w46l_DmHQSMJLI8NrmR8QQ/${comment.user.avatar}/avatar`}
                  width={48}
                  height={48}
                />
              ) : (
                <div className="w-12 h-12 bg-slate-200 rounded-full" />
              )}
              <div className="w-3/4">
                <span className="text-sm block font-medium text-gray-700">
                  {comment.user.name}
                </span>
                <span className="text-xs text-gray-500 block ">
                  {formatTime(comment.createdAt)}
                </span>
                <p className="text-gray-700 mt-2">{comment.comment}</p>
              </div>
            </div>
          ))}
        </div>
        <form onSubmit={handleSubmit(onValid)} className="px-4">
          <TextArea
            register={register("comment", { required: true, minLength: 5 })}
            name="description"
            placeholder="Answer this question!"
          />
          <button className="mt-2 w-full bg-orange-500 hover:bg-orange-600 text-white py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 focus:outline-none ">
            {commentLoading ? "Loading" : "Reply"}
          </button>
        </form>
      </div>
    </Layout>
  );
};

export const getStaticPaths: GetStaticPaths = () => {
  return {
    paths: [],
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps = async (context) => {
  if (!context?.params?.id) {
    return {
      props: {},
    };
  }
  const post = await client.post.findUnique({
    where: {
      id: +context.params.id.toString(),
    },
    include: {
      user: {
        select: {
          id: true,
          name: true,
          avatar: true,
        },
      },
      comments: {
        select: {
          id: true,
          comment: true,
          createdAt: true,
          user: {
            select: {
              id: true,
              name: true,
              avatar: true,
            },
          },
        },
      },
      _count: {
        select: {
          comments: true,
          empathy: true,
        },
      },
    },
  });
  return {
    props: {
      post: JSON.parse(JSON.stringify(post)),
    },
  };
};

export default CommunityPostDetail;
