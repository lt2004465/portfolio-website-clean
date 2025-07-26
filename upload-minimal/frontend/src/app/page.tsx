export default function HomePage() {
  return (
    <main className="min-h-screen bg-white dark:bg-gray-900 flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
          欢迎来到我的作品集网站
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
          网站正在建设中...
        </p>
        <div className="bg-green-100 dark:bg-green-900 p-4 rounded-lg">
          <p className="text-green-800 dark:text-green-200">
            ✅ 部署成功！Next.js 应用正在运行
          </p>
        </div>
      </div>
    </main>
  );
}
