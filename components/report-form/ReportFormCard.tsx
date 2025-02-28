import { Send } from "lucide-react";

interface ReportFormCardProps {
  dataPackage: string;
  setDataPackage: (value: string) => void;
  comment: string;
  setComment: (value: string) => void;
  handleSubmit: (e: React.FormEvent) => Promise<void>;
  isSubmitting: boolean;
  isValid: boolean;
}

export default function ReportFormCard({
  dataPackage,
  setDataPackage,
  comment,
  setComment,
  handleSubmit,
  isSubmitting,
  isValid,
}: ReportFormCardProps) {
  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <div className="flex items-center gap-2 mb-4">
        <Send className="w-5 h-5 text-blue-500" />
        <h2 className="text-lg font-semibold">Submit Report</h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Data Package Input */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Data Package
          </label>
          <input
            type="text"
            value={dataPackage}
            onChange={(e) => setDataPackage(e.target.value)}
            className="w-full p-2.5 border border-gray-300 rounded-md text-sm"
            placeholder="e.g., DU7, Weekly Package, etc."
            required
          />
          <p className="mt-1 text-xs text-gray-500">
            Please specify your current data package (e.g., DU7, Monthly
            Package)
          </p>
        </div>

        {/* Comments */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Comments
          </label>
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className="w-full p-2.5 border border-gray-300 rounded-md text-sm"
            rows={4}
            placeholder="Share your experience with the network..."
            required
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting || !isValid}
          className="w-full py-3 px-4 bg-blue-500 text-white text-sm rounded-md hover:bg-blue-600 disabled:bg-blue-300 transition-colors active:bg-blue-700 touch-manipulation"
        >
          {isSubmitting ? (
            <span className="flex items-center justify-center gap-2">
              <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full" />
              Submitting...
            </span>
          ) : (
            "Submit Report"
          )}
        </button>
      </form>
    </div>
  );
}
