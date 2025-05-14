const MyButton = () => {
  return (
    <a
      href="/MuskanPardasani.pdf"  // ✅ Ensure this file is in your /public folder
      download
      className="inline-block bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition transform hover:scale-105 animate-pulse"
    >
      📄 Download Resume
    </a>
  );
};

export default MyButton;
