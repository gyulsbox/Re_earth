import type { NextPage } from "next";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Button from "@components/button";
import Input from "@components/input";
import useMutation from "@libs/client/useMutation";
import { setClassName } from "@libs/client/utils";
import { useRouter } from "next/router";
import Head from "next/head";
import { User } from "@prisma/client";
import { ErrorMessage } from "@hookform/error-message";

interface EnterForm {
  email?: string;
  username?: string;
  password?: string;
  phone?: string;
  name?: string;
  passwordConfirm?: string;
  token?: string;
}

interface TokenForm {
  token: string;
}

interface EnterMutaionResult {
  ok: boolean;
  checkUser?: User;
  payload?: string;
}

interface SignUpMutationResult {
  ok: boolean;
  registe: User;
  checkUserName?: User;
  checkEmail?: User;
  checkName?: User;
}

const Enter: NextPage = () => {
  const [enter, { loading, data }] =
    useMutation<EnterMutaionResult>("/api/users/signin");
  const [enterEmail, { loading: emailLoading, data: emailData }] =
    useMutation<EnterMutaionResult>("/api/users/enter");
  const [confirmToken, { loading: tokenLoading, data: tokenData }] =
    useMutation<EnterMutaionResult>("/api/users/confirm");
  const [signUp, { loading: signUpLoading, data: signUpData }] =
    useMutation<SignUpMutationResult>("/api/users/signup");
  const {
    register,
    reset,
    handleSubmit,
    getValues,
    watch,
    formState: { errors },
  } = useForm<EnterForm>();
  const {
    register: tokenRegister,
    handleSubmit: tokenHandleSubmit,
    watch: watchToken,
    formState: { errors: tokenErrors },
  } = useForm<TokenForm>();
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
    emailData?.ok == false;
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
    if (data?.ok) {
      router.push("/");
    }
  }, [data, router]);
  useEffect(() => {
    if (tokenData?.ok) {
      router.push("/");
    }
  }, [tokenData, router]);
  useEffect(() => {
    if (signUpData?.ok) {
      alert(`${signUpData.registe.name}님 환영합니다.`);
      setMethod("normal");
    }
  }, [signUpData]);
  const logo = "/static/logos.png";
  const errorForm = <span className="!mt-1 text-sm pl-2 text-red-600" />;
  function isValidate(
    form: "token" | "signin" | "signup",
    type?: "email" | "username" | "name" | "password" | "token",
  ) {
    if (form && type) {
      let message;
      let currentValue = watch(type);
      let currentToken = watchToken("token");
      if (currentToken) {
        if (form === "token" && currentToken !== emailData?.payload) {
          message = "인증번호가 일치하지 않습니다.";
          return message ? (
            <span className="!mt-1 text-sm pl-2 text-red-600">{message}</span>
          ) : null;
        }
      }
      if (currentValue) {
        if (
          form === "signup" &&
          currentValue === signUpData?.checkUserName?.username
        ) {
          message = "이미 존재하는 아이디입니다.";
        } else if (
          form === "signup" &&
          currentValue === signUpData?.checkName?.name
        ) {
          message = "이미 존재하는 닉네임입니다.";
        } else if (
          form === "signup" &&
          currentValue === signUpData?.checkEmail?.email
        ) {
          message = "이미 존재하는 이메일입니다.";
        } else if (
          form === "signin" &&
          currentValue.length > 1 &&
          data &&
          currentValue !== data?.checkUser?.password
        ) {
          message = "아이디 또는 비밀번호가 일치하지 않습니다.";
        } else if (
          form === "token" &&
          emailData &&
          currentValue !== emailData?.checkUser?.email
        ) {
          message = "등록되지 않은 이메일 주소입니다. 다시 입력하세요.";
        } else {
          message = "";
        }
        return message ? (
          <span className="!mt-1 text-sm pl-2 text-red-600">{message}</span>
        ) : null;
      }
    }
  }
  function errorMessage(name: string) {
    return errors ? (
      <ErrorMessage errors={errors} name={name} as={errorForm} />
    ) : tokenErrors ? (
      <ErrorMessage errors={tokenErrors} name={name} as={errorForm} />
    ) : null;
  }
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
            onSubmit={tokenHandleSubmit(onTokenValid)}
            className="flex flex-col mt-4 space-y-4 w-3/4 mx-auto"
          >
            <Input
              register={tokenRegister("token", {
                required: "메일로 받으신 토큰을 입력해주세요.",
              })}
              name="token"
              placeholder="토큰"
              type="text"
            />
            {isValidate("token", "token")}
            <Button text={tokenLoading ? "로딩중..." : "토큰 인증"} />
          </form>
        ) : (
          <>
            <div className="flex flex-col items-center">
              <div className="grid  border-b w-full mt-4 grid-cols-2 ">
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
              className="flex flex-col mt-4 space-y-4 w-3/4 mx-auto"
            >
              {method === "email" ? (
                <>
                  <Input
                    register={register("email", {
                      required: "등록된 이메일을 입력해 주세요.",
                    })}
                    name="email"
                    placeholder="이메일 주소"
                    type="email"
                  />
                  {isValidate("token", "email")}
                  {errorMessage("email")}
                </>
              ) : null}
              {method === "normal" ? (
                <>
                  <Input
                    register={register("username", {
                      required: "아이디를 입력해주세요.",
                    })}
                    name="username"
                    placeholder="아이디"
                    type="id"
                  />
                  {errorMessage("username")}
                  <Input
                    register={register("password", {
                      required: "비밀번호를 입력해주세요.",
                    })}
                    name="password"
                    placeholder="비밀번호"
                    type="password"
                  />
                  {isValidate("signin", "password")}
                  {errorMessage("password")}
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
            className="flex flex-col space-y-4 w-3/4 mx-auto"
          >
            <Input
              register={register("username", {
                required: "아이디를 입력해주세요.",
                minLength: {
                  value: 5,
                  message: "최소 5자 이상의 아이디를 입력해주세요.",
                },
                maxLength: {
                  value: 16,
                  message: "16자 이하의 아이디만 사용가능합니다.",
                },
                pattern: {
                  value: /^[a-z]+[a-z0-9]{4,16}$/g,
                  message: "영문 및 숫자를 혼용한 아이디를 입력해주세요.",
                },
              })}
              name="username"
              placeholder="아이디"
              type="text"
            />
            {isValidate("signup", "username")}
            {errorMessage("username")}
            <Input
              register={register("password", {
                required: "비밀번호를 입력해주세요.",
                minLength: {
                  value: 8,
                  message: "최소 8자 이상의 비밀번호를 입력해주세요.",
                },
                maxLength: {
                  value: 16,
                  message: "16자 이하의 비밀번호만 사용가능합니다.",
                },
                pattern: {
                  value: /^(?=.*\d)(?=.*[a-zA-ZS]).{8,}/,
                  message: "영문, 숫자를 혼용하여 입력해주세요.",
                },
              })}
              name="password"
              placeholder="비밀번호"
              type="password"
            />
            {errorMessage("password")}
            <Input
              register={register("passwordConfirm", {
                required: "동일한 비밀번호를 입력해주세요.",
                validate: {
                  confirmPassword: (value) => {
                    const { password } = getValues();
                    return (
                      password === value || "비밀번호가 일치하지 않습니다."
                    );
                  },
                },
              })}
              name="passwordConfirm"
              placeholder="비밀번호 확인"
              type="password"
            />
            {errorMessage("passwordConfirm")}
            <Input
              register={register("name", {
                required: "닉네임을 입력해주세요.",
                minLength: {
                  value: 2,
                  message: "최소 2자 이상의 닉네임을 입력해주세요.",
                },
                maxLength: {
                  value: 14,
                  message: "14자 이하의 닉네임만 사용가능합니다.",
                },
                pattern: {
                  value: /^[ㄱ-ㅎ|가-힣|a-z|A-Z|0-9|]+$/,
                  message: "한글, 영어, 숫자만 입력해주세요.",
                },
              })}
              name="name"
              placeholder="닉네임"
              type="text"
            />
            {isValidate("signup", "name")}
            {errorMessage("name")}
            <Input
              register={register("email", {
                required: "이메일을 입력해주세요.",
                minLength: {
                  value: 5,
                  message: "최소 5자 이상의 이메일을 입력해주세요.",
                },
                maxLength: {
                  value: 30,
                  message: "30자 이하의 이메일만 사용가능합니다.",
                },
                pattern: {
                  value: /^[a-zA-Z0-9+-\_.]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
                  message: "올바른 이메일 양식으로 입력해주세요.",
                },
              })}
              name="email"
              placeholder="이메일 주소"
              type="text"
            />
            {isValidate("signup", "email")}
            {errorMessage("email")}
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
          <div className="grid grid-cols-1 mt-2 mb-6 gap-3 w-3/4 mx-auto">
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
