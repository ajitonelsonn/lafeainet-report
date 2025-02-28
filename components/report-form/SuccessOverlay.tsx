interface SuccessOverlayProps {
  onClose: () => void;
}

export default function SuccessOverlay({ onClose }: SuccessOverlayProps) {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-xl flex flex-col items-center max-w-sm mx-4">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
          <svg
            className="w-8 h-8 text-green-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M5 13l4 4L19 7"
            ></path>
          </svg>
        </div>
        <h3 className="text-xl font-semibold text-gray-900 mb-2">Success!</h3>
        <p className="text-gray-600 text-center mb-4">
          Your report has been submitted successfully.
        </p>
        <button
          onClick={onClose}
          className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors"
        >
          Close
        </button>
      </div>
    </div>
  );
}
