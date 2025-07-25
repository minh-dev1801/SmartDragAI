import { forwardRef, useEffect, useRef } from "react";
import ReactQuill, { Quill } from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";

// Định nghĩa interface cho props
interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
  onBlur: () => void;
  disabled?: boolean;
  ref?: React.Ref<Quill>;
}

// Sử dụng forwardRef để expose Quill instance
const RichTextEditor = forwardRef<Quill, RichTextEditorProps>(
  ({ value, onChange, onBlur, disabled }, ref) => {
    const quillRef = useRef<ReactQuill | null>(null);

    // Forward ref để expose Quill instance (sử dụng getEditor())
    useEffect(() => {
      const editor = quillRef.current?.getEditor() ?? null;

      if (typeof ref === "function") {
        ref(editor);
      } else if (ref) {
        (ref as React.RefObject<Quill | null>).current = editor;
      }
    }, [ref, quillRef]);

    const modules = {
      toolbar: [
        [{ header: [1, 2, 3, 4, 5, 6, false] }],
        [{ font: [] }],
        [{ size: ["small", false, "large", "huge"] }],
        ["bold", "italic", "underline", "strike"],
        [{ color: [] }, { background: [] }],
        [{ script: "sub" }, { script: "super" }],
        ["blockquote", "code-block"],
        [{ list: "ordered" }, { list: "bullet" }], // Đúng: "bullet" là giá trị của "list" trong toolbar
        [{ indent: "-1" }, { indent: "+1" }],
        [{ direction: "rtl" }],
        [{ align: [] }],
        ["link", "image", "video"],
        ["clean"],
      ],
    };

    const formats = [
      "header",
      "font",
      "size",
      "bold",
      "italic",
      "underline",
      "strike",
      "color",
      "background",
      "script",
      "blockquote",
      "code-block",
      "list", // Bao gồm cả ordered và bullet
      "indent",
      "direction",
      "align",
      "link",
      "image",
      "video",
    ];

    return (
      <ReactQuill
        ref={quillRef}
        theme="snow"
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        modules={modules}
        formats={formats}
        readOnly={disabled}
        placeholder="Nhập nội dung văn bản"
      />
    );
  }
);

RichTextEditor.displayName = "RichTextEditor";

export default RichTextEditor;
