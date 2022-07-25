import type { NextPage } from "next";
import Button from "@components/button";
import Input from "@components/input";
import Layout from "@components/layouts/layout";
import TextArea from "@components/textarea";
import { useForm } from "react-hook-form";
import useMutation from "@libs/client/useMutation";
import { useEffect } from "react";
import Router, { useRouter } from "next/router";
import { Stream } from "@prisma/client";

interface CreateForm {
  title: string;
  price: string;
  description: string;
}

interface CreateResponse {
  ok: boolean;
  stream: Stream;
}

const Create: NextPage = () => {
  const router = useRouter();
  const [createStream, { data, loading }] =
    useMutation<CreateResponse>(`/api/streams`);
  const { register, handleSubmit } = useForm<CreateForm>();
  const onValid = (form: CreateForm) => {
    if (loading) return;
    createStream(form);
  };
  useEffect(() => {
    if (data && data.ok) {
      router.replace(`/streams/${data.stream.id}`);
    }
  }, [data, router]);
  return (
    <Layout canGoBack seoTitle='Streaming' title="스트리밍">
      <form onSubmit={handleSubmit(onValid)} className=" space-y-4 py-10 px-4">
        <Input
          register={register("title", { required: true })}
          required
          label="제목"
          name="title"
          type="text"
        />
        <Input
          register={register("price", { required: true, valueAsNumber: true })}
          required
          label="가격"
          placeholder="0.00"
          name="price"
          type="text"
          kind="price"
        />
        <TextArea
          register={register("description", { required: true, minLength: 5 })}
          name="description"
          label="설명"
        />
        <Button text={loading ? "로딩중..." : "스트리밍"} />
      </form>
    </Layout>
  );
};

export default Create;
