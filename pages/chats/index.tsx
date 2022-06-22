import type { NextPage } from "next";
import Layout from "../../components/layouts/layout";

const Chats: NextPage = () => {
  return (
    <Layout title="Chat" hasTabBar>
      <div className="py-10 divide-y-[1px] ">
        {new Array(10).fill(1).map((_, i) => (
          <div
            key={i}
            className="flex px-4 cursor-pointer py-3 items-center space-x-3"
          >
            <div className="w-12 h-12 rounded-full bg-slate-300" />
            <div>
              <p className="text-gray-700">Steve Jebs</p>
              <p className="text-sm  text-gray-500">
                See you tomorrow in the corner at 2pm!
              </p>
            </div>
          </div>
        ))}
      </div>
    </Layout>
  );
};

export default Chats;
