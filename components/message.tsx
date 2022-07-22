import { formatTime, setClassName } from "@libs/client/utils";
import Image from "next/image";

interface MessageProps {
  message: string;
  reversed?: boolean;
  avatarUrl?: string;
  createdAt?: Date;
}

export default function Message({
  message,
  avatarUrl,
  reversed,
  createdAt,
}: MessageProps) {
  return (
    <div
      className={setClassName(
        "flex items-start space-x-2",
        reversed ? "flex-row-reverse space-x-reverse" : "",
      )}
    >
      {!reversed ? (
        avatarUrl ? (
          <Image
            width={40}
            height={40}
            src={`https://imagedelivery.net/w46l_DmHQSMJLI8NrmR8QQ/${avatarUrl}/avatar`}
            className="w-8 h-8 rounded-full"
            alt="chat-avartar"
          />
        ) : (
          <div className="w-8 h-8 rounded-full bg-slate-400" />
        )
      ) : null}
      <div className="text-sm text-gray-700 p-2 border border-gray-300 rounded-md">
        <p className={setClassName(reversed ? "text-end" : "")}>{message}</p>
      </div>
      <div className="mt-4">
        <p className="text-xs">{formatTime(createdAt!)}</p>
      </div>
    </div>
  );
}
