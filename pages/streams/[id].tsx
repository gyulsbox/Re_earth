import type { NextPage } from "next";
import Layout from "@components/layouts/layout";
import Messages from "@components/message";
import useSWR, { mutate } from "swr";
import { useRouter } from "next/router";
import { Stream, Message } from "@prisma/client";
import { useForm } from "react-hook-form";
import useMutation from "@libs/client/useMutation";
import useUser from "@libs/client/useUser";
import { useEffect } from "react";

interface StreamMessage {
  id: number;
  message: string;
  user: {
    id: number;
    avatar?: string;
  };
}

interface StreamWithMessages extends Stream {
  messages: StreamMessage[];
}

interface StreamResponse {
  ok: boolean;
  stream: StreamWithMessages;
}

interface MessageForm {
  message: string;
}

const Streams: NextPage = () => {
  const { user } = useUser();
  const router = useRouter();
  const { register, handleSubmit, reset } = useForm<MessageForm>();
  const { data, mutate } = useSWR<StreamResponse>(
    router.query.id ? `/api/streams/${router.query.id}` : null,
    {
      refreshInterval: 1000,
    },
  );
  const [sendMessage, { data: sendMessageData, loading }] = useMutation(
    `/api/streams/${router.query.id}/messages`,
  );
  const onValid = (form: MessageForm) => {
    if (loading) return;
    reset();
    mutate(
      (prev) =>
        prev &&
        ({
          ...prev,
          stream: {
            ...prev.stream,
            messages: [
              ...prev.stream.messages,
              {
                id: Date.now(),
                message: form.message,
                user: {
                  ...user,
                },
              },
            ],
          },
        } as any),
      false,
    );
    sendMessage(form);
  };
  return (
    <Layout canGoBack seoTitle="Streams Detail" title={data?.stream.title}>
      <div className="py-10 px-4  space-y-4">
        {data?.stream.cloudflareId ? (
          <div className="w-full rounded-md shadow-sm bg-slate-300 aspect-video">
            <iframe
              className="w-full aspect-video rounded-md"
              src={`https://iframe.videodelivery.net/${data?.stream.cloudflareId}`}
              allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture;"
              allowFullScreen={true}
            ></iframe>
          </div>
        ) : (
          <div className="w-full rounded-md shadow-sm bg-slate-300 aspect-video" />
        )}
        <div className="mt-5">
          <h1 className="text-3xl font-bold text-gray-900">
            {data?.stream?.title}
          </h1>
          <span className="text-2xl block mt-3 text-gray-900">
            ${data?.stream?.price}
          </span>
          <p className=" my-6 text-gray-700">{data?.stream?.description}</p>
          <div className="bg-gray-300 p-5 rounded-md overflow-scroll flex flex-col space-y-3">
            <span>고유키 (게시글 주인만 확인 가능합니다.)</span>
            <span className="text-white">
              <span className="font-medium text-gray-800">URL:</span>
              {data?.stream.cloudflareUrl}
            </span>
            <span className="text-white">
              <span className="font-medium text-gray-800">Key:</span>
              {data?.stream.cloudflareKey}
            </span>
          </div>
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-900">실시간 채팅</h2>
          <div className="py-10 pb-16 h-[35vh] overflow-y-scroll px-4 space-y-4">
            {data?.stream.messages.map((message) => (
              <Messages
                key={message.id}
                message={message.message}
                reversed={message.user.id === user?.id}
                avatarUrl={message.user.avatar}
              />
            ))}
          </div>
          <div className="fixed py-2 px-4 bg-white bottom-0 inset-x-0">
            <form
              onSubmit={handleSubmit(onValid)}
              className="flex relative max-w-md items-center  w-full mx-auto"
            >
              <input
                {...register("message", { required: true })}
                type="text"
                className="shadow-sm rounded-full w-full border-gray-300 focus:ring-[#8a7d72] focus:outline-none pr-12 focus:border-[#8a7d72]"
              />
              <div className="absolute inset-y-0 flex py-1.5 pr-1.5 right-0">
                <button className="flex focus:ring-2 focus:ring-offset-2 focus:ring-[#8a7d72] items-center bg-[#8a7d72] rounded-full px-3 hover:bg-[#8a7d72] text-sm text-white">
                  &rarr;
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Streams;
