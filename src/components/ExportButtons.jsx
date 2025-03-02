export default function ExportButtons({ markdown }) {
  const exportText = (type) => {
    const blob = new Blob([markdown], {
      type: type === "txt" ? "text/plain" : "text/html",
    });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `markdown.${type}`;
    link.click();
  };

  return (
    <div className="flex gap-4 mt-4">
      <button
        className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
        onClick={() => exportText("txt")}
      >
        Export as TXT
      </button>
      <button
        className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
        onClick={() => exportText("html")}
      >
        Export as HTML
      </button>
    </div>
  );
}
