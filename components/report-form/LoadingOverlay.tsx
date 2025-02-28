// LoadingOverlay.tsx
export default function LoadingOverlay() {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-xl flex flex-col items-center max-w-sm mx-4">
        <div className="animate-spin h-12 w-12 border-4 border-blue-500 border-t-transparent rounded-full mb-4"></div>
        <p className="text-gray-700 text-center">Submitting your report...</p>
      </div>
    </div>
  );
}
