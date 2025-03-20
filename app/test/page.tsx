
import { AudioPlayerWithSubtitles } from "./audio-player";
import GrammarVisualizer from "./GrammarVisualizer";
import AnalysisVisualizer from "./AnalysisVisualizer";
import jsonData from "./test35-a33.json";

function Unauthorized() {
  // 创建交替的红灰加号图案，使用更柔和的粉红色
  const crossPattern = `url("data:image/svg+xml,%3Csvg width='120' height='120' viewBox='0 0 120 120' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill-opacity='0.4'%3E%3Cpath d='M27 27v-8h6v8h8v6h-8v8h-6v-8h-8v-6h8z' fill='%23ffd5d5' transform='translate(0,0)'/%3E%3Cpath d='M27 27v-8h6v8h8v6h-8v8h-6v-8h-8v-6h8z' fill='%23f0f0f0' transform='translate(60,60)'/%3E%3Cpath d='M27 27v-8h6v8h8v6h-8v8h-6v-8h-8v-6h8z' fill='%23ffd5d5' transform='translate(120,0)'/%3E%3Cpath d='M27 27v-8h6v8h8v6h-8v8h-6v-8h-8v-6h8z' fill='%23f0f0f0' transform='translate(0,60)'/%3E%3C/g%3E%3C/svg%3E")`;

  return (
    <div className="min-h-screen bg-gray-50 relative overflow-hidden flex items-center justify-center">
      {/* 背景图案 */}
      <div className="absolute inset-0">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: crossPattern,
            backgroundSize: "120px 120px",
          }}
        />
      </div>

      {/* Content container */}
      <div className="relative z-10 w-full max-w-lg mx-4">
        <div className="bg-white rounded-lg shadow-xl p-8 text-center relative">
          {/* 音频播放器 */}
         <GrammarVisualizer />
         <AnalysisVisualizer data={jsonData} />


          {/* Logo */}
          <div className="w-24 h-24 mx-auto mb-8">
            <img
              src="/ai-logo.png"
              alt="TCF Logo"
              className="w-full h-full object-contain"
            />
          </div>

          {/* Lock icon */}


          {/* Unauthorized message */}
          <h1 className="mt-4 text-2xl font-semibold text-gray-900">
            没有权限
          </h1>
          <p className="mt-2 text-gray-600">需要激活套餐才能使用此功能</p>

          {/* Action button and text */}
          <div className="mt-10 flex flex-col items-center space-y-4">

          </div>

          {/* Footer */}
          <div className="mt-12 text-sm text-gray-500">
            © {new Date().getFullYear()} TCF699
          </div>
        </div>
      </div>
    </div>
  );
}

export default Unauthorized;
