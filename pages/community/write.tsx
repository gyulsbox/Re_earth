import type { NextPage } from "next";
import Button from "@components/button";
import Layout from "@components/layouts/layout";
import TextArea from "@components/textarea";
import { useForm } from "react-hook-form";
import useMutation from "@libs/client/useMutation";
import { useEffect } from "react";
import { Post } from "@prisma/client";
import { useRouter } from "next/router";
import useCoords from "@libs/client/useCoords";

interface WriteForm {
  categories: string;
  question: string;
  contents: string;
}

interface WriteResponse {
  ok: boolean;
  post: Post;
}

const Write: NextPage = () => {
  const { latitude, longitude } = useCoords();
  const router = useRouter();
  const { register, handleSubmit } = useForm<WriteForm>();
  const [post, { loading, data }] = useMutation<WriteResponse>("/api/posts");
  const onValid = (data: WriteForm) => {
    if (loading) return;
    post({ ...data, latitude, longitude });
  };
  useEffect(() => {
    if (data && data.ok) {
      router.push(`/community/${data.post.id}`);
    }
  }, [data]);
  return (
    <Layout canGoBack seoTitle="Posting" title="게시글 작성">
      <form onSubmit={handleSubmit(onValid)} className="p-4 space-y-4">
        <select {...register("categories", { required: true })}>
          <option value="잡담">잡담</option>
          <option value="질문">질문</option>
        </select>
        <TextArea
          register={register("question", { required: true, minLength: 5 })}
          placeholder="제목을 입력해주세요."
        />
        <TextArea
          register={register("contents", { required: true, minLength: 5 })}
          placeholder="내용을 입력해주세요."
        />
        <Button text={loading ? "Loading" : "Submit"} />
      </form>
    </Layout>
  );
};

export default Write;
