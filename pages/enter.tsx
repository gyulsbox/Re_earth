import type { NextPage } from "next";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Button from "@components/button";
import Input from "@components/input";
import useMutation from "@libs/client/useMutation";
import { setClassName } from "@libs/client/utils";
import { useRouter } from "next/router";
import Head from "next/head";

interface EnterForm {
  email?: string;
  username?: string;
  password?: string;
  phone?: string;
  name?: string;
}

interface TokenForm {
  token: string;
}

interface EnterMutaionResult {
  ok: boolean;
}

const Enter: NextPage = () => {
  const [enter, { loading, data, error }] =
    useMutation<EnterMutaionResult>("/api/users/signin");
  const [enterEmail, { loading: emailLoading, data: emailData }] =
    useMutation<EnterMutaionResult>("/api/users/enter");
  const [confirmToken, { loading: tokenLoading, data: tokenData }] =
    useMutation<EnterMutaionResult>("/api/users/confirm");
  const [signUp, { loading: signUpLoading, data: signUpData }] =
    useMutation<EnterMutaionResult>("/api/users/signup");
  const { register, reset, handleSubmit } = useForm<EnterForm>();
  const { register: tokenRegister, handleSubmit: tokenGandleSubmit } =
    useForm<TokenForm>();
  const [method, setMethod] = useState<"normal" | "email" | "signup">("normal");
  const onEmailClick = () => {
    reset();
    setMethod("email");
  };
  const onNormalClick = () => {
    reset();
    setMethod("normal");
  };
  const onSignupClick = () => {
    reset();
    setMethod("signup");
  };
  const onValid = (validForm: EnterForm) => {
    if (loading) return;
    enter(validForm);
  };
  const onEmailValid = (validForm: EnterForm) => {
    if (emailLoading) return;
    enterEmail(validForm);
  };
  const onSignUpValid = (validForm: EnterForm) => {
    if (signUpLoading) return;
    signUp(validForm);
  };
  const onTokenValid = (validForm: TokenForm) => {
    if (tokenLoading) return;
    confirmToken(validForm);
  };
  const router = useRouter();
  useEffect(() => {
    const response = data?.ok || tokenData?.ok;
    if (response) {
      router.push("/");
    }
    if (signUpData?.ok) {
      setMethod("normal");
    }
  }, [tokenData, signUpData, data, router]);
  const logo = "/static/logos.png";
  return (
    <div className="mt-8 px-4">
      <Head>
        <title>Login | Re:earth </title>
      </Head>
      <div className="flex w-full mx-auto -mb-10 scale-110">
        <img src={logo} alt="reearthlogo" />
      </div>
      <div className="mt-12">
        {emailData?.ok ? (
          <form
            onSubmit={tokenGandleSubmit(onTokenValid)}
            className="flex flex-col mt-8 space-y-4"
          >
            <Input
              register={tokenRegister("token", { required: true })}
              name="token"
              label="토큰"
              type="text"
            />
            <Button text={tokenLoading ? "로딩중..." : "토큰 인증"} />
          </form>
        ) : (
          <>
            <div className="flex flex-col items-center">
              <div className="grid  border-b  w-full mt-8 grid-cols-2 ">
                <button
                  className={setClassName(
                    "pb-4 font-medium text-sm border-b-2",
                    method === "normal"
                      ? " border-[#8a7d72] text-[#8a7d72]"
                      : "border-transparent hover:text-gray-400 text-gray-500",
                  )}
                  onClick={onNormalClick}
                >
                  일반
                </button>
                <button
                  className={setClassName(
                    "pb-4 font-medium text-sm border-b-2",
                    method === "email"
                      ? " border-[#8a7d72] text-[#8a7d72]"
                      : "border-transparent hover:text-gray-400 text-gray-500",
                  )}
                  onClick={onEmailClick}
                >
                  이메일
                </button>
              </div>
            </div>
            <form
              onSubmit={handleSubmit(
                method === "email" ? onEmailValid : onValid,
              )}
              className="flex flex-col mt-8 space-y-4"
            >
              {method === "email" ? (
                <Input
                  register={register("email", { required: true })}
                  name="email"
                  label="이메일 주소"
                  type="email"
                />
              ) : null}
              {method === "normal" ? (
                <>
                  <Input
                    register={register("username", { required: true })}
                    name="username"
                    label="아이디"
                    type="id"
                  />
                  <Input
                    register={register("password", { required: true })}
                    name="password"
                    label="비밀번호"
                    type="password"
                  />
                </>
              ) : null}
              {method === "email" ? (
                <Button
                  text={emailLoading ? "로딩중..." : "단발성 로그인 토큰 요청"}
                />
              ) : null}
              {method === "normal" ? (
                <Button text={loading ? "로딩중..." : "로그인"} />
              ) : null}
            </form>
          </>
        )}
        {method === "signup" ? (
          <form
            onSubmit={handleSubmit(onSignUpValid)}
            className="flex flex-col space-y-4"
          >
            <Input
              register={register("username", { required: true })}
              name="username"
              label="아이디"
              type="text"
            />
            <Input
              register={register("password", { required: true })}
              name="password"
              label="비밀번호"
              type="password"
            />
            <Input
              register={register("name", { required: true })}
              name="name"
              label="닉네임"
              type="text"
            />
            <Input
              register={register("email", { required: true })}
              name="email"
              label="이메일 주소"
              type="email"
            />
            <Button text={loading ? "로딩중..." : "회원가입"} />
          </form>
        ) : null}
        <div className="mt-8">
          <div className="relative">
            <div className="absolute w-full border-t border-gray-300" />
            <div className="relative -top-3 text-center ">
              <span className="bg-white px-2 text-sm text-gray-500">
                로그인 옵션
              </span>
            </div>
          </div>
          <div className="grid grid-cols-1 mt-2 mb-6 gap-3">
            <button
              onClick={onSignupClick}
              className="flex justify-center items-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
            >
              회원가입
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Enter;
