import React from 'react';
import Image from 'next/image';

const WeChatQRCode = () => {
  return (
    <div className="relative w-full max-w-[calc(100%-1rem)] mx-auto mt-8">
      {/* 最底层装饰元素 */}
      <div className="absolute -top-4 left-2 right-2 h-4 bg-[#F3F4F6] rounded-t-xl border-t border-x border-[#E6E8EC] -z-1"></div>
      {/* 中间层装饰元素 */}
      <div className="absolute -top-2 left-1 right-1 h-4 bg-[#F9FAFB] rounded-t-xl border-t border-x border-[#E5E7EB] -z-0"></div>
      {/* 主卡片 */}
      <div className="relative bg-white rounded-xl border border-[#E5E7EB] p-6 z-10 text-center">
        <h3 className="text-[22px] leading-[30px] font-semibold mb-2">联系我们</h3>
        <p className="mb-2 text-[#343434]">添加微信：CELPIPMaster</p>
        <p className="mb-2 text-sm">购买完整套题和进行问题反馈</p>
        <p className="mb-2 text-[#343434]">微信客服有时差，回复较慢，建议联系小红书客服</p>    
      </div>
    </div>
  );
};

export default WeChatQRCode;