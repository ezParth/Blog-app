import ReactQuill from "react-quill";

export default function Editor({value, onChange}){
    const modules = {
        toolbar: [
          [{ header: [1, 2, false] }],
          ["bold", "italic", "underline", "strike", "blockquote"],
          [
            { list: "ordered" },
            { list: "bullet" },
            { indent: "-1" },
            { indent: "+1" },
          ],
          ["link", "image"],
          ["clean"],
        ],
      };
      
      const format = [
        "header",
        "bold",
        "italic",
        "underline",
        "strike",
        "blockquote",
        "list",
        "bullet",
        "indent",
        "link",
        "image",
      ];
    return (
        <ReactQuill
            value={value}
            theme={"snow"}
            modules={modules}
            onChange={onChange}
          />
    )
}